import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login } from '../Redux/slice/UserSlice';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
function LoginPage(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = () => {
        setError('')
        if(!name || !password) {
            setError('Please Fill All Details')
            return;
        }
        let data ={
            name:name,
            password:password
        }
        dispatch(login(data)).then((res) => {
            if(res.payload.status !== 200) {
                setError(res.payload.data)
            } else {
                localStorage.setItem('user',JSON.stringify(res.payload.data.data));
                if(res.payload && res.payload.data) {
                    navigate('/')
                } else {
                    setError('Something went wrong')
                }
            }
        })
    }
    return(
        <div className="authentication-component">
            <div className='authentication-form'>
                <h1 className='authentication-title'>Login</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: {xs:'32ch',sm:'40ch'} }, display: 'flex', flexDirection: 'column',alignItems:'center',justifyContent:'center'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic-name" label="Name" variant="outlined" onChange={(e) => setName(e.target.value)} required />
                    <TextField id="outlined-basic-password"type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} required />
                    {error && <span className='error' style={{textAlign:'center'}}>*{error}</span>}
                    <Button variant="contained" onClick={submit}>Submit</Button>
                    <p className='authentication-component-redirect'>Don't Have An Account? <Link to="/register">SignIn</Link></p>
                </Box>
            </div>
        </div>
    )
}
export default LoginPage