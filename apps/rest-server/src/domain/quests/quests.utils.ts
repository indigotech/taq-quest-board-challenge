import type { Quest, QuestData, QuestDifficulty } from '#domain/model/quests.model.js';

const XP_REWARD_BY_DIFFICULTY: Record<QuestDifficulty, number> = {
  easy: 10,
  normal: 25,
  high: 50,
};

export function calculateXpReward(difficulty: QuestDifficulty): number {
  return XP_REWARD_BY_DIFFICULTY[difficulty];
}

export function withXpReward(quest: QuestData): Quest {
  return { ...quest, xpReward: calculateXpReward(quest.difficulty) };
}
