"use client";

import React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { Container, spacing } from "@mui/system";
import { Grid, Typography, Divider } from "@mui/material";
import ResponsiveAppBar from './AppBar';
import PierImg from '../assets/pier31.png';
import Arvore from '../assets/Bruna & Lucas arvore.png';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import './Evento.css'

const Evento = () => {
    const position = {lat: -8.2406474, lng:-34.9404719};

    return (
    <div style={{ flexGrow: 1 }}>
        <Container style={{ maxWidth: '95vw', maxHeight: '95vh' }}>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Typography style={{ display: 'flex', justifyContent: 'center', color: '#206955' }} fontFamily="Simonetta" variant="h3">Cerimônia</Typography>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px', padding: '30px' }}>
        {/* <Grid item xs={5}>
            <img src={PierImg} alt="Pier 31" style={{ maxHeight: '400px' }} />
        </Grid> */}
        <Grid item xs={12}>
            {/* <Typography variant="h4" fontFamily="Simonetta">Pier 31</Typography> */}
            <Typography variant="body1" fontFamily="Simonetta" style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                {/* O evento sera realizado no <b>Pier 31</b>, com a seguinte programacao:
                <ul>
                    <li>16:00 - Cerimonia</li>
                    <li>18:30 - Banda Gin n Tonic</li>
                    <li>21:00 - Banda Faringes da Paixao</li>
                    <li>23:30 - Banda D'Breck</li>
                    <li>1:00  - Final da festa</li>
                </ul> */}
                A cerimônia e recepção vão ser no mesmo local, no XXXX (Local)
                <br/>
                <br/>
                Começará pontualmente às XXX *horário
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
        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ margin: '10px', maxWidth: "850px", minWidth:"100px" }} src={Arvore}  />
        </Grid>
        </Grid>
        <Grid container spacing={1.5} direction="row" justifyContent="center" style={{ marginTop: '30px', padding: '30px' }}>
            <Grid item xs={12}>
                <Typography style={{ display: 'flex', justifyContent: 'center', color: '#206955' }} variant="h4" fontFamily="Simonetta">Como Chegar</Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" fontFamily="Simonetta">
               Espaço para eventos: XXX
                <br/> 
                Endereço:
                <br/> Rua XXXXX
                <br/>
                Aldeia - PE, 
                <br/>
                CEP: XXXX
                </Typography>
                {/* <Divider  style={{ marginTop: '20px', marginBottom: '20px' }}/> */}
                <Typography variant="body1" fontFamily="Simonetta">
                    Abra com <a href="http://maps.google.com/?q=R. Três, 31 - Barra de Jangada, Jaboatão dos Guararapes - PE, 54490-282">Maps</a>.
                </Typography>
                <Typography variant="body1" fontFamily="Simonetta">
                    Abra com <a href="https://waze.com/ul?ll=-8.2406421,-34.9430468&z=17&navigate=yes">Waze</a>.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                    <div style={{ height: '400px', width: '100%' }}>
                    <Map defaultCenter={position} defaultZoom={15} mapId={'8c0d1b1f23866063'}>
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