import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';  // Import axios to mock

// Mock axios
jest.mock('axios');

// Mock console.error to silence the error output in the test
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();  // Restore the original implementation after each test
});

test('renders Toolbox File Manager with files', async () => {
  // Mocking axios get request for `/files`
  axios.get.mockImplementation((url) => {
    if (url.includes('/files')) {
      return Promise.resolve({
        data: {
          files: ['test2.csv', 'test3.csv'],  // Mock file list
        },
      });
    } else if (url.includes('/file/test2.csv')) {
      return Promise.resolve({
        data: {
          lines: [
            { text: 'Line 1', number: 123, hex: '0x7B' },
          ],
        },
      });
    } else if (url.includes('/file/test3.csv')) {
      return Promise.resolve({
        data: {
          lines: [
            { text: 'Line 2', number: 456, hex: '0x1C8' },
          ],
        },
      });
    }
    return Promise.reject(new Error('File not found'));
  });

  render(<App />);

  // Ensure that the component renders the Toolbox File Manager title
  await waitFor(() => {
    const linkElement = screen.getByText(/Toolbox File Manager/i);
    expect(linkElement).toBeInTheDocument();
  });

  // Ensure that the files are rendered in the component
  await waitFor(() => {
    expect(screen.getByText(/test2.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/test3.csv/i)).toBeInTheDocument();
  });
});

test('handles no files returned from API', async () => {
  // Mocking axios get request for `/files` with an empty list
  axios.get.mockResolvedValueOnce({ data: { files: [] } });

  render(<App />);

  // Wait for the "No data available" message to appear
  await waitFor(() => {
    const noFilesMessage = screen.getByText(/No data available/i);
    expect(noFilesMessage).toBeInTheDocument();
  });
});

test('handles API error', async () => {
  // Mocking axios get request for `/files` to throw an error
  axios.get.mockRejectedValueOnce(new Error('Error fetching files'));

  render(<App />);

  // Wait for the error message to appear
  await waitFor(() => {
    const errorMessage = screen.getByText(/We are experiencing technical difficulties. Please try again later./i);
    expect(errorMessage).toBeInTheDocument();
  });
});