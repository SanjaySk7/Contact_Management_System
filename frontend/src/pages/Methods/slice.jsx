import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  error: '',
  loading: false,
};

const addContactSlice = createSlice({
  name: 'addContactDetails',
  initialState,
  reducers: {
    addContactDetails(state, action) {
      state.loading = true;
    },
    addContactDetailsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      console.log("Added Contact:", action.payload);
    },
    addContactDetailsError(state, action) {
      state.loading = false;
      state.error = action.payload;
      console.log("Error")
    },
    fetchContactDetails(state) {
      state.loading = true;
    },
    fetchContactDetailsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchContactDetailsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    deleteContact(state) {
      state.loading = true;
    },
    deleteContactSuccess(state, action) {
      console.log(action.payload);
      
      state.loading = false;
      state.data = state.data.filter(contact => contact._id !== action.payload);
    },
    deleteContactError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateContact(state) {
      state.loading = true;
    },
    updateContactSuccess(state, action) {
      state.loading = false;
      const updatedContactIndex = state.data.findIndex(contact => contact._id === action.payload._id);
      if (updatedContactIndex >= 0) {
        state.data[updatedContactIndex] = action.payload;
      }
    },
    updateContactError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer } = addContactSlice;
export default reducer;
