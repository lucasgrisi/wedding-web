import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Typography, Container, List, ListItem, ListItemText, Divider } from "@mui/material";
import { clearItems } from '../redux/reducers/cartReducer';
import { useDispatch } from 'react-redux';

const Gratidao = () => {
    const dispatch = useDispatch();
    const [cartInfo, setCartInfo] = useState(JSON.parse(localStorage.getItem('CartCache')));

    useEffect(() => {
        dispatch(clearItems());
        localStorage.setItem('CartCache', JSON.stringify([]))
    }, [])
    return (
        <div style={{ flexGrow: 1 }}>
            <Container style={{ maxWidth: '95vw', maxHeight: '95vh' }}>
                <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center">
                    <Grid xs={12} sx={{ marginTop: '10%', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        Recebemos o seu presente, muito obrigado!! 💚
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Gratidao;