import { useState, useEffect } from 'react';
import { getDocuments, getDocument } from '@/lib/api/services';
import type { Document } from '@/lib/api/types';

interface UseDocumentsOptions {
  category?: number;
  search?: string;
}

interface UseDocumentsReturn {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDocuments(options: UseDocumentsOptions = {}): UseDocumentsReturn {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDocuments(options);
      setDocuments(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [options.category, options.search]);

  return {
    documents,
    isLoading,
    error,
    refetch: fetchDocuments,
  };
}

interface UseDocumentReturn {
  document: Document | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDocument(id: number): UseDocumentReturn {
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDocument(id);
      setDocument(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch document');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocument();
  }, [id]);

  return {
    document,
    isLoading,
    error,
    refetch: fetchDocument,
  };
} 