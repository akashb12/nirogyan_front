import { TextField } from '@mui/material'
import React from 'react'

const Fields = ({name,label,type,value,max,onFieldsChange}) => {
    return (
        <>
            <TextField
                className='create-report-form-field'
                autoFocus
                required
                margin="dense"
                id={name}
                name={name}
                label={label}
                type={type}
                fullWidth
                variant="standard"
                value={value}
                onChange={(e) => onFieldsChange(e)}
                inputProps={{ maxLength: max }}
            />
        </>
    )
}

export default Fields
