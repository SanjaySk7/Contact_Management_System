import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { actions } from './slice'; 

function* handleAddContact(action) {
  try {
    const response = yield call(axios.post, "http://localhost:5000/contacts", action.payload);

    console.log('API Response:', response.data);

    yield put(actions.addContactDetailsSuccess(response.data)); 
  } catch (error) {
    console.error('Error adding contact:', error);
    
    yield put({ type: actions.addContactDetailsError.type, error: error.message });

    if (error.response && error.response.status === 400 && error.response.data.error.includes('Contact already exists with this phone number')) {
      alert('This phone number is already in use. Please try a different one.');
    } else {
      alert('An error occurred while adding the contact. Please try again later.');
    }
  }
}


function* handleFetchContacts() {
  try {
    const response = yield call(axios.get, "http://localhost:5000/contacts");
    yield put(actions.fetchContactDetailsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchContactDetailsError(error.message));
  }
}

function* handleDeleteContact(action) {
  console.log(action.payload.id);
  try {
    yield call(axios.delete, `http://localhost:5000/contacts${action.payload.id}`);
    yield put(actions.deleteContactSuccess(action.payload.id));
  } catch (error) {
    yield put(actions.deleteContactError(error.message));
  }
}

function* handleUpdateContact(action) {
  console.log("update entry"+action.payload.id);
  try {
    const response = yield call(axios.put, `http://localhost:5000/contacts${action.payload.id}`,action.payload);
    console.log(response.data)
    yield put(actions.updateContactSuccess(response.data));
    
  } catch (error) {
    yield put(actions.updateContactError(error.message));
  }
}

export function* watchAddContact() {
  yield takeLatest(actions.addContactDetails.type, handleAddContact);
}

export function* watchFetchContacts() {
  yield takeLatest(actions.fetchContactDetails.type, handleFetchContacts);
}

export function* watchDeleteContact() {
  yield takeLatest(actions.deleteContact.type, handleDeleteContact);
}

export function* watchUpdateContact() {
  yield takeLatest(actions.updateContact.type, handleUpdateContact);
}
