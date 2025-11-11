import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Stack,
  Fade,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { Customer, CreateCustomerDTO } from '../../../types';
import { customerService } from '../../../services/customerService';
import { CustomerForm } from './CustomerForm';
import { generateCustomersPDF } from '../../../utils/pdfGenerator';

export const CustomerList: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string>('');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, [search]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await customerService.getCustomers({ search });
      setCustomers(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar clientes';
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setFormOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormOpen(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete) return;

    try {
      await customerService.deleteCustomer(customerToDelete.id);
      enqueueSnackbar('Cliente excluído com sucesso!', { variant: 'success' });
      loadCustomers();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao excluir cliente';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleFormSubmit = async (data: CreateCustomerDTO) => {
    try {
      if (selectedCustomer) {
        await customerService.updateCustomer(selectedCustomer.id, data);
        enqueueSnackbar('Cliente atualizado com sucesso!', { variant: 'success' });
      } else {
        await customerService.createCustomer(data);
        enqueueSnackbar('Cliente cadastrado com sucesso!', { variant: 'success' });
      }
      loadCustomers();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao salvar cliente';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      throw err;
    }
  };

  const handleGeneratePDF = () => {
    try {
      generateCustomersPDF(customers);
      enqueueSnackbar('PDF gerado com sucesso!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Erro ao gerar PDF', { variant: 'error' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Fade in timeout={500}>
      <Box>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Gestão de Clientes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de {customers.length} cliente{customers.length !== 1 ? 's' : ''} cadastrado{customers.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<PdfIcon />}
              onClick={handleGeneratePDF}
              disabled={customers.length === 0}
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Exportar PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddCustomer}
              sx={{
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                '&:hover': {
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)'
                    : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Novo Cliente
            </Button>
          </Stack>
        </Box>

        <Card
          sx={{
            borderRadius: 3,
            boxShadow: theme.palette.mode === 'light'
              ? '0 4px 20px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <TextField
              fullWidth
              placeholder="Buscar por nome, email, telefone ou endereço..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '0.95rem',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress size={48} thickness={4} />
            </Box>
          ) : customers.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 2,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: theme.palette.mode === 'light'
                    ? 'primary.50'
                    : 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 2,
                }}
              >
                <SearchIcon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.6 }} />
              </Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                {search ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {search
                  ? 'Tente buscar com outros termos'
                  : 'Clique em "Novo Cliente" para adicionar seu primeiro cliente'}
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Nome
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      E-mail
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Telefone
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Endereço
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Data de Cadastro
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow
                      key={customer.id}
                      sx={{
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'light'
                            ? 'rgba(102, 126, 234, 0.04)'
                            : 'rgba(59, 130, 246, 0.08)',
                          transform: 'scale(1.001)',
                          transition: 'all 0.2s',
                        },
                        animation: `fadeIn 0.3s ease-in ${index * 0.05}s both`,
                        '@keyframes fadeIn': {
                          from: {
                            opacity: 0,
                            transform: 'translateY(10px)',
                          },
                          to: {
                            opacity: 1,
                            transform: 'translateY(0)',
                          },
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {customer.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{customer.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{customer.phone}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ maxWidth: 200 }}>
                            {customer.address}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={formatDate(customer.createdAt)}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditCustomer(customer)}
                            title="Editar"
                            sx={{
                              bgcolor: theme.palette.mode === 'light'
                                ? 'primary.50'
                                : 'rgba(59, 130, 246, 0.1)',
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'white',
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteClick(customer)}
                            title="Excluir"
                            sx={{
                              bgcolor: theme.palette.mode === 'light'
                                ? 'error.50'
                                : 'rgba(239, 68, 68, 0.1)',
                              '&:hover': {
                                bgcolor: 'error.main',
                                color: 'white',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
        </Card>

        <CustomerForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          customer={selectedCustomer}
          title={selectedCustomer ? 'Editar Cliente' : 'Novo Cliente'}
        />

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 1,
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
            Confirmar Exclusão
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir o cliente{' '}
              <strong style={{ color: theme.palette.text.primary }}>
                {customerToDelete?.name}
              </strong>
              ?<br />
              Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleDeleteCancel} variant="outlined">
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              startIcon={<DeleteIcon />}
              sx={{
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};
