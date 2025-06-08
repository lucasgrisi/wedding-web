import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import CountdownTimer from './CountdownTimer';
import './Home.css';
import '../App.css';
import Settings from '../settings';

const Home = () => {
    const isMobile = window.innerWidth < 900;

    return (
        <>
    <div style={{ flexGrow: 1 }} className='container'>
        <Container className='background-blur' style={{ margin:0, maxWidth: '100vw' }}>
        <Grid container spacing={1.5}direction="row" justifyContent="center" alignItems="center" style={{ padding: '50px' }}>
            {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={usImg} style={{ maxHeight: '500px' }}/>
            </Grid> */}
            {/*<Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h2" fontFamily="Dancing Script">Bruna & Lucas</Typography>
            </Grid> */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography className='green-color' variant={isMobile ? "h4" : "h2"} fontFamily="Amsterdam">{Settings.coupleName}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant={isMobile ? "h6" : "h5"} fontFamily="Simonetta">24.01.2026</Typography>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: '20px' }}>
                <CountdownTimer targetDate={Settings.weddingDate} />
            </Grid>
        </Grid>
        </Container>

        {/* <Container className='background-blur' style={{ maxWidth: '100vw', maxHeight: '100vh' }}>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
            
        </Grid>
        </Container> */}
        <Container style={{ maxWidth: '100vw', maxHeight: '100vh', margin:0 }} className='overlay'>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ padding: '20px'}}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                <Typography variant='body1' fontFamily="Simonetta">
                Criamos esse site para compartilhar com vocês os detalhes da organização do nosso casamento. 
                <br/><br/>
                Estamos muito felizes e contamos com a presença de todos no nosso grande dia!
                <br/><br/>
                Já estamos ansiosos para encontrá-los e precisamos que confirmem suas presenças. 
                <br/><br/>
                Para isso, clique no "RSVP" (Confirme sua Presença) e preencha os dados necessários.
                <br/><br/>
                Aguardamos vocês! 🤍
                </Typography>
            </Grid>
            {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <GirassolIcon style={{ width: '30px' }} />
                <GirassolIcon style={{ width: '30px' }} />
                <GirassolIcon style={{ width: '30px' }} />
            </Grid> */}
        </Grid>
        </Container>
    </div>
    <div class="bg-2"></div>
    </>
    );
};

export default Home;