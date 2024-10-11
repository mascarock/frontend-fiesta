import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

test('renders table with file content', () => {
  const mockFileContent = [
    { fileName: 'test2.csv', text: 'Line 1', number: 123, hex: '0x7B' },
    { fileName: 'test3.csv', text: 'Line 2', number: 456, hex: '0x1C8' },
  ];

  render(<DataTable fileContent={mockFileContent} />);

  // Check if the table headers are rendered correctly
  expect(screen.getByText(/File Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Text/i)).toBeInTheDocument();
  expect(screen.getByText(/Number/i)).toBeInTheDocument();
  expect(screen.getByText(/Hex/i)).toBeInTheDocument();

  // Check if the file content is rendered correctly
  expect(screen.getByText(/test2.csv/i)).toBeInTheDocument();
  expect(screen.getByText(/test3.csv/i)).toBeInTheDocument();
  expect(screen.getByText(/Line 1/i)).toBeInTheDocument();
  expect(screen.getByText(/123/i)).toBeInTheDocument();
  expect(screen.getByText(/0x7B/i)).toBeInTheDocument();
});

test('renders empty table when no file content is provided', () => {
    render(<DataTable fileContent={[]} />);
    
    // Check for "No data available" when there is no file content
    expect(screen.getByText(/Loading data.../i)).toBeInTheDocument();
    
    // Ensure the table is rendered
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0); // The header row should be present
  });
  
  
