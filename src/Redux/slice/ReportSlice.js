import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { axiosRequest } from '../axios';

export const getReportList = createAsyncThunk('getReportList',async(data)=> {
    const res = await axiosRequest.get('/api/patient/reports').then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
});

export const createReport = createAsyncThunk('createReport',async(data)=> {
    const res = await axiosRequest.post('/api/patient/createReport',data).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
});

export const updateReport = createAsyncThunk('updateReport',async(data)=> {
    const{_id,...fields} = data
    const res = await axiosRequest.put(`/api/patient/updateReport/${_id}`,fields).then((res)=>res).catch((err) => err.response);
    return {status:res.status,data:res.data};
});
export const reportSliceData = createSlice({
    name:'reports',
    initialState:{
        reportList:{},
        createReport:{},
        updateReport:{}
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getReportList.fulfilled,(state,{payload})=> {
            state.reportList = payload;
        });
        builder.addCase(createReport.fulfilled,(state,{payload})=> {
            state.createReport = payload;
        });
        builder.addCase(updateReport.fulfilled,(state,{payload})=> {
            state.updateReport = payload;
        });
    }
})
export const report = ({ reports }) => reports;
export default reportSliceData.reducer;