import {configureStore} from '@reduxjs/toolkit'
import createSageMiddleware from "redux-saga";
import reducers from "./reducers"
import root from "./sagas";

const sagaMiddleware=createSageMiddleware();

export const store=configureStore({
    devTools:true,
    reducer:reducers,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware)

})

sagaMiddleware.run(root);