import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../pages/Methods/slice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Button,
  TextField,
  TablePagination,
} from '@mui/material';
import './Contacts.css';

const Contacts = () => {
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector((state) => state.addContacts);

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  useEffect(() => {
    dispatch(actions.fetchContactDetails());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert('Mobile number already exists. Please give a new mobile number');
      dispatch(actions.clearError()); 
    }
  }, [error, dispatch]);
  

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(actions.deleteContact({ id }));
    }
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setEditValues(contact);
  };

  const handleSave = () => {
    dispatch(actions.updateContact({ id: editingId, ...editValues }));
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = [...(Array.isArray(data) ? data : [])].sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );

  if (sortedData.length === 0)
    return (
      <Typography variant="h6" align="center">
        No contacts available
      </Typography>
    );

  return (
    <div className="view">
      <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contacts
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((contact) => (
              <TableRow key={contact._id}>
                {editingId === contact._id ? (
                  <>
                    <TableCell>
                      <TextField
                        name="firstName"
                        value={editValues.firstName}
                        onChange={handleChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="lastName"
                        value={editValues.lastName}
                        onChange={handleChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="email"
                        value={editValues.email}
                        onChange={handleChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="phoneNumber"
                        value={editValues.phoneNumber}
                        onChange={handleChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="company"
                        value={editValues.company}
                        onChange={handleChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="jobTitle"
                        value={editValues.jobTitle}
                        onChange={handleChange}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleSave}
                        sx={{ marginRight: 1 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>{contact.jobTitle}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(contact)}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </div>
  );
};

export default Contacts;
