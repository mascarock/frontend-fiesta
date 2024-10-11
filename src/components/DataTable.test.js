import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

test('renders table with file content', () => {
  const mockFileContent = [
    { fileName: 'test2.csv', text: 'Line 1', number: 123, hex: '0x7B' },
    { fileName: 'test3.csv', text: 'Line 2', number: 456, hex: '0x1C8' },
    { fileName: 'test18.csv', text: 'Line 3', number: 789, hex: '0xFFF' },
  ];

  render(<DataTable fileContent={mockFileContent} isLoading={false} />);

  // Check if the table headers are rendered correctly
  expect(screen.getByText(/File Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Text/i)).toBeInTheDocument();
  expect(screen.getByText(/Number/i)).toBeInTheDocument();
  expect(screen.getByText(/Hex/i)).toBeInTheDocument();

  // Check if the file content is rendered correctly
  expect(screen.getByText(/test2.csv/i)).toBeInTheDocument();
  expect(screen.getByText(/test3.csv/i)).toBeInTheDocument();
  expect(screen.getByText(/test18.csv/i)).toBeInTheDocument();
});

test('renders "File not found" when no file content is provided and not loading', () => {
  render(<DataTable fileContent={[]} isLoading={false} />);

  // Check for "File not found" when there is no file content
  expect(screen.getByText(/File not found/i)).toBeInTheDocument();
  
  // Ensure the table is rendered
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeGreaterThan(0); // The header row should be present
});

test('renders "Loading Data..." when isLoading is true', () => {
  render(<DataTable fileContent={[]} isLoading={true} />);

  // Check for "Loading Data..." when the table is loading
  expect(screen.getByText(/Loading Data.../i)).toBeInTheDocument();
  
  // Ensure the table is rendered
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeGreaterThan(0); // The header row should be present
});
