import { useState, useEffect } from 'react';
import {
  getProcedureCategories,
  getProcedureSubCategories,
  getDocumentCategories,
} from '@/lib/api/services';
import type {
  ProcedureCategory,
  ProcedureSubCategory,
  DocumentCategory,
} from '@/lib/api/types';

interface UseCategoriesReturn {
  procedureCategories: ProcedureCategory[];
  documentCategories: DocumentCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCategories(): UseCategoriesReturn {
  const [procedureCategories, setProcedureCategories] = useState<ProcedureCategory[]>([]);
  const [documentCategories, setDocumentCategories] = useState<DocumentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [procedureResponse, documentResponse] = await Promise.all([
        getProcedureCategories(),
        getDocumentCategories(),
      ]);
      setProcedureCategories(procedureResponse.data);
      setDocumentCategories(documentResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    procedureCategories,
    documentCategories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}

interface UseSubCategoriesReturn {
  subCategories: ProcedureSubCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useSubCategories(categoryId?: number): UseSubCategoriesReturn {
  const [subCategories, setSubCategories] = useState<ProcedureSubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getProcedureSubCategories(categoryId);
      setSubCategories(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subcategories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  return {
    subCategories,
    isLoading,
    error,
    refetch: fetchSubCategories,
  };
} 