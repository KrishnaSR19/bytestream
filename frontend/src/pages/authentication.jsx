import React, { useState, useContext } from 'react';
import {
  Avatar, Box, Button, Grid, Paper, Snackbar,
  Tab, Tabs, TextField, Typography, Card, CardContent
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';

const theme = createTheme();

export default function Authentication() {
  const { handleRegister, handleLogin } = useContext(AuthContext);

  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setName('');
    setError('');
  };

  const handleAuth = async () => {
    setError('');
    setLoading(true);
    try {
      if (tabIndex === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        setMessage(result);
        setOpenSnackbar(true);
        resetForm();
        setTabIndex(0);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
        <Card sx={{ width: 380, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {tabIndex === 0 ? 'Sign In' : 'Sign Up'}
              </Typography>

              <Tabs
                value={tabIndex}
                onChange={(e, newValue) => {
                  setTabIndex(newValue);
                  resetForm();
                }}
                variant="fullWidth"
                sx={{ mb: 2 }}
              >
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>

              {tabIndex === 1 && (
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                />
              )}
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />

              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleAuth}
                disabled={loading}
              >
                {loading ? 'Processing...' : tabIndex === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          message={message}
        />
      </Grid>
    </ThemeProvider>
  );
}
