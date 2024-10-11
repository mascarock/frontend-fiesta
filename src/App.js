// src/App.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, fetchFileContents } from './redux/fileSlice';
import DataTable from './components/DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  const { files, fileContent, status, error } = useSelector((state) => state.files);
  const [filter, setFilter] = useState('');

  // Fetch files on mount
  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  // Fetch file contents when files are loaded
  useEffect(() => {
    if (files.length > 0) {
      dispatch(fetchFileContents(files));
    }
  }, [dispatch, files]);

  // Handle filter input change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter the fileContent based on the filter input
  const filteredFileContent = fileContent.filter((item) =>
    item.fileName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App container mt-5">
      <h1 className="mb-4 p-2 text-white bg-danger">Toolbox File Manager</h1>

      {/* Filter Input */}
      <div className="mb-3">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by file name"
          className="form-control"
        />
      </div>

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
        <DataTable fileContent={filteredFileContent} />
      )}
    </div>
  );
}

export default App;
