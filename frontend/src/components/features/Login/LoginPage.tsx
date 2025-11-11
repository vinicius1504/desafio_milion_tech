import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  People as PeopleIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext';
import { useThemeMode } from '../../../contexts/ThemeContext';
import { LoginCredentials } from '../../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(credentials);
      navigate('/customers');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Erro ao fazer login. Verifique suas credenciais.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: mode === 'light'
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: mode === 'light'
            ? 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.1) 0%, transparent 50%)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
        }}
      >
        <Tooltip title={mode === 'light' ? 'Modo Escuro' : 'Modo Claro'}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'white',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Card
          elevation={0}
          sx={{
            backdropFilter: 'blur(20px)',
            backgroundColor: mode === 'light'
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(30, 41, 59, 0.95)',
            border: '1px solid',
            borderColor: mode === 'light'
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(255, 255, 255, 0.1)',
            boxShadow: mode === 'light'
              ? '0 20px 60px rgba(0, 0, 0, 0.15)'
              : '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  background: mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  mb: 3,
                  boxShadow: mode === 'light'
                    ? '0 8px 24px rgba(102, 126, 234, 0.3)'
                    : '0 8px 24px rgba(59, 130, 246, 0.3)',
                }}
              >
                <PeopleIcon sx={{ fontSize: 48, color: 'white' }} />
              </Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, mb: 1 }}
              >
                Bem-vindo de volta
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Sistema de Gestão de Clientes
              </Typography>
              <Chip
                label="Faça login para continuar"
                size="small"
                sx={{
                  bgcolor: mode === 'light' ? 'primary.50' : 'rgba(59, 130, 246, 0.1)',
                  color: 'primary.main',
                  fontWeight: 500,
                }}
              />
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuário"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                margin="normal"
                required
                autoFocus
                disabled={loading}
                placeholder="admin"
              />

              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading}
                placeholder="admin"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<LoginIcon />}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: mode === 'light'
                      ? 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)'
                      : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: mode === 'light'
                      ? '0 8px 24px rgba(102, 126, 234, 0.4)'
                      : '0 8px 24px rgba(59, 130, 246, 0.4)',
                  },
                }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <Box
                sx={{
                  mt: 3,
                  p: 2.5,
                  backgroundColor: mode === 'light'
                    ? 'rgba(59, 130, 246, 0.05)'
                    : 'rgba(59, 130, 246, 0.1)',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: mode === 'light'
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(59, 130, 246, 0.3)',
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  display="block"
                  sx={{ mb: 1.5, fontWeight: 600 }}
                >
                  Credenciais de acesso:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label="Usuário"
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                        bgcolor: 'primary.main',
                        color: 'white',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      admin
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label="Senha"
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                        bgcolor: 'primary.main',
                        color: 'white',
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      admin
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
