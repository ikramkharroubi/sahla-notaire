import { useState, useEffect } from 'react';
import { getProcedures, getProcedure } from '@/lib/api/services';
import type { Procedure } from '@/lib/api/types';

interface UseProceduresOptions {
  category?: number;
  subcategory?: number;
  search?: string;
}

interface UseProceduresReturn {
  procedures: Procedure[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProcedures(options: UseProceduresOptions = {}): UseProceduresReturn {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProcedures = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getProcedures(options);
      setProcedures(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch procedures');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, [options.category, options.subcategory, options.search]);

  return {
    procedures,
    isLoading,
    error,
    refetch: fetchProcedures,
  };
}

interface UseProcedureReturn {
  procedure: Procedure | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProcedure(id: number): UseProcedureReturn {
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProcedure = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getProcedure(id);
      setProcedure(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch procedure');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedure();
  }, [id]);

  return {
    procedure,
    isLoading,
    error,
    refetch: fetchProcedure,
  };
} 