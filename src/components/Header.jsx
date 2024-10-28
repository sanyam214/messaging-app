import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link } from '@mui/material';

const Header = ({ username }) => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#e3f2fd', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#1976d2' }}>
                    Messaging App
                </Typography>

                <Box sx={{ display: 'flex', gap: '20px', textAlign: 'center' }}>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: '#1976d2',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            '&:hover': { textDecoration: 'underline', color: '#1565c0' },
                        }}
                    >
                        Home
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: '#1976d2',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            '&:hover': { textDecoration: 'underline', color: '#1565c0' },
                        }}
                    >
                        Chat
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: '#1976d2',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            '&:hover': { textDecoration: 'underline', color: '#1565c0' },
                        }}
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: '#1976d2',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            '&:hover': { textDecoration: 'underline', color: '#1565c0' },
                        }}
                    >
                        Contact
                    </Link>
                    <Link
                        href="#"
                        underline="hover"
                        sx={{
                            color: '#1976d2',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            '&:hover': { textDecoration: 'underline', color: '#1565c0' },
                        }}
                    >
                        Help
                    </Link>
                </Box>

                <Typography variant="subtitle1" sx={{ color: '#1976d2', fontStyle: 'italic' }}>
                    {username}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
