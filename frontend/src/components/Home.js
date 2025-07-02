import React from 'react';
import { useEffect, useState } from 'react';
import { Container } from "@mui/system";
import { Grid, Typography, Box } from "@mui/material";
import CountdownTimer from './CountdownTimer';
import './Home.css';
import '../App.css';
import Settings from '../settings';
import Planta1 from '../assets/planta1.png';


const Home = () => {
    const isMobile = window.innerWidth < 900;

    function renderBg() {
        if (isMobile) {
            return (
                <>
                <Grid container sx={{ position: 'relative' }}>
                    <Box
                    component="img"
                    src={Planta1}
                    alt="Planta1"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '100px', // adjust as needed
                    height: 'auto',
                    pointerEvents: 'none' // makes sure it doesn't interfere with interaction
                    }}
                />
                <Box
                    component="img"
                    src={Planta1}
                    alt="Planta1"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 0,
                    width: '100px', // adjust as needed
                    height: 'auto',
                    transform: 'scaleX(-1)',
                    pointerEvents: 'none' // makes sure it doesn't interfere with interaction
                    }}
                />
                </Grid>
                </>
            )
        }
    }

    function renderTitle() {
        if (isMobile) {
            return (
                <>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography className='green-color' variant="h5" fontFamily="Amsterdam" sx={{ marginTop: '65px' }}>{Settings.coupleName}</Typography>
                </Grid>
                </>
            )
        }
        return (
            <>
            <Grid container sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src={Planta1}
                    alt="Planta1"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '400px', // adjust as needed
                    height: 'auto',
                    pointerEvents: 'none' // makes sure it doesn't interfere with interaction
                    }}
                />

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, mt: 4 }}>
                    <Typography className='green-color' variant="h3" fontFamily="Amsterdam" sx={{ marginTop: '65px' }}>
                    {Settings.coupleName}
                    </Typography>
                </Grid>
                <Box
                    component="img"
                    src={Planta1}
                    alt="Planta1"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 0,
                    width: '400px', // adjust as needed
                    height: 'auto',
                    transform: 'scaleX(-1)',
                    pointerEvents: 'none' // makes sure it doesn't interfere with interaction
                    }}
                />
            </Grid>
            </>
        )
    }

    return (
        <>
    <div style={{ flexGrow: 1 }} className='container'>
        <Container className='overlay' style={{ margin:0, maxWidth: '100vw' }}>
            {renderBg()}
        <Grid container spacing={1.5}direction="row" justifyContent="center" alignItems="center" style={{ padding: '40px' }}>
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
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ padding: '20px', position: 'relative'}}>
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