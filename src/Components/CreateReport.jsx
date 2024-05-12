import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Fields from './Fields';
import { createReport, updateReport } from '../Redux/slice/ReportSlice';
import { MyContext } from '../MyContext';
import { useContext } from 'react';

const CreateReport = ({ openDialog, closeDialog, editReport }) => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [patientFields, setPatientFields] = useState({ name: "", age: "", address: "", phone: "", examined_by: "", examined_for_disease: "", examined_date: new Date().toISOString().substr(0, 10), patient_result: [], test_result: "" });
    const [testFields, setTestFields] = useState([{ id: 0, test_name: "", normal_range: "", patient_value: "" }]);
    const { setLoader } = useContext(MyContext);
    const dispatch = useDispatch();
    const steps = [
        {
            label: 'Add Patient Details'
        },
        {
            label: 'Add Tests Conducted'
        },
    ];

    useEffect(() => {
        if (Object.keys(editReport).length) {
            setPatientFields(editReport);
            setTestFields(editReport.patient_result);
        }
    }, [editReport])

    useEffect(() => {
        setOpen(openDialog)
    }, [openDialog])

    const handleClose = () => {
        setOpen(false);
        handleReset();
        closeDialog();
    };

    const handleNext = async (index) => {
        setError('');
        if (index == 0) {
            if (!patientFields.name || !patientFields.age || !patientFields.address || !patientFields.phone || !patientFields.examined_by || !patientFields.examined_for_disease) {
                setError('Some Fields Are Missing');
                return
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if (index == steps.length - 1) {
            setLoader(true);
            if (!patientFields.test_result || !testFields[0].test_name || !testFields[0].normal_range || !testFields[0].patient_value) {
                setError('Some Fields Are Missing');
                setLoader(false);
                return
            }
            const updatedPatientFields = {
                ...patientFields,
                patient_result: testFields
            };
            setPatientFields(updatedPatientFields);
            if (Object.keys(editReport).length) {
                updateData(updatedPatientFields)
            } else {
                submitData(updatedPatientFields);
            }
        }
    };
    const submitData = (updatedPatientFields) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch(createReport(updatedPatientFields)).then((res) => {
            setLoader(false);
            if (res.payload.status != 201) {
                setError(res.payload.data)
            } else {
                handleClose();
            }
        })

    }

    const updateData = (updatedPatientFields) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch(updateReport(updatedPatientFields)).then((res) => {
            setLoader(false);
            if (res.payload.status != 200) {
                setError(res.payload.data)
            } else {
                handleClose();
            }
        })

    }


    const handleBack = () => {
        setError('');
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setError('');
        setActiveStep(0);
    };

    const patientFieldsChange = (event) => {
        const { name, value } = event.target;
        setPatientFields(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const testFieldsChange = (event, index) => {
        const updatedRow = testFields.map((item) => {
            if (item.id == index) {
                return { ...item, [event.target.name]: event.target.value }
            }
            return item;
        })
        setTestFields(updatedRow)
    }

    const addDynamicFields = () => {
        const newItem = { id: testFields.length + 1, test_name: "", normal_range: "", patient_value: "" };
        setTestFields([...testFields, newItem])
    }
    const removeDynamicFields = () => {
        if (testFields.length > 1) {
            setTestFields(testFields.slice(0, -1))
        }
    }
    return (
        <div>

            <Dialog
                fullWidth maxWidth="md"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form'
                }}
            >
                <DialogTitle>Create Report</DialogTitle>
                <DialogContent>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => (
                                <Step key={step.label}>
                                    <StepLabel
                                        optional={
                                            index === 1 ? (
                                                <Typography variant="caption">Last step</Typography>
                                            ) : null
                                        }
                                    >
                                        {step.label}
                                    </StepLabel>
                                    <StepContent>
                                        {index !== steps.length - 1 &&
                                            <div>
                                                <Fields name='name' label='Name' value={patientFields.name} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                <Fields name='address' label='Address' value={patientFields.address} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                <div className='create-report-form'>
                                                    <Fields name='age' label='Age' value={patientFields.age} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                    <Fields name='phone' label='Phone' value={patientFields.phone} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                </div>
                                                <div className='create-report-form'>
                                                    <Fields name='examined_by' label='Examined By' value={patientFields.examined_by} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                    <Fields name='examined_for_disease' label='Examined For' value={patientFields.examined_for_disease} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                </div>
                                                <Fields name='examined_date' label='Examined Date' value={patientFields.examined_date} onFieldsChange={(e) => patientFieldsChange(e)} />
                                                {error && <span className='error'>*{error}</span>}
                                            </div>
                                        }
                                        {index == steps.length - 1 &&
                                            <div>
                                                {
                                                    testFields.map((item, index) => (
                                                        <div className='create-report-form'>
                                                            <Fields name='test_name' label='Test Name' value={item.test_name} onFieldsChange={(e) => testFieldsChange(e, item.id)} />
                                                            <Fields name='normal_range' label='Normal Range' value={item.normal_range} onFieldsChange={(e) => testFieldsChange(e, item.id)} />
                                                            <Fields name='patient_value' label='Patient Value' value={item.patient_value} onFieldsChange={(e) => testFieldsChange(e, item.id)} />
                                                        </div>
                                                    ))
                                                }
                                                <Button
                                                    onClick={addDynamicFields}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Add More
                                                </Button>
                                                <Button
                                                    disabled={testFields.length === 1}
                                                    onClick={removeDynamicFields}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Remove
                                                </Button>
                                                <div>
                                                    <TextField
                                                        className='create-report-form-field'
                                                        autoFocus
                                                        required
                                                        margin="dense"
                                                        id="test_result"
                                                        name="test_result"
                                                        label="Test Result"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        value={patientFields.test_result}
                                                        onChange={(e) => patientFieldsChange(e)}
                                                    />
                                                </div>
                                                {error && <span className='error'>*{error}</span>}
                                            </div>
                                        }
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleNext(index)}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>All steps completed - you&apos;re finished</Typography>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Reset
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateReport
