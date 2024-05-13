import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getReportDetails } from '../Redux/slice/ReportSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const ReportPage = () => {
    const { id } = useParams();
    const [reportDetails, setReportDetails] = useState({});
    const dispatch = useDispatch()

    const getReportData = () => {
        dispatch(getReportDetails(id)).then((res) => {
            if (res.payload.status !== 200) {
                console.log('something went wrong')
            } else {
                setReportDetails(res.payload.data)
            }
        })
    }
    const downloadPDF = () => {
        const input = document.getElementById("report-page");

        html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "pt", // units are in points
                format: [canvas.width, canvas.height],
            });

            // Calculate the aspect ratio to fit the entire page
            const aspectRatio = canvas.width / canvas.height;
            const width = pdf.internal.pageSize.getWidth();
            const height = width / aspectRatio;

            // Add the captured image to the PDF
            pdf.addImage(imgData, "PNG", 0, 0, width, height);

            // Save the PDF
            pdf.save("report.pdf");
        });
    };
    useEffect(() => {
        getReportData();
    }, [])


    return (
        <>
        <div className='pdf-download'>
        <DownloadForOfflineIcon fontSize='large' onClick={downloadPDF} />
        </div>
        <div className="report-page" id="report-page">
            <div className="report-page-heading">
            <h1>{reportDetails?.lab_id?.lab_name.toUpperCase()}</h1>
                <p>{reportDetails?.lab_id?.address}</p>
                <p>Mob: {reportDetails?.lab_id?.phone}</p>
            </div>
            <div className='report-page-body'>
                <div className="report-page-patientinfo">
                    <div>
                        <h4>Patient Information</h4>
                        <div className="patient-data">
                            <span>NAME:</span>
                            <span>{reportDetails?.name?.toUpperCase()}</span>
                        </div>
                        <div className="patient-data">
                            <span>GENDER:</span>
                            <span>{reportDetails?.gender?.toUpperCase()}</span>
                        </div>
                        <div className="patient-data">
                            <span>AGE:</span>
                            <span>{reportDetails?.age}</span>
                        </div>
                        <div className="patient-data">
                            <span>PHONE:</span>
                            <span>{reportDetails?.phone}</span>
                        </div>
                    </div>
                    <div>
                        <h4>Specimen Information</h4>
                        <div className="patient-data">
                            <span>REPORT ID:</span>
                            <span>{reportDetails?._id}</span>
                        </div>
                        <div className="patient-data">
                            <span>DATE:</span>
                            <span>{reportDetails?.examined_date}</span>
                        </div>
                        <div className="patient-data">
                            <span>REF BY:</span>
                            <span>DR. {reportDetails?.examined_by?.toUpperCase()}</span>
                        </div>
                        <div className="patient-data">
                            <span>TEST:</span>
                            <span>{reportDetails?.examined_for_disease?.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                <div className="report-table">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Test Name</TableCell>
                                    <TableCell align="right">Patient Value</TableCell>
                                    <TableCell align="right">Normal Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportDetails?.patient_result?.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.test_name?.toUpperCase()}
                                        </TableCell>
                                        <TableCell align="right">{row.patient_value}</TableCell>
                                        <TableCell align="right">{row.normal_range}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='report-result'>
                    <h4>{reportDetails.examined_for_disease} Test Result: {reportDetails?.test_result?.toUpperCase()}</h4>
                </div>
            </div>
        </div>
        </>

    )
}
export default ReportPage