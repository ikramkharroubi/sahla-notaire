export interface ProcedureCategory {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ProcedureSubCategory {
  id: number;
  name: string;
  description?: string;
  category: number;
  created_at: string;
  updated_at: string;
}

export interface Procedure {
  id: number;
  title: string;
  description: string;
  category: number;
  subcategory: number;
  steps: string[];
  requirements: string[];
  created_at: string;
  updated_at: string;
}

export interface DocumentCategory {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: number;
  title: string;
  description: string;
  file_url: string;
  category: number;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
} 