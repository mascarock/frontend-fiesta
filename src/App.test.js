import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import axios from 'axios';

// Mock axios
jest.mock('axios');

test('renders Toolbox File Manager with files', async () => {
  // Mock axios to return list of files
  axios.get.mockResolvedValueOnce({
    data: {
      files: ['test2.csv', 'test3.csv'],
    },
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Assert that the loading message is displayed initially
  expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the loading message to disappear and the data to be displayed
  await waitFor(() => {
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  // Assert that the files are displayed after loading
  await waitFor(() => {
    expect(screen.getByText(/test2.csv/i)).toBeInTheDocument();
    expect(screen.getByText(/test3.csv/i)).toBeInTheDocument();
  });
});

test('handles no files returned from API', async () => {
  // Mock axios to return an empty list of files
  axios.get.mockResolvedValueOnce({
    data: {
      files: [],
    },
  });

  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Assert that the loading message is displayed initially
  expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the empty state message to be rendered after loading
  await waitFor(() => {
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});

test('handles API error', async () => {
  // Mock axios to throw an error
  axios.get.mockRejectedValueOnce(new Error('Error fetching files'));

  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Wait for the error message to be displayed
  await waitFor(() => {
    expect(screen.getByText(/We are experiencing technical difficulties. Please try again later./i)).toBeInTheDocument();
  });
});
