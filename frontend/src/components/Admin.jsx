import React from "react";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Container } from "@mui/system";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { produce } from "immer";
import backend from "./backend";
import { useNavigate } from "react-router-dom";
import CSVDownloader from "../utils/CSVDownloader";
import XLSXDownloader from "../utils/XLSXDownloader";

const confirmCols = [
  { field: "name", headerName: "Nome", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "nAdults", headerName: "Adultos" },
  { field: "nChildren", headerName: "Crianças" },
  { field: "phone", headerName: "Telefone", width: 150 },
  { field: "obs", headerName: "Recado", width: 300 },
];

const presentesCols = [
  { field: "name", headerName: "Nome", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "approved_at", headerName: "Data de compra" },
  { field: "item_title", headerName: "Item" },
  { field: "item_price", headerName: "Valor", width: 150 },
  { field: "message", headerName: "Mensagem", width: 500 },
];

const Admin = () => {
  const [menuOption, setMenuOption] = useState("confirm");
  const [hasChange, setHasChange] = useState(false);
  const [confirmList, setConfirmList] = useState([]);
  const [presentesList, setPresentesList] = useState([]);
  const [presentesCol, setPresentesCol] = useState([]);
  const navigate = useNavigate();

  function showConfirms() {
    getConfirmList();
    setMenuOption("confirm");
    setHasChange(!hasChange);
  }

  function showPresentes() {
    setMenuOption("presentes");
    setHasChange(!hasChange);
  }

  async function getConfirmList() {
    try {
      let result = await backend.get("/confirms");
      let data = result.data.info;
      data = data.map((elem) => {
        if (elem.nAdults) {
          elem.nAdults = parseInt(elem.nAdults);
        } else {
          elem.nAdults = 1;
        }
        if (elem.nChildren) {
          elem.nChildren = parseInt(elem.nChildren);
        } else {
          elem.nChildren = 0;
        }
        return elem;
      });
      setConfirmList(result.data.info);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPresentesList() {
    try {
      let result = await backend.get("/presentes");
      let rows = [];
      let items = [];
      let titles = '';
      let prices = 0;
      result.data.forEach((element) => {
        titles = '';
        prices = 0;
        if (element.buy_status == "approved") {
          items = element.items;
          items.forEach((item, i) => {
            if (i == 0) {
              titles = titles + item.title
            } else {
              titles = titles + ', ' + item.title
            }
            prices += parseInt(item.unit_price) * parseInt(item.quantity);
          })
          rows.push({
            id: element._id,
            name: element.name,
            email: element.email,
            message: element.message,
            approved_at: new Date(element.approved_at),
            item_title: titles,
            item_price: "R$ " + String(prices) + ",00",
          });
        }
      });
      setPresentesList(rows);
    } catch (err) {
      console.error(err);
    }
  }

  function renderDataGrid() {
    if (menuOption == "confirm") {
      return (
        <>
          <Grid xs={7}>
            <Container style={{ margin: 0 }}>
              <DataGrid
                rows={confirmList}
                columns={confirmCols}
                disableRowSelectionOnClick
                style={{ marginTop: "50px" }}
              />
            </Container>
          </Grid>
          <Grid xs={2}>
            <XLSXDownloader filename="confirmados" data={confirmList} />
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid xs={7}>
            <Container style={{ margin: 0 }}>
              <DataGrid
                rows={presentesList}
                columns={presentesCols}
                disableRowSelectionOnClick
                style={{ marginTop: "50px" }}
              />
            </Container>
          </Grid>
          <Grid xs={2}>
            <XLSXDownloader filename="presentes" data={presentesList} />
          </Grid>
        </>
      );
    }
  }

  useEffect(() => {
    getConfirmList();
    getPresentesList();
  }, [hasChange]);

  return (
    <div style={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={1.5}
        direction="row"
        justifyContent="center"
        alignItems="top"
      >
        <Grid xs={3}>
          <Sidebar style={{ height: "100vh" }}>
            <Menu style={{ marginTop: "25px" }}>
              <MenuItem
                onClick={() => showConfirms()}
                active={menuOption == "confirm" ? true : false}
              >
                {" "}
                Lista de Confimados{" "}
              </MenuItem>
              <MenuItem
                onClick={() => showPresentes()}
                active={menuOption == "presentes" ? true : false}
              >
                {" "}
                Presentes{" "}
              </MenuItem>
            </Menu>
          </Sidebar>
        </Grid>

        {renderDataGrid()}
      </Grid>
    </div>
  );
};

export default Admin;
