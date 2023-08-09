import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { setAccessTokenCookie } from '../utils/cookies';

export default function LoginPage(props: any) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, login, logout } = useAuth();
  const [isErro, setErroLogin] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new URLSearchParams();
    formData.append('client_id', 'nest');
    formData.append('client_secret', process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET as string);
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8080/auth/realms/fincycle/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        login();
        setAccessTokenCookie(data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        router.push('/transactions');
      } else {
        logout();
        setErroLogin(true);
        console.error('Erro ao autenticar:', response.status);
      }
    } catch (error) {
      logout();
      console.error('Erro na requisição:', error);
    }
    setIsSubmitting(false);
  };
  

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {isErro ? (
          <Alert severity="error">Erro na autenticação!</Alert>
        ) : (
          ''
        )}
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
