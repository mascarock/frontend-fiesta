import React from 'react';
import Table from 'react-bootstrap/Table';

function DataTable({ fileContent, isLoading }) {
  return (
    <Table striped bordered hover responsive>
      <thead className="thead-dark">
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody data-testid="table-body"> 
        {isLoading ? (
          // If the data is still loading
          <tr>
            <td colSpan="4" className="text-center">Loading Data...</td>
          </tr>
        ) : fileContent.length > 0 ? (
          // If data is available and loaded
          fileContent.map((line, index) => (
            <tr key={index}>
              <td>{line.fileName}</td>
              <td>{line.text}</td>
              <td>{line.number}</td>
              <td>{line.hex}</td>
            </tr>
          ))
        ) : (
          // If no file was found after search
          <tr>
            <td colSpan="4" className="text-center">File not found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default DataTable;
