import { ApiError } from '@core/http/http-client';
import { listQuests } from '@data/quests/quests.datasource';
import type { Quest } from '@domain/model/quest.model';
import { useCallback, useEffect, useState } from 'react';

const BOARD_SIZE = 100;

interface UseListQuestsResult {
  quests: Quest[];
  isLoading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export function useListQuests(): UseListQuestsResult {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await listQuests({ limit: BOARD_SIZE });
      setQuests(result.nodes);
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Falha ao carregar as missões'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { quests, isLoading, error, refetch: load };
}
