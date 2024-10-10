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
      <tbody>
        {fileContent.map((line, index) => (
          <tr key={index}>
            <td>{line.fileName}</td>
            <td>{line.text}</td>
            <td>{line.number}</td>
            <td>{line.hex}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
