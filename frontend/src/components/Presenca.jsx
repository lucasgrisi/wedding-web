import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, FormControl, TextField, Paper, Checkbox, FormControlLabel, Input, InputLabel, Button, CircularProgress, Alert, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';
import InputMask from 'react-input-mask';
import { produce } from "immer";
import backend from './backend';

const Presenca = () => {

    const [presencaCache, setPresencaCache] = useState(getPresencaCache);
    const [isLoading, setIsLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [hasChange, setHasChange] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [confirmedMsg, setConfirmedMsg] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [unexpectedErr, setUnexpectedErr] = useState('');
    const isMobile = window.innerWidth < 900;
    const navigate = useNavigate();

    function handleOnChange(field, value) {
        if (field == 'nAdults') {
            value = parseInt(value);
            if (value && value > 2) {
                value = 2;
            } else if(value && value < 0) {
                value = 1;
            }
        }
        setPresencaCache(
            produce((draft) => {
                draft[field] = value
            })
        );
        setHasChange(!hasChange);
    }

    function handleBack() {

    }

    function handleGiftClick() {
        navigate('/presentes');
    }

    function getPresencaCache() {
        let pCache = JSON.parse(localStorage.getItem('PresencaCache'));
        if (!pCache) {
            return {};
        }
        return pCache;
    }
    
    async function handleYesEdit() {
        setEditLoading(true);
        setHasChange(!hasChange);
        try {
            let res = await backend.post('/editpresenca', presencaCache);
            let success = res.data.success;
            if (success) {
                setConfirmed(true);
                setConfirmedMsg('Sua presença foi atualizada com sucesso 😄');
                setErrorMsg('');
            } else {
                let info = res.data.info;
                setErrorMsg(info);
            }
        } catch (error) {
            console.error(error);
            setUnexpectedErr('Ocorreu um erro inesperado. Por favor tente novamente.')
        }
        setEditLoading(false);
        setHasChange(!hasChange);

    }

    async function callConfirm() {
        let errMsg = '';
        let err = false;
        if(!presencaCache.name) {
            errMsg += 'Por favor insira o seu nome.';
            err = true;
        }
        if(!presencaCache.nAdults) {
            errMsg += 'Por favor insira o numero de adultos. ';
            err = true;
        }
        if(err) {
            setUnexpectedErr(errMsg);
            return;
        }
        setIsLoading(true);
        setHasChange(!hasChange);
        try {
            let res = await backend.post('/presenca', presencaCache);
            let success = res.data.success;
            if (success) {
                setConfirmed(true);
                setConfirmedMsg('Obrigado por confirmar a presença! 🥂');
            } else {
                let info = res.data.info;
                setErrorMsg(info);
            }
        } catch (error) {
            console.error(error);
            setUnexpectedErr('Ocorreu um erro inesperado. Por favor tente novamente.')
        }
        setIsLoading(false);
        setHasChange(!hasChange);
    }

    async function callEdit() {
        setIsLoading(true);
        setHasChange(!hasChange);
        try {
            let res = await backend.post('/editpresenca', presencaCache);
            let success = res.data.success;
            if (success) {
                setConfirmed(true);
                setConfirmedMsg('Sua presença foi atualizada com sucesso 😄')
            } else {
                let info = res.data.info;
                setErrorMsg(info);
            }
        } catch (error) {
            console.error(error);
            setUnexpectedErr('Ocorreu um erro inesperado. Por favor tente novamente.')
        }
        setIsLoading(false);
        setHasChange(!hasChange);
    }

    function renderButton() {
        if (isLoading) {
            return (
                <Button variant='contained' disabled style={{ width: '75%', margin: 'auto', marginTop: '20px'}}><CircularProgress style={{ width: '25px', height: '25px' }} color="success" /></Button>
            )
        } else if (editMode) {
            return (
                <Button variant='contained' style={{ width: '75%', margin: 'auto', marginTop: '20px', backgroundColor: '#206955' }} onClick={() => callEdit()}>Atualizar</Button>
            )
        } else {
            return (
                <Button variant='contained' style={{ width: '75%', margin: 'auto', marginTop: '20px', backgroundColor: '#206955' }} onClick={() => callConfirm()}>Confirmar</Button>
            )
        }
    }

    function renderTitle() {
        if (!confirmed) {
            return (
                <Grid item xs={12}>
                    <Typography style={{ display: 'flex', justifyContent: 'center', color:'#206955' }} fontFamily="Simonetta" variant={isMobile ? "h4" : "h3"}>Confirme Presença</Typography>
                </Grid>
            )
        }
    }

    function renderError() {
        if (errorMsg) {
            return (<Alert severity="info">{errorMsg}</Alert>);
        } else if(unexpectedErr) {
            return (<Alert severity="error">{unexpectedErr}</Alert>);;
        } else {
            return '';
        }
    }

    function renderForm() {
        if(confirmed) {
            return (
                <>
                <Grid xs={12} sx={{ marginTop: '20px' }}>
                    <Typography style={{ display: 'flex', justifyContent: 'center' }} fontFamily="Simonetta" variant="body1">
                        {confirmedMsg}
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant='contained' style={{ backgroundColor: '#206955', marginLeft: '10px' }} onClick={() => handleGiftClick()}>Opções de presentes</Button>
                </Grid>
                </>
            )
        } else if (errorMsg && !editLoading) {
            return (
                <>
                <Grid xs={12} sx={{ marginTop: '20px' }}>
                    <Typography style={{ display: 'flex', justifyContent: 'center' }} fontFamily="Simonetta" variant="body1">
                        Deseja atualizar a sua presença?<br/>
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Button variant='outlined' style={{ color: '#206955', borderColor: '#206955', marginRight: '10px' }} onClick={() => handleBack()}>Voltar</Button>
                    <Button variant='contained' style={{ backgroundColor: '#206955', marginLeft: '10px' }} onClick={() => handleYesEdit()}>Sim</Button>
                </Grid>
                </>
            )
        } else if(editLoading) {
            return (
                <Grid xs={12} sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color="success" />
                </Grid>
            )
        } else {
            return (
                <>
                <Grid xs={12} sx={{ marginTop: '20px' }}>
                    <Typography style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }} fontFamily="Simonetta" variant="body1">
                        Sua presença é muito importante para nós!<br/>
                        Favor confirmá-la no formulário abaixo:
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ marginTop: '20px', marginBottom: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} style={{ maxWidth: '75vw', minWidth: '50vw', padding: '15px' }}>
                        <FormControl style={{ width: '100%' }} >
                            <TextField fullWidth required id="name-input" label="Nome Completo" variant="outlined" value={presencaCache.name} onChange={(evt) => handleOnChange('name', evt.target.value)} />
                            <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
                                {/* <TextField id="adults-input" type='number' fullWidth required label="Quantos adultos? Incluindo você" style={{ marginRight:'5px' }} value={presencaCache.nAdults} onChange={(evt) => handleOnChange('nAdults', evt.target.value)} /> */}
                                <FormControl fullWidth>
                                    <InputLabel id="adults-input">Quantos adultos? Incluindo você</InputLabel>
                                    <Select
                                        labelId="adults-input-label"
                                        id="adults-select"
                                        value={presencaCache.nAdults}
                                        label="Numero de adultos"
                                        onChange={(evt) => handleOnChange('nAdults', evt.target.value)}
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <TextField fullWidth required id="email-input" label="Email" variant="outlined" style={{ marginTop: '10px' }} helperText="Você poderá receber informações adicionais nesse e-mail" value={presencaCache.email} onChange={(evt) => handleOnChange('email', evt.target.value)} />
                            
                            <InputMask
                                mask="(99) 99999-9999"
                                // value={this.state.phone}
                                // disabled={false}
                                value={presencaCache.phone} 
                                onChange={(evt) => handleOnChange('phone', evt.target.value)}
                                maskChar=" "
                                >
                            {() => <TextField fullWidth id="phone-input" label="Telefone para contato" variant="outlined" style={{ marginTop: '10px' }} placeholder='(81) 99999-9999' />}
                            </InputMask>
                            <TextField fullWidth id="phone-input" label="Deixe um recado para os noivos🩵" variant="outlined" style={{ marginTop: '10px' }} value={presencaCache.obs} onChange={(evt) => handleOnChange('obs', evt.target.value)} />
                            {renderButton()}
                        </FormControl>
                    </Paper>
                </Grid>
                </>
            )
        }
    }

    useEffect(() => {
        localStorage.setItem('PresencaCache', JSON.stringify(presencaCache));
    }, [hasChange])

    return (
        <div style={{ flexGrow: 1 }}>
            <Container style={{ maxWidth: '95vw', maxHeight: '95vh' }}>
            <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
                {renderTitle()}
            </Grid>
            <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
                <Grid xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={Logo} alt="Bruna & Lucas" style={{ maxWidth: '150px', minWidth: '50px' }} />
                </Grid>
                {renderError()}
                {renderForm()}
                
            </Grid>
            </Container>
        </div>
    )
}

export default Presenca;