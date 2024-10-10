import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState([]);
  const [error, setError] = useState(null);

  // Fetch the list of available files from backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get('http://localhost:5005/files');
        setFiles(res.data.files);
      } catch (err) {
        console.error('Error fetching list of files:', err);
        setError('Error fetching files from backend');
      }
    };

    fetchFiles();
  }, []);

  // Fetch content for each file in the list
  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const allFileContents = await Promise.all(
          files.map(async (file) => {
            const res = await axios.get(`http://localhost:5005/file/${file}`);
            return res.data.lines.map((line) => ({ ...line, fileName: file }));
          })
        );
        setFileContent(allFileContents.flat());
      } catch (err) {
        console.error('Error fetching file content:', err);
        setError('Error fetching file contents from backend');
      }
    };

    if (files.length > 0) {
      fetchFileContents();
    }
  }, [files]);

  return (
    <div className="App container mt-5">
      <h1 className="mb-4 p-2 text-white bg-danger">React Test App</h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <DataTable fileContent={fileContent} />
      )}
    </div>
  );
}

export default App;
