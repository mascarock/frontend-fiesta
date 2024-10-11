import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles, fetchFileContents } from './redux/fileSlice';
import DataTable from './components/DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming you have this for any custom styling

const naturalSort = (a, b) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};

function App() {
  const dispatch = useDispatch();
  const { files, fileContent, status, error } = useSelector((state) => state.files);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState(null); // Sorting config state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch files on mount
  useEffect(() => {
    dispatch(fetchFiles());

    // Set loading state to false after 2 seconds (to coincide with animation time)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
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

  // Handle sorting logic
  const onSort = (key, direction = null) => {
    if (key && direction) {
      setSortConfig({ key, direction });
    } else {
      setSortConfig(null); // Reset sort config
    }
  };

  // Filter the fileContent based on the filter input
  let filteredFileContent = fileContent.filter((item) =>
    item.fileName.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort the filtered content based on sortConfig
  if (sortConfig !== null) {
    filteredFileContent.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === 'fileName') {
        return sortConfig.direction === 'asc' ? naturalSort(aValue, bValue) : naturalSort(bValue, aValue);
      } else if (!isNaN(aValue) && !isNaN(bValue)) {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        return sortConfig.direction === 'asc'
          ? aValue.toString().localeCompare(bValue.toString())
          : bValue.toString().localeCompare(aValue.toString());
      }
    });
  }

  return (
    <div className="App container mt-3">
      {loading ? (
        <div className="loading-screen">
          <img
            src={`${process.env.PUBLIC_URL}/logo-retina-inverted.png`}
            alt="Loading Logo"
            className="loading-logo"
          />
        </div>
      ) : (
        <>
          <div className="header-container rounded p-3 mb-4 d-flex align-items-center bg-danger flex-wrap">
            <img
              src={`${process.env.PUBLIC_URL}/logo-retina.png`}
              alt="Logo"
              className="logo-img"
            />
            <h1 className="text-white responsive-header">File Manager</h1>
          </div>

          {/* Filter Input */}
          <div className="mb-3 text-center">
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filter by file name"
              className="form-control filter-input"
            />
          </div>

          {error ? (
            <div className="alert alert-danger" role="alert">
              We are experiencing technical difficulties. Please try again later.
            </div>
          ) : (
            <div className="table-responsive">
              <DataTable
                fileContent={filteredFileContent}
                isLoading={status === 'loading'}
                sortConfig={sortConfig}
                onSort={onSort}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
