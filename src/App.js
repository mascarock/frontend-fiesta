// src/App.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, fetchFileContents } from './redux/fileSlice'; // Import your actions
import DataTable from './components/DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  const { files, fileContent, status, error } = useSelector((state) => state.files);

  // Dispatch action to fetch files on mount
  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  // Fetch file content when files are loaded
  useEffect(() => {
    if (files.length > 0) {
      dispatch(fetchFileContents(files));
    }
  }, [dispatch, files]);

  return (
    <div className="App container mt-5">
      <h1 className="mb-4 p-2 text-white bg-danger">Toolbox File Manager</h1>
      {status === 'loading' && files.length === 0 && (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      )}
      {error ? (
        <div className="alert alert-danger" role="alert">
          We are experiencing technical difficulties. Please try again later.
        </div>
      ) : (
        <DataTable fileContent={fileContent} />
      )}
    </div>
  );
}

export default App;
