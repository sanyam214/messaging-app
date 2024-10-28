import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer.jsx';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert, Paper } from '@mui/material';

const UserSignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        let hasError = false;
        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);

        if (!username) {
            setUsernameError(true);
            hasError = true;
            showError('Username is required');
        }
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
        } else if (password.length < 6) {
            setPasswordError(true);
            hasError = true;
            showError('Password must be at least 6 characters');
        }

        if (hasError) return;

        try {
            await axios.post('http://localhost:5000/auth/register', { username, email, password });
            navigate('/');
        } catch (error) {
            showError('Signup failed: Please try again');
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
                    <Typography variant="h4" gutterBottom>Sign Up</Typography>
                </Box>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    error={usernameError}
                    helperText={usernameError ? 'Username is required' : ''}
                    FormHelperTextProps={{
                        sx: { marginLeft: 0, color: 'red' },
                    }}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                    helperText={passwordError ? 'Password must be at least 6 characters' : ''}
                    FormHelperTextProps={{
                        sx: { marginLeft: 0, color: 'red' },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleSignup} sx={{ mt: 3 }}>
                    Sign Up
                </Button>
                <Button color="secondary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Already have an account? Log In
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
        <Footer /></>
    );
};

export default UserSignUp;
