import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { background } from '../../Constants/Colors';

export default function DashboardContainer() {
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: background, height: '100vh' }} />
        </Container>
    </React.Fragment>

}