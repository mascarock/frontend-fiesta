import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';  // Import axios to mock

// Mock axios
jest.mock('axios');

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
  // Simulate an empty file list from the API
  axios.get.mockResolvedValueOnce({
    data: {
      files: [],  // No files returned
    },
  });

  render(<App />);

  // Check if the component properly handles the case with no files
  await waitFor(() => {
    const noFilesMessage = screen.getByText(/No files available/i);
    expect(noFilesMessage).toBeInTheDocument();
  });
});

test('handles API error', async () => {
  // Mocking an error response from the API
  axios.get.mockRejectedValueOnce(new Error('Error fetching files'));

  // Mocking console.error to avoid polluting test logs
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);

  // Check if the error message is displayed when the API fails
  await waitFor(() => {
    const errorMessage = screen.getByText(/Error fetching files from backend/i);
    expect(errorMessage).toBeInTheDocument();
  });

  consoleErrorMock.mockRestore();  // Restore console.error after test
});
