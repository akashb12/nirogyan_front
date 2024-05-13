import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { getReportList } from '../Redux/slice/ReportSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import CreateReport from './CreateReport';
import { Link } from 'react-router-dom';

export default function ReportList() {
    const dispatch = useDispatch();
    const [reports, setReports] = useState([]);
    const [reportDetails, setReportDetails] = useState({});
    const [createReportDialog, setCreateReportDialogue] = useState(false);

    const columns = [
        { id: 'name', label: 'Patient Name', minWidth: 170 },
        { id: 'examined_for_disease', label: 'Test Conducted', minWidth: 100 },
        {
            id: 'phone',
            label: 'Phone',
            minWidth: 170,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'examined_date',
            label: 'Examined Date',
            minWidth: 170,
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'test_result',
            label: 'Result',
            minWidth: 100,
            format: (value) => value.toFixed(2),
        }
    ];

    const getReportListData = () => {
        dispatch(getReportList()).then((res) => {
            if (res.payload.status !== 200) {
                console.log('something went wrong')
            } else {
                setReports(res.payload.data)
            }
        })
    }

    const closeReportDialog = () => {
        setCreateReportDialogue(false);
        getReportListData();
    };

    const addReport = () => {
        setReportDetails({});
        setCreateReportDialogue(true);
    }

    const editReport = (data) => {
        setReportDetails(data);
        setCreateReportDialogue(true);
    }

    useEffect(() => {
        getReportListData();
    },[])
    
    return (
        <>
            <Paper className='report-list' sx={{ width: '100%', overflow: 'hidden' }}>
                {reports && reports.length ? 
                <TableContainer className='report-table-list' sx={{ maxHeight: 440 }}>
                <div className='report-add-button'>
                    <Button variant="contained" onClick={addReport}>Create New Report</Button>
                </div>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell>
                                            <EditIcon className='icon' onClick={()=> editReport(row)} />
                                            <Link to={`/report/${row._id}`} target="_blank"><VisibilityIcon className='icon' /></Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer> : 
            <div>
                <h1>No Reports Found</h1>
                <div className='report-add-button-no-data'>
                    <Button variant="contained" onClick={addReport}>Create New Report</Button>
                </div>
            </div>    
            }
            </Paper>
            {createReportDialog && <CreateReport openDialog={createReportDialog} closeDialog={closeReportDialog} editReport={reportDetails} />}

        </>
    );
}