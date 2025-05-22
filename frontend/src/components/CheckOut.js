import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, spacing } from "@mui/system";
import { Grid, Paper, Typography, Divider, Button, TextField, FormControl, InputLabel, ListItem, ListItemText } from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CircularProgress from '@mui/material/CircularProgress';
import CartItem from './CartItem';
import List from '@mui/material/List';
import { produce } from "immer";
import { useDispatch } from 'react-redux';
import { itemAdded, itemRemoved, setQtdItems } from '../redux/reducers/cartReducer';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import backend from './backend';


export default function CheckOut() {

    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cartInfo, setCartInfo] = useState(JSON.parse(localStorage.getItem('CartCache')));
    const [activeStep, setActiveStep] = useState(0);
    const [hasChange, setHasChange] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('UserInfoCache')));
    const [nameErr, setNameErr] = useState(false);
    const [walletPrefId, setWalletPrefId] = useState("");
    const [totalPrice, setTotalPrice] = useState(getTotalPrice);
    const [gotPrefId, setGotPrefId] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [externalRefId, setExternalRefId] = useState(null);
    const steps = [
        'Resumo',
        'Deixe uma mensagem',
        'Pagamento',
    ];

    function getTotalPrice() {
        let total = 0;
        cartInfo.forEach(item => {
            let toAdd = item.price*item.buyQtd;
            total += toAdd;
        })
        return total;
    }

    function handleContinue() {
        if (activeStep === 1) {
            if (userInfo.name !== "") {
                setActiveStep(activeStep+1);
            } else {
                setNameErr(true);
            }
        } else {
            setActiveStep(activeStep+1);
        }
        setHasChange(!hasChange);
    }
    function handleBack() {
        setActiveStep(activeStep-1);
        setHasChange(!hasChange);
    }

    function handleNameChange(value) {
        setUserInfo(
            produce(draft => {
                draft.name = value
            })
        );
        if(value !== "") {
            setNameErr(false);
        }
        setHasChange(!hasChange);
    }
    function handleEmailChange(value) {
        setUserInfo(
            produce(draft => {
                draft.email = value
            })
        )
        setHasChange(!hasChange);
    }
    function handleMsgChange(value) {
        setUserInfo(
            produce(draft => {
                draft.message = value
            })
        )
        setHasChange(!hasChange);
    }
    function handleRemoveFromCart(id) {
        setCartInfo(
            produce(draft => {
                return draft.filter(item => item.id !== id)
            })
        )
        dispatch(itemRemoved());
        setHasChange(!hasChange);
      }

    function handleChangeItemQtd(itemId, qtd) {
        setCartInfo(
            produce((draft) => {
                let i = draft.findIndex(elem => elem.id == itemId);
                if (i !== -1) {
                    draft[i].buyQtd = qtd;
                }
            })
        )
        setHasChange(!hasChange);
    }

    function getPreferenceId() {
        let data = {
            items: []
        }
        cartInfo.forEach(item => {
            data.items.push({
                id: item.id,
                title: item.title,
                quantity: item.buyQtd,
                unit_price: item.price,
                picture_url: item.img,
                currecy_id: "BRL"
            })
        });

        backend.post('/preference', data)
            .then(res => {
                localStorage.setItem('PrefId', res.data.id);
                localStorage.setItem('ExternalRefId', res.data.external_ref_id);
                setGotPrefId(true)
            })
            .catch(err => {
                console.error(err);
            })
    }

    function saveMsgAndContinue() {
        setIsLoading(true);
        setHasChange(!hasChange);

        let externalRefId = localStorage.getItem('ExternalRefId');
        let preferenceId = localStorage.getItem('PrefId')
        let userInfo = JSON.parse(localStorage.getItem('UserInfoCache'));
        let data = {
            externalRefId: externalRefId,
            message: userInfo,
            preferenceId: preferenceId
        }
        backend.post('/buymsg', data)
            .then(res => {
                setIsLoading(false);
                setHasChange(!hasChange);
                handleContinue();
            })
            .catch(err => {
                console.error(err);
            });
            
    }

    useEffect(() => {
        initMercadoPago('APP_USR-95f8cf20-8f0c-4f11-9ea5-8027c2aa151a', {locale: 'pt-BR'});
        // console.log(cartInfo);
        localStorage.setItem('UserInfoCache', JSON.stringify(userInfo));
        localStorage.setItem('CartCache', JSON.stringify(cartInfo));
        if(activeStep === 1 && !gotPrefId) {
            getPreferenceId()
        }

        let cartSize = 0
        cartInfo.forEach(item => {
            cartSize += item.buyQtd
        })

        dispatch(setQtdItems(cartSize));
        setTotalPrice(getTotalPrice());

        let prefId = localStorage.getItem('PrefId');
        setWalletPrefId(prefId);
    }, [hasChange]);

    return (
    <div style={{ flexGrow: 1 }}>
        <Container style={{ maxWidth: '95vw', maxHeight: '95vh' }}>
        <Grid container spacing={1.5} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Box sx={{ width: '100%', marginTop: '25px' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Grid>
            
            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                    {(activeStep === 0) ? (
                        <>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {cartInfo.map((item, i) => {
                            return (
                                <>
                                <CartItem 
                                    title={item.title} 
                                    img={item.img} 
                                    price={item.price} 
                                    key={item.id} 
                                    buyQtd={item.buyQtd}
                                    totalQtd={item.quantity}
                                    onChangeQtd={(evt) => handleChangeItemQtd(item.id, evt.target.value)}
                                    handleOnClick={() => handleRemoveFromCart(item.id)} 
                                />
                                <Divider variant="inset" component="li" />
                                </>
                            )
                        })
                        }
                        <ListItem>
                            <ListItemText style={{ fontFamily: 'Simonetta' }}>
                                {`Total = R$ ${totalPrice},00`}
                            </ListItemText>
                        </ListItem>
                        </List>
                        {cartInfo.length > 0 ? (
                            <>
                            <Button variant='outlined' style={{ marginTop: '20px', marginRight: '5px', color: '#206955', borderColor: '#206955' }} onClick={() => navigate('/presentes')}>Continuar comprando</Button>
                            <Button variant='contained' style={{ marginTop: '20px', marginLeft: '5px', backgroundColor: '#206955' }} onClick={handleContinue}>Finalizar compra</Button>
                            </>
                        ) : (
                            <>
                            <Typography style={{ marginTop: '40px' }} color='grey'>Nenhum item no carrinho.</Typography>
                            <Button variant='outlined' style={{ marginTop: '20px', marginRight: '20px', color: '#206955', borderColor: '#206955' }} onClick={() => navigate('/presentes')}>Voltar</Button>
                            <Button variant='contained' style={{ marginTop: '20px' }} disabled>Continuar</Button>
                            </>
                        )}
                        </>
                    ) : activeStep === 1 ? (
                        <>
                        <Grid item xs={12}>
                            {nameErr ? (
                                <TextField error helperText="Insire seu nome." fullWidth required id="outlined-basic" label="Seu nome" variant="outlined" value={userInfo.name} onChange={evt => handleNameChange(evt.target.value)} />
                            ) : (
                                <TextField fullWidth required id="outlined-basic" label="Seu nome" variant="outlined" value={userInfo.name} onChange={evt => handleNameChange(evt.target.value)} />
                            )}
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                            <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" value={userInfo.email} onChange={evt => handleEmailChange(evt.target.value)} />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '10px' }}>
                            <TextField multiline rows={5} fullWidth id="outlined-basic" label="Deixe uma mensagem :)" variant="outlined" value={userInfo.message} onChange={evt => handleMsgChange(evt.target.value)} />
                        </Grid>
                        {isLoading ? (
                            <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <CircularProgress size={30} color="success" />
                            </Grid>
                        ): (
                            <>
                            <Button variant='outlined' style={{ marginTop: '20px', marginRight: '20px', color: '#206955', borderColor: '#206955' }} onClick={handleBack}>Voltar</Button>
                            <Button variant='contained' style={{ marginTop: '20px', backgroundColor: '#206955' }} onClick={saveMsgAndContinue}>Continuar</Button>
                            </>
                        )}
                        </>
                    ) : (
                        <>
                        <Wallet initialization={{ preferenceId: walletPrefId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
                        <Button variant='outlined' style={{ marginTop: '20px', marginRight: '20px', color: '#206955', borderColor: '#206955' }} onClick={handleBack}>Voltar</Button>
                        {/* <Button variant='contained' style={{ marginTop: '20px' }} onClick={handleContinue}>Continuar</Button> */}
                        </>
                    )}
                    
                </Container>
            </Grid>
        </Grid>
        </Container>
    </div>
    );
};
