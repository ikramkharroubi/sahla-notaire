import { apiClient } from './client';
import type {
  Procedure,
  ProcedureCategory,
  ProcedureSubCategory,
  Document,
  DocumentCategory,
  ApiResponse,
} from './types';

// Procedure Categories
export const getProcedureCategories = async () => {
  const response = await apiClient.get<ApiResponse<ProcedureCategory[]>>('/categories/');
  return response.data;
};

// Procedure Subcategories
export const getProcedureSubCategories = async (categoryId?: number) => {
  const url = categoryId ? `/subcategories/?category=${categoryId}` : '/subcategories/';
  const response = await apiClient.get<ApiResponse<ProcedureSubCategory[]>>(url);
  return response.data;
};

// Procedures
export const getProcedures = async (params?: {
  category?: number;
  subcategory?: number;
  search?: string;
}) => {
  const response = await apiClient.get<ApiResponse<Procedure[]>>('/procedures/', { params });
  return response.data;
};

export const getProcedure = async (id: number) => {
  const response = await apiClient.get<ApiResponse<Procedure>>(`/procedures/${id}/`);
  return response.data;
};

// Document Categories
export const getDocumentCategories = async () => {
  const response = await apiClient.get<ApiResponse<DocumentCategory[]>>('/document-categories/');
  return response.data;
};

// Documents
export const getDocuments = async (params?: {
  category?: number;
  search?: string;
}) => {
  const response = await apiClient.get<ApiResponse<Document[]>>('/documents/', { params });
  return response.data;
};

export const getDocument = async (id: number) => {
  const response = await apiClient.get<ApiResponse<Document>>(`/documents/${id}/`);
  return response.data;
};

// Authentication
export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const [firstName, ...lastNameParts] = data.name.split(' ');
  const lastName = lastNameParts.join(' ');
  
  const response = await apiClient.post<{ token: string; user: any }>('/auth/register/', {
    username: data.email,
    email: data.email,
    password: data.password,
    password2: data.password,
    first_name: firstName,
    last_name: lastName || firstName,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post<{ token: string }>('/auth/login/', {
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('auth_token');
}; 