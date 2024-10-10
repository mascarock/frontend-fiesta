import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';  // Import axios to mock

// Mock axios
jest.mock('axios');

test('renders Toolbox File Manager', async () => {
  // Mocking axios get request for `/files`
  axios.get.mockResolvedValueOnce({
    data: {
      files: ['test2.csv', 'test3.csv'],  // Simulate the correct structure for the `/files` API call
    },
  });

  render(<App />);

  // Ensure that the component renders correctly after the mock data is fetched
  await waitFor(() => {
    const linkElement = screen.getByText(/Toolbox File Manager/i);
    expect(linkElement).toBeInTheDocument();
  });

  // You can add more assertions here if needed
});
