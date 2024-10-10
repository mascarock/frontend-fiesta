import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [files, setFiles] = useState([]);
  const [fileContent, setFileContent] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.API_URL || 'http://localhost:5005';

  // Fetch the list of available files from backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // get the list of files from the backend
        const res = await axios.get(`${apiUrl}/files`);
        setFiles(res.data.files);
      } catch (err) {
        console.error('Error fetching list of files:', err);
        setError('We are experiencing technical difficulties. Please try again later.');
      }
    };

    fetchFiles();
  }, [apiUrl]); // Add apiUrl to the dependency array

  // Fetch content for each file in the list
  useEffect(() => {
    const fetchFileContents = async () => {
      try {
        const allFileContents = await Promise.all(
          files.map(async (file) => {
            try {
              const res = await axios.get(`${apiUrl}/file/${file}`);
              return res.data.lines.map((line) => ({ ...line, fileName: file }));
            } catch (err) {
              if (err.response && err.response.status === 404) {
                console.error(`File not found: ${file}`);
              } else {
                console.error(`Error fetching file content: ${file}`, err);
              }
              return []; // Return empty content for unavailable files
            }
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
  }, [files, apiUrl]); // Add apiUrl to the dependency array

  return (
    <div className="App container mt-5">
      <h1 className="mb-4 p-2 text-white bg-danger">Toolbox File Manager</h1>
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
