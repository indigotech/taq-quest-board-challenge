import { describe, expect, it } from 'vitest';
import { QUEST_DIFFICULTY_LABEL, formatQuestAge } from './quest-presentation';

describe('quest-presentation', () => {
  it('has a label for every quest difficulty', () => {
    expect(QUEST_DIFFICULTY_LABEL).toEqual({
      easy: 'Fácil',
      normal: 'Normal',
      high: 'Difícil',
    });
  });

  it('formats a recent date as a relative age', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    expect(formatQuestAge(oneHourAgo)).toBe('Aberta há cerca de 1 hora');
  });
});
