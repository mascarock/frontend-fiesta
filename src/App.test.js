// src/App.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import fileReducer from './redux/fileSlice';

jest.mock('axios');
import axios from 'axios';

describe('App component', () => {
  let store;

  beforeEach(() => {
    // Mock the API responses
    axios.get.mockImplementation((url) => {
      console.log('axios.get called with url:', url);
      if (url.includes('/files')) {
        // Simulate a backend error for the '/files' endpoint
        const error = new Error('Request failed with status code 500');
        error.response = {
          status: 500,
          statusText: 'Internal Server Error',
        };
        return Promise.reject(error);
      } else if (url.includes('/file/')) {
        const fileName = url.substring(url.lastIndexOf('/') + 1);
        if (fileName === 'test2.csv') {
          return Promise.resolve({
            data: {
              lines: [
                { fileName: 'test2.csv', text: 'Line 1', number: 123, hex: '0x7B' },
              ],
            },
          });
        } else if (fileName === 'test3.csv') {
          return Promise.resolve({
            data: {
              lines: [
                { fileName: 'test3.csv', text: 'Line 2', number: 456, hex: '0x1C8' },
              ],
            },
          });
        } else {
          const error = new Error(`Unknown file: ${fileName}`);
          error.response = {
            status: 404,
            statusText: 'Not Found',
          };
          return Promise.reject(error);
        }
      } else {
        const error = new Error(`Unknown URL: ${url}`);
        error.response = {
          status: 404,
          statusText: 'Not Found',
        };
        return Promise.reject(error);
      }
    });

    // Create the Redux store
    store = configureStore({
      reducer: {
        files: fileReducer,
      },
    });
  });

  test('fetches and displays files on mount', async () => {
    // Adjust the mock to return success for '/files' endpoint
    axios.get.mockImplementationOnce((url) => {
      if (url.includes('/files')) {
        return Promise.resolve({
          data: {
            files: ['test2.csv', 'test3.csv'],
          },
        });
      }
      return axios.get(url); // Use the existing mock for other URLs
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for the data to be displayed
    await waitFor(() => expect(screen.getByText(/test2.csv/i)).toBeInTheDocument());

    expect(screen.getByText(/Line 1/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/0x7B/i)).toBeInTheDocument();
  });

  test('displays error message when fetching files fails', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for the error message to be displayed
    await waitFor(() =>
      expect(
        screen.getByText(
          /We are experiencing technical difficulties. Please try again later./i
        )
      ).toBeInTheDocument()
    );

    // Ensure that the data is not displayed
    expect(screen.queryByText(/test2.csv/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Line 1/i)).not.toBeInTheDocument();
  });
});
