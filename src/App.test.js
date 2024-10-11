import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
      if (url.includes('/files')) {
        return Promise.resolve({
          data: {
            files: ['test2.csv', 'test3.csv', 'test18.csv'],
          },
        });
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
        } else if (fileName === 'test18.csv') {
          return Promise.resolve({
            data: {
              lines: [
                { fileName: 'test18.csv', text: 'Line 3', number: 789, hex: '0xFFF' },
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
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for the loading animation to disappear
    await waitFor(() => expect(screen.queryByAltText(/Loading Logo/i)).not.toBeInTheDocument(), { timeout: 3000 });

    // Wait for the data to be displayed
    await waitFor(() => expect(screen.getByText(/test2.csv/i)).toBeInTheDocument(), { timeout: 3000 });

    expect(screen.getByText(/Line 1/i)).toBeInTheDocument();
    expect(screen.getByText(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/0x7B/i)).toBeInTheDocument();
  });

  test('filters files based on user input', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Wait for the loading animation to disappear
    await waitFor(() => expect(screen.queryByAltText(/Loading Logo/i)).not.toBeInTheDocument(), { timeout: 3000 });

    // Wait for the data to be displayed
    await waitFor(() => expect(screen.getByText(/test2.csv/i)).toBeInTheDocument(), { timeout: 3000 });

    // Simulate user typing into the filter input
    const filterInput = screen.getByPlaceholderText(/Filter by file name/i);
    fireEvent.change(filterInput, { target: { value: 'test3' } });

    // Wait for the filtered data to be displayed
    await waitFor(() => expect(screen.queryByText(/test2.csv/i)).not.toBeInTheDocument(), { timeout: 3000 });
    expect(screen.getByText(/test3.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/Line 2/i)).toBeInTheDocument();
  });
});
