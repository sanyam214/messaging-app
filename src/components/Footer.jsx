import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => (
    <Box
        component="footer"
        sx={{
            bgcolor: '#000',
            color: '#fff',
            py: 2,
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: 'bold',
            marginTop: '5%'
        }}
    >
        <Typography variant="body1" sx={{ mb: 1 }}>
            © 2024 Messaging App. All rights reserved.
        </Typography>
        <Box>
            <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ mx: 2, fontWeight: 'bold', '&:hover': { color: '#888' } }}
            >
                Privacy Policy
            </Link>
            <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ mx: 2, fontWeight: 'bold', '&:hover': { color: '#888' } }}
            >
                Terms of Service
            </Link>
            <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ mx: 2, fontWeight: 'bold', '&:hover': { color: '#888' } }}
            >
                Contact Us
            </Link>
        </Box>
    </Box>
);

export default Footer;
