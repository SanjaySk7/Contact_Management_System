import { all } from "redux-saga/effects";
import { watchAddContact,watchFetchContacts,watchDeleteContact,watchUpdateContact } from "../pages/Methods/saga";

export default function* productSages(){
    yield all([
        watchAddContact(), 
        watchFetchContacts(),
        watchDeleteContact(),
        watchUpdateContact(),
      ]);
}