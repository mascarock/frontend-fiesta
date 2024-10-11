import React from 'react';
import Table from 'react-bootstrap/Table';

function DataTable({ fileContent, isLoading, sortConfig, onSort }) {
  // Helper to render sorting indicators with always visible arrows
  const renderSortIcon = (column) => {
    const isActive = sortConfig && sortConfig.key === column;
    const activeColor = isActive ? '#000' : '#ccc'; // Active column has a bold color, inactive is dimmed

    return (
      <span>
        <span style={{ color: sortConfig && sortConfig.direction === 'asc' && isActive ? activeColor : '#ccc' }}>
          ▲
        </span>
        <span style={{ color: sortConfig && sortConfig.direction === 'desc' && isActive ? activeColor : '#ccc', marginLeft: '2px' }}>
          ▼
        </span>
      </span>
    );
  };

  return (
    <Table striped bordered hover responsive>
      <thead className="thead-dark">
        <tr>
          <th>
            File Name
            {/* Sorting Buttons */}
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <button onClick={() => onSort('fileName', 'asc')} className="btn btn-light btn-sm">
                ▲
              </button>
              <button onClick={() => onSort('fileName', 'desc')} className="btn btn-light btn-sm" style={{ marginLeft: '5px' }}>
                ▼
              </button>
              <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm" style={{ marginLeft: '10px' }}>
                Reset
              </button>
            </div>
          </th>
          <th>
            Text
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <button onClick={() => onSort('text', 'asc')} className="btn btn-light btn-sm">
                ▲
              </button>
              <button onClick={() => onSort('text', 'desc')} className="btn btn-light btn-sm" style={{ marginLeft: '5px' }}>
                ▼
              </button>
              <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm" style={{ marginLeft: '10px' }}>
                Reset
              </button>
            </div>
          </th>
          <th>
            Number
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <button onClick={() => onSort('number', 'asc')} className="btn btn-light btn-sm">
                ▲
              </button>
              <button onClick={() => onSort('number', 'desc')} className="btn btn-light btn-sm" style={{ marginLeft: '5px' }}>
                ▼
              </button>
              <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm" style={{ marginLeft: '10px' }}>
                Reset
              </button>
            </div>
          </th>
          <th>
            Hex
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>
              <button onClick={() => onSort('hex', 'asc')} className="btn btn-light btn-sm">
                ▲
              </button>
              <button onClick={() => onSort('hex', 'desc')} className="btn btn-light btn-sm" style={{ marginLeft: '5px' }}>
                ▼
              </button>
              <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm" style={{ marginLeft: '10px' }}>
                Reset
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody data-testid="table-body">
        {isLoading ? (
          <tr>
            <td colSpan="4" className="text-center">Loading Data...</td>
          </tr>
        ) : fileContent.length > 0 ? (
          fileContent.map((line, index) => (
            <tr key={index}>
              <td>{line.fileName}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">File not found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default DataTable;
