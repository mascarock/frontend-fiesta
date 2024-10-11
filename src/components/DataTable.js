import React from 'react';
import Table from 'react-bootstrap/Table';

function DataTable({ fileContent, isLoading, sortConfig, onSort }) {
  // Helper to render sorting indicators with always visible arrows

  return (
<Table striped bordered hover responsive className="table-responsive">
  <thead className="thead-dark">
    <tr>
      <th>
        File Name
        {/* Sorting Buttons */}
        <div className="sort-buttons">
          <button onClick={() => onSort('fileName', 'asc')} className="btn btn-light btn-sm">
            ▲
          </button>
          <button onClick={() => onSort('fileName', 'desc')} className="btn btn-light btn-sm">
            ▼
          </button>
          <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm reset-button">
            Reset
          </button>
        </div>
      </th>
      <th>
        Text
        <div className="sort-buttons">
          <button onClick={() => onSort('text', 'asc')} className="btn btn-light btn-sm">
            ▲
          </button>
          <button onClick={() => onSort('text', 'desc')} className="btn btn-light btn-sm">
            ▼
          </button>
          <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm reset-button">
            Reset
          </button>
        </div>
      </th>
      <th>
        Number
        <div className="sort-buttons">
          <button onClick={() => onSort('number', 'asc')} className="btn btn-light btn-sm">
            ▲
          </button>
          <button onClick={() => onSort('number', 'desc')} className="btn btn-light btn-sm">
            ▼
          </button>
          <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm reset-button">
            Reset
          </button>
        </div>
      </th>
      <th>
        Hex
        <div className="sort-buttons">
          <button onClick={() => onSort('hex', 'asc')} className="btn btn-light btn-sm">
            ▲
          </button>
          <button onClick={() => onSort('hex', 'desc')} className="btn btn-light btn-sm">
            ▼
          </button>
          <button onClick={() => onSort(null)} className="btn btn-outline-secondary btn-sm reset-button">
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
