import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { BookTypesInterface } from "../interfaces/IBookType";
import { EmployeesInterface } from "../interfaces/IEmployee";
import { ShelfsInterface } from "../interfaces/IShelf";
import { RolesInterface } from "../interfaces/IRole";

import {
  GetBookTypes,
  GetEmployees,
  GetRoles,
  GetShelfs,
  Books,
} from "../services/HttpClientService";
import { BookInterface } from "../interfaces/IBook";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BookCreate() {
  const [booktypes, setBookTypes] = useState<BookTypesInterface[]>([]);
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [shelfs, setShelfs] = useState<ShelfsInterface[]>([]);
  const [employees, setEmployees] = useState<EmployeesInterface>();
  const [book, setBook] = useState<Partial<BookInterface>>({
    Date: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.name);
    console.log(event.target.value);

    
    const name = event.target.name as keyof typeof book;
    setBook({
      ...book,
      [name]: event.target.value,
    });
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof book;
    const { value } = event.target;
    setBook({ ...book, [id]: value });
  };

  const getBookTypes = async () => {
    let res = await GetBookTypes();
    if (res) {
      setBookTypes(res);
    }
  };

  const getRoles = async () => {
    let res = await GetRoles();
    if (res) {
      setRoles(res);
    }
  };

  const getEmployees = async () => {
    let res = await GetEmployees();
    if (res) {
      setEmployees(res);
    }
  };

  const getShelfs = async () => {
    let res = await GetShelfs();
    if (res) {
      setEmployees(res);
    }
  };

  useEffect(() => {
    getShelfs();
    getEmployees();
    getBookTypes();
    getRoles();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Emp_ID: convertType(book.EmpID),
      Booktype_ID: convertType(book.BooktypeID),
      Role_ID: convertType(book.RoleID),
      Shelf_ID: convertType(book.ShelfID),
      Date: book.Date,
      Name: book.Name,
      Author: book.Author,
      Page: book.Page,
      Quantity: book.Quantity,
      Price: book.Price,
    };

    let res = await Books(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกการลงทะเบียนหนังสือ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Book Type</p>
              <Select
                native
                value={book.BooktypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BooktypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชนิดหนังสือ
                </option>
                {booktypes.map((item: BookTypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
                <p>Book Name</p>
                <TextField
                    //id="outlined-password-input"
                    //label="Password"
                    //type="password"
                    //autoComplete="current-password"
                    id="Name"
                    variant="outlined"
                    type="string"
                    size="medium"
                    //placeholder="กรุณากรอกข้อมูลชื่อ"
                    value={book.Name || ""}
                    onChange={handleInputChange}
                />

            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Shelf</p>
              <Select
                native
                value={book.ShelfID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ShelfID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชั้นวางหนังสือ
                </option>
                {shelfs.map((item: ShelfsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
                <p>Author</p>
                <TextField
                    id="Author"
                    variant="outlined"
                    type="string"
                    size="medium"
                    //placeholder="กรุณากรอกข้อมูลชื่อ"
                    value={book.Author || ""}
                    onChange={handleInputChange}
                />

            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพลย์ลิสต์</p>
              <Select
                native
                value={watchVideo.PlaylistID + ""}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "PlaylistID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพลย์ลิสต์
                </option>
                <option value={playlists?.ID} key={playlists?.ID}>
                  {playlists?.Title}
                </option>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={book.Date}
                  onChange={(newValue) => {
                    setBook({
                      ...book,
                      Date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Page</p>
              <TextField
                id="Pace"
                variant="outlined"
                type="string"
                size="medium"
                //placeholder="กรุณากรอกข้อมูลชื่อ"
                value={book.Page || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>

          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Quantity</p>
              <TextField
                id="Quantity"
                variant="outlined"
                type="string"
                size="medium"
                //placeholder="กรุณากรอกข้อมูลชื่อ"
                value={book.Quantity || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>

          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>Price</p>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/books"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BookCreate;