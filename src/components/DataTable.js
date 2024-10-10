import React from 'react';
import Table from 'react-bootstrap/Table';

function DataTable({ fileContent }) {
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
        {fileContent.length > 0 ? (
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
            <td colSpan="4" className="text-center">No data available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default DataTable;
