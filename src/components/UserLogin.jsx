import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer.jsx';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert, Paper } from '@mui/material';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        let hasError = false;
        setEmailError(false);
        setPasswordError(false);

        if (!email) {
            setEmailError(true);
            hasError = true;
            showError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            hasError = true;
            showError('Please enter a valid email address');
        }

        if (!password) {
            setPasswordError(true);
            hasError = true;
            showError('Password is required');
        }

        if (hasError) return;

        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home');
        } catch (error) {
            showError('Login failed: Invalid email or password');
        }
    };

    const showError = (message) => {
        setError(message);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <><Header username="Guest" />
        <Container
            maxWidth="xs"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%', textAlign: 'center' }}>
                <Box textAlign="center" mb={2}>
                    <Typography variant="h4" gutterBottom>Login</Typography>
                </Box>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    error={emailError}
                    helperText={emailError ? 'Please enter a valid email' : ''}
                    FormHelperTextProps={{
                        sx: { marginLeft: 0, color: 'red' },
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={passwordError}
                    helperText={passwordError ? 'Password is required' : ''}
                    FormHelperTextProps={{
                        sx: { marginLeft: 0, color: 'red' },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ mt: 3 }}>
                    Login
                </Button>
                <Button color="secondary" onClick={() => navigate('/signup')} sx={{ mt: 2 }}>
                    Don't have an account? Sign Up
                </Button>
            </Paper>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Container>
        <Footer />
        </>
    );
};

export default UserLogin;
