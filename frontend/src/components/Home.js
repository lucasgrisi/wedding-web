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

    function renderTitle() {
        if (isMobile) {
            return (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography className='green-color' variant="h5" fontFamily="Amsterdam">{Settings.coupleName}</Typography>
                </Grid>
            )
        }
        return (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography className='green-color' variant="h2" fontFamily="Amsterdam">{Settings.coupleName}</Typography>
            </Grid>
        )
    }

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
            {renderTitle()}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant={isMobile ? "h7" : "h5"} fontFamily="Simonetta">24.01.2026</Typography>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: '20px' }}>
                <CountdownTimer targetDate={Settings.weddingDate} isMobile={isMobile} />
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
                Depois de tantas histórias, desafios e alegrias juntos, chegou a hora de celebrarmos nosso amor e 
                união ao lado das pessoas que mais amamos, nossos queridos amigos e familiares.
                <br/><br/>
                Criamos este espaço especial para compartilhar todos os detalhes do nosso casamento. 
                Aproveitem para confirmar a presença clicando em "RSVP" e para conhecer nossa lista de presentes.
                <br/><br/>
                Estamos ansiosos para dividir essa felicidade com cada um de vocês. Obrigado por fazerem parte da nossa história! 
                <br/><br/>
                Com carinho,
                <br/>
                Maria Letícia & Diogo 
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