const axiosMock = {
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        files: ['test2.csv', 'test3.csv'],  // Update the mock data to match your expectation
      },
    })
  ),
};

export default axiosMock;
