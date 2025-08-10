import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsService } from '@/services/clients';
import type { 
  CreateClientData, 
  UpdateClientData,
  CreateProductData,
  UpdateProductData,
  CreateVerificationTypeData,
  UpdateVerificationTypeData
} from '@/types/client';
import type { PaginationQuery } from '@/types/api';
import toast from 'react-hot-toast';

// Query keys
export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (filters: PaginationQuery) => [...clientKeys.lists(), filters] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
};

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: PaginationQuery) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  byClient: (clientId: string) => [...productKeys.all, 'by-client', clientId] as const,
};

export const verificationTypeKeys = {
  all: ['verification-types'] as const,
  lists: () => [...verificationTypeKeys.all, 'list'] as const,
  list: (filters: PaginationQuery) => [...verificationTypeKeys.lists(), filters] as const,
  details: () => [...verificationTypeKeys.all, 'detail'] as const,
  detail: (id: string) => [...verificationTypeKeys.details(), id] as const,
  byProduct: (productId: string) => [...verificationTypeKeys.all, 'by-product', productId] as const,
};

// Client queries
export const useClients = (query: PaginationQuery = {}) => {
  return useQuery({
    queryKey: clientKeys.list(query),
    queryFn: () => clientsService.getClients(query),
  });
};

export const useClient = (id: string) => {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientsService.getClientById(id),
    enabled: !!id,
  });
};

// Product queries
export const useProducts = (query: PaginationQuery = {}) => {
  return useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => clientsService.getProducts(query),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => clientsService.getProductById(id),
    enabled: !!id,
  });
};

export const useProductsByClient = (clientId: string) => {
  return useQuery({
    queryKey: productKeys.byClient(clientId),
    queryFn: () => clientsService.getProductsByClient(clientId),
    enabled: !!clientId,
  });
};

// Verification type queries
export const useVerificationTypes = (query: PaginationQuery = {}) => {
  return useQuery({
    queryKey: verificationTypeKeys.list(query),
    queryFn: () => clientsService.getVerificationTypes(query),
  });
};

export const useVerificationType = (id: string) => {
  return useQuery({
    queryKey: verificationTypeKeys.detail(id),
    queryFn: () => clientsService.getVerificationTypeById(id),
    enabled: !!id,
  });
};

export const useVerificationTypesByProduct = (productId: string) => {
  return useQuery({
    queryKey: verificationTypeKeys.byProduct(productId),
    queryFn: () => clientsService.getVerificationTypesByProduct(productId),
    enabled: !!productId,
  });
};

// Client mutations
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientData) => clientsService.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success('Client created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create client');
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientData }) =>
      clientsService.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success('Client updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update client');
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success('Client deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete client');
    },
  });
};

// Product mutations
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductData) => clientsService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      toast.success('Product created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) =>
      clientsService.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    },
  });
};

// Verification type mutations
export const useCreateVerificationType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVerificationTypeData) => clientsService.createVerificationType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: verificationTypeKeys.all });
      toast.success('Verification type created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create verification type');
    },
  });
};

export const useUpdateVerificationType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVerificationTypeData }) =>
      clientsService.updateVerificationType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: verificationTypeKeys.all });
      toast.success('Verification type updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update verification type');
    },
  });
};

export const useDeleteVerificationType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsService.deleteVerificationType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: verificationTypeKeys.all });
      toast.success('Verification type deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete verification type');
    },
  });
};
