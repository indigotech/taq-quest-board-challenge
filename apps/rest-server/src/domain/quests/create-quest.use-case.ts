import { QuestsDbDatasource } from '#data/quests/quests.db.datasource.js';
import type { Quest, QuestInput } from '#domain/model/quests.model.js';
import { withXpReward } from './quests.utils.js';

export const CreateQuestUseCase = {
  async exec(input: QuestInput): Promise<Quest> {
    const quest = await QuestsDbDatasource.create(input);
    return withXpReward(quest);
  },
};
