"use client";

import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Container, spacing } from "@mui/system";
import { Grid, Typography, Divider, Box } from "@mui/material";
import ResponsiveAppBar from './AppBar';
import PierImg from '../assets/pier31.png';
import Arvore from '../assets/Bruna & Lucas arvore.png';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import './Evento.css'
import Planta7 from '../assets/planta7.png';
import Planta2 from '../assets/planta2.png';

const Evento = () => {
    const position = {lat: -7.9482409, lng: -35.0209291};

    return (
    <div style={{ flexGrow: 1 }}>
        <Container style={{ maxWidth: '95vw', maxHeight: '95vh' }}>

        <Grid container sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src={Planta2}
                    alt="Planta2"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '400px', // adjust as needed
                    height: 'auto',
                    transform: 'scaleX(-1)',
                    pointerEvents: 'none' // makes sure it doesn't interfere with interaction
                    }}
                />

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, mt: 4 }}>
                    <Typography style={{ display: 'flex', justifyContent: 'center', color: '#62724E' }} fontFamily="Simonetta" variant="h3">Cerimônia</Typography>
                </Grid>
                <Box
                    component="img"
                    src={Planta2}
                    alt="Planta2"
                    sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 0,
                    width: '400px', // adjust as needed
                    height: 'auto',
                    pointerEvents: 'none' // makes sure it doesn't interfere with interaction
                    }}
                />
            </Grid>
        {/* <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Typography style={{ display: 'flex', justifyContent: 'center', color: '#62724E' }} fontFamily="Simonetta" variant="h3">Cerimônia</Typography>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid> */}
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px', padding: '30px', paddingBottom: '0' }}>
        {/* <Grid item xs={5}>
            <img src={PierImg} alt="Pier 31" style={{ maxHeight: '400px' }} />
        </Grid> */}
        <Grid item xs={12}>
            {/* <Typography variant="h4" fontFamily="Simonetta">Pier 31</Typography> */}
            <Typography variant="body1" fontFamily="Simonetta" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                A cerimônia e recepção vão ser no mesmo local, no Espaço Bosque das Palmeiras
                <br/>
                <br/>
                Começará pontualmente às 15:00 h.
                <br/>
                <br/>
                Por favor, cheguem cedo para aproveitarmos juntos todas as etapas do casamento❣️
                <br/>
                <br/>
                Abaixo deixamos um mapa para facilitar o acesso.
                <br/>                 <br/> 
                <br/> 
                <br/> 



            </Typography>
        </Grid>
        {/* <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ margin: '10px', maxWidth: "850px", minWidth:"100px" }} src={Arvore}  />
        </Grid> */}
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: 0, padding:0}}>
  <Box
    component="img"
    src={Planta7}
    alt="Decorative Divider"
    sx={{
      maxWidth: '250px',
      width: '100%',
      height: 'auto'
    }}
  />
</Grid>
        <Grid container spacing={1.5} direction="row" justifyContent="center" style={{ marginTop: '30px', padding: '30px' }}>
            <Grid item xs={12}>
                <Typography style={{ display: 'flex', justifyContent: 'center', color: '#62724E' }} variant="h4" fontFamily="Simonetta">Como Chegar</Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" fontFamily="Simonetta">
                Espaço Bosque das Palmeiras
                <br/> 

                <br/> Rua tobias barreto, 100 - Aldeia, Km 12
                <br/>
                Aldeia - PE
                <br/>
                CEP: 54783-480
                <br/> <br/> 

                </Typography>
                {/* <Divider  style={{ marginTop: '20px', marginBottom: '20px' }}/> */}
                <Typography variant="body1" fontFamily="Simonetta">
                    Abra com <a href="http://maps.google.com/?q=R. Tobias Barreto - Aldeia dos Camarás, Camaragibe - PE, 54783-480">Maps</a>.
                </Typography>
                <Typography variant="body1" fontFamily="Simonetta">
                    Abra com <a href="https://waze.com/ul?ll=-7.9482409,-35.0209291&z=17&navigate=yes">Waze</a>.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                    <div style={{ height: '400px', width: '100%' }}>
                    <Map defaultCenter={position} defaultZoom={17} mapId={'8c0d1b1f23866063'}>
                        <AdvancedMarker position={position}>
                            <Pin />
                        </AdvancedMarker>
                    </Map>
                    </div>
                </APIProvider>
            </Grid>
        </Grid>
        </Container>
    </div>
    );
};

export default Evento;