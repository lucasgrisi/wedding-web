import React from 'react';
import { useEffect, useState } from 'react';
import { Container, spacing } from "@mui/system";
import { Grid, Typography, Pagination, Card, CardContent, CardMedia, Button, Divider, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { produce } from "immer";
import { useDispatch } from 'react-redux';
import { itemAdded, itemRemoved } from '../redux/reducers/cartReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import backend from './backend';
import '../App.css';

const Presentes = () => {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [page, setPage] = useState(1);
    const [cartInfo, setCartInfo] = useState(JSON.parse(localStorage.getItem('CartCache')) || []);
    const [hasChange, setHasChange] = useState(false);
    const [listOrder, setListOrder] = useState("relevance");
    const [lista, setLista] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openCart, setOpenCart] = useState(false);
    const cardsPerPage = 9; 
    const totalCards = lista.length;
    const isMobile = window.innerWidth < 900;

    const totalPages = Math.ceil(totalCards / cardsPerPage);

    function scrollToTop() {
        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (currentScroll > 0) {
            window.scrollBy(0, -20);
            setTimeout(scrollToTop, 10);
        }
    }

    function handleRemoveFromCart(id) {
        let amount = 0;
        setCartInfo(
            produce(draft => {
                let i = draft.findIndex(elem => elem.id == id);
                if (i !== -1) {
                    amount = draft[i].buyQtd;
                }
                return draft.filter(item => item.id !== id)
            })
        )
        for (let index = 0; index < amount; index++) {
            dispatch(itemRemoved());
        }
        setHasChange(!hasChange);
      }

    function handleAddItemQtd(itemId) {
        setCartInfo(
            produce((draft) => {
                let i = draft.findIndex(elem => elem.id == itemId);
                if (i !== -1) {
                    if(draft[i].buyQtd >= draft[i].quantity) {
                        draft[i].buyQtd = draft[i].quantity
                    } else {
                        draft[i].buyQtd += 1;
                        dispatch(itemAdded());
                    }
                }
            })
        )
        setHasChange(!hasChange);
    }

    function handleRmItemQtd(itemId) {
        setCartInfo(
            produce((draft) => {
                let i = draft.findIndex(elem => elem.id == itemId);
                if (i !== -1) {
                    if(draft[i].buyQtd <= 1) {
                        draft[i].buyQtd = 1
                    } else {
                        draft[i].buyQtd -= 1;
                        dispatch(itemRemoved());
                    }
                }
            })
        )
        
        setHasChange(!hasChange);
    }

    const openCartDialog = () => {
        setOpenCart(true);
        setHasChange(!hasChange);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        scrollToTop();
    };

    function orderPresentes() {
        if (listOrder === "price-desc") {
            const sortedList = [...lista].sort((a, b) => {
                return b.price - a.price;
            });
            setLista(sortedList);
        } else if (listOrder === "price-asc") {
            const sortedList = [...lista].sort((a, b) => {
                return a.price - b.price;
            });
            setLista(sortedList);
        } else if (listOrder === "relevance") {
            const sortedList = [...lista].sort((a, b) => { return a.relevance - b.relevance});
            setLista(sortedList);
        }
    }

    function handleListOrderChange(event) {
        setListOrder(event.target.value);
        setHasChange(!hasChange);
    }

    async function getPresentes() {
        let items = [];
        try {
            let res = await backend.get('/items');
            items = res.data;
            setLista(items);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
        setHasChange(!hasChange);
        return items;
    }

    const getCardsForPage = () => {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        return lista.slice(startIndex, endIndex);
    };

    const getItem = (id) => {
        for (let i=0; i<lista.length; i++) {
            if(lista[i].id === id) {
                return lista[i];
            }
        }
        return null;
    }

    function handleAddToCart(id) {
        let item = getItem(id);
        setCartInfo(
            produce(draft => {
                draft.push({...item, buyQtd: 1});
            })
        )
        dispatch(itemAdded());
        openCartDialog();
        setHasChange(!hasChange);
      }
    

    const renderCards = () => {
        const cards = getCardsForPage();
        return cards.map((card, index) => (
            <Grid item xs={isMobile ? 12 : 4} key={card.id}>
                <Card sx={{ maxWidth: 400 }} style={{ margin: 'auto' }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: 200,
                        width: '100%',
                        objectFit: 'contain', // or 'scale-down' to prevent upscaling
                    }}
                    image={card.img}
                    alt={card.title}
                />
                <CardContent>
                    <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} sx={{ height: 100 }}>
                        <Typography fontFamily="Simonetta">
                        {card.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontFamily="Simonetta">
                        R$ {card.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" style={{ float: 'right' }} fontFamily="Simonetta">
                        {card.sold}/{card.quantity}
                        </Typography>
                    </Grid>
                    {
                        card.available ? (
                            (cartInfo.filter(item => item.id === card.id).length > 0) ? (
                            <>
                                <Grid item xs={3}>
                                    <Button style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta", color: '#206955', borderColor: '#206955' }} onClick={() => handleRmItemQtd(card.id)} variant='outlined'>-</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta", color: '#206955', textAlign: 'center' }}>{cartInfo.filter(item => item.id === card.id)[0].buyQtd}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta", color: '#206955', borderColor: '#206955' }} onClick={() => handleAddItemQtd(card.id)} variant='outlined'>+</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta", color: '#A40000', borderColor: '#A40000' }} onClick={() => handleRemoveFromCart(card.id)} variant='outlined'><DeleteIcon style={{ color: '#A40000' }}/></Button>
                                </Grid>
                                <Grid item xs={9}>
                                    <Button style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta", backgroundColor: '#206955' }} onClick={() => navigator('/checkout')} variant='contained'>Ir para o carrinho</Button>
                                </Grid>
                            </>
                            ) : (
                            <Grid item xs={12}>
                                <Button style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta", color: '#206955', borderColor: '#206955' }} onClick={() => handleAddToCart(card.id)} variant='outlined'>Presentear</Button>
                            </Grid>
                            )
                        ) : (
                            <Grid item xs={12}>
                                <Button style={{ margin: 'auto', width: '100%', fontFamily: "Simonetta" }} disabled variant='contained' fontFamily="Simonetta">Esgotado</Button>
                            </Grid>
                        )
                    }
                    
                    {/* <Grid item xs={12}>
                        <Button style={{ margin: 'auto' }} onClick={handleBuyNow} variant='contained'>Comprar agora</Button>
                    </Grid> */}
                    </Grid>
                    
                </CardContent>
                </Card>
            </Grid>
        ));
    };
    
    useEffect(() => {
        localStorage.setItem('CartCache', JSON.stringify(cartInfo));
        orderPresentes();
        if(isLoading) {
            let items = getPresentes();
            setLista(items);
        }
    }, [hasChange]);

    return (
    <div style={{ flexGrow: 1 }}>
        <Container style={{ maxWidth: isMobile ? '90vw' : '75vw', maxHeight: '95vh', alignItems: 'center'}}>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Typography style={{ display: 'flex', justifyContent: 'center', color: '#206955' }} fontFamily="Simonetta" variant="h3">Presentes</Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            { isMobile ? (
                <Grid item xs={12} sx={{ alignItems: 'center' }}>
                        {/* <Typography>Ordenar por:</Typography> */}
                        <FormControl sx={{ m: 1, minWidth: 120, float: 'center' }} size="small">
                            <InputLabel id="demo-select-small-label">Ordem</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={listOrder}
                                label="Ordem"
                                onChange={handleListOrderChange}
                            >
                                <MenuItem value="relevance">Relevância</MenuItem>
                                <MenuItem value="price-desc">Maior Preco</MenuItem>
                                <MenuItem value="price-asc">Menor Preco</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
            ) : (
                <>
                <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} sx={{ alignItems: 'right' }}>
                        {/* <Typography>Ordenar por:</Typography> */}
                        <FormControl sx={{ m: 1, minWidth: 120, float: 'right' }} size="small">
                            <InputLabel id="demo-select-small-label">Ordem</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={listOrder}
                                label="Ordem"
                                onChange={handleListOrderChange}
                            >
                                <MenuItem value="relevance">Relevância</MenuItem>
                                <MenuItem value="price-desc">Maior Preco</MenuItem>
                                <MenuItem value="price-asc">Menor Preco</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            ) }
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
        <Grid container spacing={2} direction="row" justifyContent="space-around" alignItems="center">
            {
                isLoading ? (
                    <Box sx={{ display: 'flex', marginTop: '15%' }}>
                        <CircularProgress color="success" />
                    </Box>
                ) : (renderCards())
            }
        </Grid>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ margin: '20px' }}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
            />
        </Grid>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center" style={{ margin: '10px' }} />
        </Grid>
        </Container>
    </div>
    );
};

export default Presentes;