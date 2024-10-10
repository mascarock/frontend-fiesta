const axiosMock = {
  get: jest.fn((url) => {
    if (url.includes('/files')) {
      return Promise.resolve({
        data: {
          files: ['test2.csv', 'test3.csv'], // Correctly mocked response
        },
      });
    } else if (url.includes('/file/test2.csv')) {
      return Promise.resolve({
        data: {
          lines: [
            { text: 'sample text', number: 123, hex: 'abc123', fileName: 'test2.csv' },
            { text: 'sample text 2', number: 456, hex: 'def456', fileName: 'test2.csv' },
          ],
        },
      });
    } else if (url.includes('/file/test3.csv')) {
      return Promise.resolve({
        data: {
          lines: [
            { text: 'sample text', number: 123, hex: 'abc123', fileName: 'test3.csv' },
            { text: 'sample text 2', number: 456, hex: 'def456', fileName: 'test3.csv' },
          ],
        },
      });
    } else {
      // Return a rejection for unknown URLs to simulate an error
      return Promise.reject(new Error(`Unknown URL: ${url}`));
    }
  }),
};

export default axiosMock;
