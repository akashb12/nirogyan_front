import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { register } from '../Redux/slice/UserSlice';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
function RegisterPage(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = () => {
        setError('')
        if(!name || !password || !phone || !address) {
            setError('Please Fill All Details')
            return;
        }
        let data ={
            name:name,
            password:password,
            phone:phone,
            address:address
        }
        dispatch(register(data)).then((res) => {
            if(res.payload.status != 201) {
                setError(res.payload.data)
            } else {
                if(res.payload && res.payload.data) {
                    navigate('/login')
                } else {
                    setError('Something went wrong')
                }
            }
        })
    }
    return(
        <div className="authentication-component">
            <div className='authentication-form'>
                <h1 className='authentication-title'>Register</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '40ch' }, display: 'flex', flexDirection: 'column'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic-name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} required />
                    <TextField id="outlined-basic-password"type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} required />
                    <TextField type='number' id="outlined-basic-phone" label="Phone" variant="outlined" onChange={(e) => setPhone(e.target.value)} required inputProps={{ maxLength: 10 }}/>
                    <TextField id="outlined-basic-address" label="Address" variant="outlined" onChange={(e) => setAddress(e.target.value)} required />
                    {error && <span className='error'>*{error}</span>}
                    <Button variant="contained" onClick={submit}>Submit</Button>
                </Box>
            </div>
        </div>
    )
}
export default RegisterPage