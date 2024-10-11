import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the API URL from the environment variable
const apiUrl = process.env.API_URL || 'http://localhost:5005';

// Fetch files from backend
export const fetchFiles = createAsyncThunk('files/fetchFiles', async () => {
  const response = await axios.get(`${apiUrl}/files`); // Use the API URL for endpoint
  return response.data.files;
});

// Fetch contents for each file
export const fetchFileContents = createAsyncThunk('files/fetchFileContents', async (files) => {
  const allFileContents = await Promise.all(
    files.map(async (file) => {
      try {
        const response = await axios.get(`${apiUrl}/file/${file}`); // Use the API URL for endpoint
        return response.data.lines.map((line) => ({ ...line, fileName: file }));
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`File not found: ${file}`);
        } else {
          console.error(`Error fetching file content: ${file}`, error);
        }
        return [];
      }
    })
  );
  return allFileContents.flat();
});

// Define the file slice
const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    fileContent: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.files = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFileContents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFileContents.fulfilled, (state, action) => {
        state.fileContent = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFileContents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default fileSlice.reducer;
