import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookInterface } from "../interfaces/IBook";
import { GetBook } from "../services/HttpClientService";

function Books() {
  const [Books, setBooks] = useState<BookInterface[]>([]);

  useEffect(() => {
    GetBook();
  }, []);

  const getBooks = async () => {
    let res = await GetBook();
    if (res) {
      setBooks(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Name",
      headerName: "ชื่อ",
      width: 250,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Author",
      headerName: "ผู้แต่ง",
      width: 150,
      valueFormatter: (params) => params.value.Author,
    },
    {
      field: "Page",
      headerName: "จำนวนหน้า",
      width: 150,
      valueFormatter: (params) => params.value.Page,
    },
    {
        field: "Quantity",
        headerName: "จำนวนหนังสือ",
        width: 150,
        valueFormatter: (params) => params.value.Quantity,
    },
    {
        field: "Price",
        headerName: "ราคา",
        width: 150,
        valueFormatter: (params) => params.value.Price,
    },
    { field: "Date", headerName: "วันที่และเวลา", width: 250 },
    {
        field: "EmployeeID",
        headerName: "ไอดีพนักงาน",
        width: 150,
        valueFormatter: (params) => params.value.EmployeeID,
    },
    {
        field: "BooktypeID",
        headerName: "ไอดีชนิดหนังสือ",
        width: 150,
        valueFormatter: (params) => params.value.BooktypeID,
    },
    {
        field: "ShelfID",
        headerName: "ไอดีชั้นวางหนังสือ",
        width: 150,
        valueFormatter: (params) => params.value.ShelfID,
    },
    {
        field: "RoleID",
        headerName: "ไอดีสิทธิ์เข้าถึงหนังสือ",
        width: 150,
        valueFormatter: (params) => params.value.RoleID,
    },
  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการลงทะเบียนหนังสือ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/book/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={Books}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Books;