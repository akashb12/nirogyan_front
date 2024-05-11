import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const register = createAsyncThunk('register',async(data)=> {
    const res = await axiosRequest.post('/api/user/register',data,{ withCredentials: true }).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
});

export const login = createAsyncThunk('login',async(data) => {
    const res = await axiosRequest.post('api/user/login',data,{withCredentials : true}).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
});

export const logout = createAsyncThunk('logout',async()=> {
    const res = await axiosRequest.post('/api/user/logout',{data:''},{ withCredentials: true }).then((res)=> res).catch((err)=>err.response);
    localStorage.removeItem('user');
    return {status:res.status,data:res.data};
})

export const userSliceData = createSlice({
    name:'users',
    initialState:{
        registerUser:{},
        loginUser:{},
        logoutUser:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(register.fulfilled,(state,{payload})=> {
            state.registerUser = payload;
        });
        builder.addCase(login.fulfilled,(state,{payload}) => {
            state.loginUser = payload;
        });
        builder.addCase(logout.fulfilled,(state,{payload}) => {
            state.logoutUser = payload;
        })
    }
})
export const user = ({ users }) => users;
export default userSliceData.reducer;