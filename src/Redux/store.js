import { configureStore } from "@reduxjs/toolkit";
import users from './slice/UserSlice';

const store = configureStore({
    reducer:{
        users:users
    }
})
export default store;