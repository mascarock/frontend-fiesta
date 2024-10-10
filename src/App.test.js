import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        files: ['test2.csv', 'test3.csv']  // Update mock response to return these files
      }
    })
  ),
}));

test('renders Toolbox File Manager', async () => {
  render(<App />);  // No need for manual act()

  await waitFor(() => {
    const linkElement = screen.getByText(/Toolbox File Manager/i);
    expect(linkElement).toBeInTheDocument();
  });
});
