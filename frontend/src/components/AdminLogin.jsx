import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from "@mui/system";
import { Grid, Typography, TextField, Button, Paper, FormControl } from "@mui/material";
import { produce } from "immer";
import backend from './backend';


const AdminLogin = () => {

    const [adminCache, setAdminCache] = useState(JSON.parse(localStorage.getItem('AdminCache') || ""));
    const [hasChange, setHasChange] = useState(false);


    function handleOnChange(field, value) {
        setAdminCache(
            produce((draft) => {
                draft[field] = value
            })
        );
        setHasChange(!hasChange);
    }

    function login() {
        console.log(adminCache)
    }

    useEffect(() => {
        localStorage.setItem('AdminCache', JSON.stringify(adminCache));
    }, [hasChange])

    return (
        <>
        <Grid xs={12} sx={{ marginTop: '20px', marginBottom: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} style={{ maxWidth: '50vw', minWidth: '35vw', padding: '15px', marginTop: '30px' }}>
                <FormControl style={{ width: '100%' }} >
                    <TextField fullWidth required id="username-input" label="Username" variant="outlined" value={adminCache.username} onChange={(evt) => handleOnChange('username', evt.target.value)} />
                    <TextField fullWidth required style={{ marginTop: '10px' }} id="password-input" type='password' label="Password" variant="outlined" value={adminCache.password} onChange={(evt) => handleOnChange('password', evt.target.value)} />
                    <Button variant='contained' style={{ width: '75%', margin: 'auto', marginTop: '20px', backgroundColor: '#206955' }} onClick={() => login()}>Entrar</Button>
                </FormControl>
            </Paper>
        </Grid>
        </>
    )
}

export default AdminLogin;