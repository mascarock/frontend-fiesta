// src/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-bootstrap
jest.mock('react-bootstrap/Table', () => {
  return ({ children }) => <table>{children}</table>;
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
