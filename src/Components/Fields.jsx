import { TextField } from '@mui/material'
import React from 'react'

const Fields = ({name,label,value,onFieldsChange}) => {
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
                type="text"
                fullWidth
                variant="standard"
                value={value}
                onChange={(e) => onFieldsChange(e)}
            />
        </>
    )
}

export default Fields
