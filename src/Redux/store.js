import { configureStore } from "@reduxjs/toolkit";
import users from './slice/UserSlice';
import reports from './slice/ReportSlice';

const store = configureStore({
    reducer:{
        users:users,
        reports:reports
    }
})
export default store;