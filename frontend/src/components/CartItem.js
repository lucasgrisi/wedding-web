import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ImageIcon from '@mui/icons-material/Image';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { ButtonGroup, Button, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Dropdown } from '@mui/base'; 

export default function CartItem({img, title, price, buyQtd, totalQtd, handleOnClick, onChangeQtd}) {
    const priceStr = `R$ ${buyQtd*price}`;
    const titleStr = `${title} (x${buyQtd})`;
    const items = Array.from({ length: totalQtd }, (_, index) => index + 1);

    return (
        <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={handleOnClick}>
            <DeleteIcon />
          </IconButton>}
        >
        <ListItemAvatar>
          <img src={img} width={50} style={{ borderRadius: '25px' }}/>
        </ListItemAvatar>
        <ListItemText primary={titleStr} secondary={priceStr} />
        <FormControl style={{ minWidth: 60 }} size='small'>
          {/* <InputLabel id="dropdown-label">Qtd</InputLabel> */}
          <Select labelId="dropdown-label" id="dropdown" value={buyQtd} onChange={(evt) => onChangeQtd(evt)} autoWidth>
            {items.map(i => {
              return(
                <MenuItem value={i}>{i}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
        </ListItem>
    )
}