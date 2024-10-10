// src/__mocks__/axios.js

const axiosMock = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    // You can add other methods like post, put, delete if needed
  };
  
  export default axiosMock;
  