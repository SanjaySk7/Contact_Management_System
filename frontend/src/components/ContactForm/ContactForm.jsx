import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid,Typography } from '@mui/material';
import { actions } from "../../pages/Methods/slice";
import './AddContact.css';

const ContactForm = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formValues.firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!formValues.lastName.trim()) newErrors.lastName = 'Last Name is required.';
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formValues.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formValues.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (isNaN(formValues.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be numeric.';
    } else if (Number(formValues.phoneNumber) < 0) {
      newErrors.phoneNumber = 'Phone Number cannot be negative.';
    }
    if (!formValues.company.trim()) newErrors.company = 'Company is required.';
    if (!formValues.jobTitle.trim()) newErrors.jobTitle = 'Job Title is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(actions.addContactDetails(formValues));
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    }
  };

  return (
    <div className='add'>
    <Typography variant="h4" align="center" gutterBottom>
          Add Contact
        </Typography>
    <div className="form-container">
      
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                value={formValues.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={formValues.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={formValues.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="company"
                label="Company"
                variant="outlined"
                fullWidth
                value={formValues.company}
                onChange={handleChange}
              />
              {errors.company && <span className="error-text">{errors.company}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="jobTitle"
                label="Job Title"
                variant="outlined"
                fullWidth
                value={formValues.jobTitle}
                onChange={handleChange}
              />
              {errors.jobTitle && <span className="error-text">{errors.jobTitle}</span>}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add Contact
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
