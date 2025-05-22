import React from 'react';
import { Grid, Typography, Container, List, ListItem, ListItemText, Divider } from "@mui/material";

const Dicas = () => {

    const isMobile = window.innerWidth < 900;

    return (
        <div style={{ flexGrow: 1 }}>
            <Container style={{ maxWidth: '95vw', maxHeight: '95vh' }}>
            <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
            <Grid item xs={12}>
            <Typography style={{ color:'#206955', display: 'flex', textAlign: 'center', justifyContent: 'center', marginBottom: '25px' }} fontFamily="Simonetta" variant="h6">
            Aqui você vai encontrar opções de hoteis e serviços para ajudar no dia do casamento.
                 <br/>
                 Qualquer dúvida, fiquem à vontade para contactar os noivos🩵
                 </Typography>
            </Grid>
                <Grid item xs={12}>
                    <Typography style={{ color:'#206955', marginLeft: '5%' }} fontFamily="Simonetta" variant={isMobile ? "h4" : "h3"}>Onde Ficar</Typography>
                </Grid>
                <Grid xs={12} sx={{ marginTop: '20px', marginLeft: '5%' }}>

                 
                    <Typography fontFamily="Simonetta" variant="h6" style={{ paddingLeft: '16px' }}>Em Recife - Boa Viagem (mais ou menos 30 minutos de distância para o Pier 31)</Typography>
                    <List>
                        <ListItem>
                            <ListItemText 
                                primary="Hotel Transamerica Prestige"
                                secondary="Endereço: Av. Boa Viagem, 420" />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Hotel Atlante Plaza"
                                secondary="Endereço: Av. Boa Viagem, 5426" />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Hotel Marante Plaza"
                                secondary="Endereço: Av. Boa Viagem, 1070" />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Park Hotel"
                                secondary="Endereço: Rua dos Navegantes, 09" />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Hotel Bugan Recife by Atlantica"
                                secondary="Endereço: Av. Eng. Domingos Ferreira, 4661" />
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Hotel Radisson Recife"
                                secondary="Endereço: Av. Boa Viagem, 1906" />
                        </ListItem>
                    </List>
                    <Divider />
                    <Typography fontFamily="Simonetta" variant="h6" style={{ paddingLeft: '16px', marginTop: '20px' }}>Próximo ao local do casamento</Typography>
                    <List>
                        <ListItem>
                            <ListItemText 
                                primary="Paiva Home Stay"
                                secondary="Av. Bernardo Vieira de Melo, 8472 - Barra de Jangada" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
                <Grid item xs={12}>
                    <Typography style={{ color:'#206955', marginLeft: '5%' }} fontFamily="Simonetta" variant={isMobile ? "h4" : "h3"}>Serviços: Maquiagem e penteado</Typography>
                </Grid>
                <Grid xs={12} sx={{ marginTop: '20px', marginLeft: '5%' }}>
                    <List>
                        <ListItem>
                            <ListItemText 
                                primary="Clara Vida Beauty Spa"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                    >
                                        Instagram: @claravidabeautyspa<br/>
                                        Endereço: Av Conselheiro Aguiar, 2998 
                                    </Typography>
                                    
                                    </React.Fragment>
                                }
                                
                            >
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Rapha Gomez"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                    >
                                        Instagram: @raphag_makeup<br/>
                                        Endereço: Av. Boa Viagem, 1906
                                    </Typography>
                                    
                                    </React.Fragment>
                                }
                                
                            >
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Pedro Henrique Soares"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                    >
                                        Instagram: @bypedrohsoares
                                    </Typography>
                                    
                                    </React.Fragment>
                                }
                                
                            >
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Bessie Beauty Club"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                    >
                                        Instagram: @bessie.boaviagem<br/>
                                        Endereços: <br/>
                                        <ul>
                                            <li>Setúbal: Rua João Eugênio de Lima, 241</li>
                                            <li>Boa Viagem: Av. Conselheiro Aguiar, 1202</li>
                                            <li>Casa Forte: Rua César Loureiro, 70</li>
                                            <li>Shopping Recife</li>
                                            <li>Shopping Rio Mar</li>
                                        </ul>
                                    </Typography>
                                    
                                    </React.Fragment>
                                }
                                
                            >
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText 
                                primary="Beauty Bar (Beauty Hub)"
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                    >
                                        Instagram: @beautyhub.br<br/>
                                        Endereços: <br/>
                                        <ul>
                                            <li>Setúbal: Av. Sá e Souza, 1300</li>
                                            <li>Boa Viagem: Av. Domingos Ferreira, 99</li>
                                            <li>Casa Forte: Rua Amaraji, 51</li>
                                            <li>Jaqueira: Av. Rui Barbosa, 1455</li>
                                        </ul>
                                    </Typography>
                                    
                                    </React.Fragment>
                                }
                                
                            >
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            </Container>
        </div>
    )
}

export default Dicas