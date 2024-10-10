import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import axios from 'axios';

// Mock axios
jest.mock('axios');

test('renders Toolbox File Manager with files', async () => {
  // Mocking axios get request for `/files`
  axios.get.mockImplementation((url) => {
    if (url === 'http://localhost:5005/files') {
      return Promise.resolve({
        data: {
          files: ['test2.csv', 'test3.csv'],
        },
      });
    }

    if (url === 'http://localhost:5005/file/test2.csv') {
      return Promise.resolve({
        data: {
          lines: [
            { text: 'File content for test2.csv', number: 1, hex: 'abc123' },
          ],
        },
      });
    }

    if (url === 'http://localhost:5005/file/test3.csv') {
      return Promise.resolve({
        data: {
          lines: [
            { text: 'File content for test3.csv', number: 2, hex: 'def456' },
          ],
        },
      });
    }

    return Promise.reject(new Error('Unknown endpoint'));
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Assert that the loading message is displayed
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the files to be fetched and displayed
  await waitFor(() => {
    expect(screen.getByText(/test2.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/test3.csv/i)).toBeInTheDocument();
  });

  // Check that the file content is also displayed
  await waitFor(() => {
    expect(screen.getByText(/File content for test2.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/File content for test3.csv/i)).toBeInTheDocument();
  });
});

test('handles no files returned from API', async () => {
  // Mock axios to return an empty list
  axios.get.mockResolvedValueOnce({
    data: {
      files: [], // Empty file list
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Wait for the Loading state to be rendered
  await waitFor(() => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Wait for the empty state message to be rendered after loading
  await waitFor(() => {
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});

test('handles API error', async () => {
  // Mock axios to throw an error
  axios.get.mockRejectedValueOnce(new Error('Error fetching files'));

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Wait for the Loading state to be rendered
  await waitFor(() => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Wait for the error state message to be rendered after the failed request
  await waitFor(() => {
    expect(screen.getByText(/We are experiencing technical difficulties. Please try again later./i)).toBeInTheDocument();
  });
});
