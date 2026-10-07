import { ApiError } from '@core/http/http-client';
import { createQuest } from '@data/quests/quests.datasource';
import type { Quest, QuestInput } from '@domain/model/quest.model';
import { useState } from 'react';

interface UseCreateQuestResult {
  createQuest: (input: QuestInput) => Promise<Quest | null>;
  isLoading: boolean;
  error: ApiError | null;
}

export function useCreateQuest(): UseCreateQuestResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const submit = async (input: QuestInput): Promise<Quest | null> => {
    setIsLoading(true);
    setError(null);

    try {
      return await createQuest(input);
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError('Falha ao publicar a missão'));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createQuest: submit, isLoading, error };
}
