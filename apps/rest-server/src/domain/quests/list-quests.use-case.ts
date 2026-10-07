import type { PageInput, Paginated } from '@repo/core/pagination';
import { QuestsDbDatasource } from '#data/quests/quests.db.datasource.js';
import type { Quest, QuestStatus } from '#domain/model/quests.model.js';
import { withXpReward } from './quests.utils.js';

export interface ListQuestsInput extends PageInput {
  status?: QuestStatus;
}

export const ListQuestsUseCase = {
  async exec({ status, ...page }: ListQuestsInput): Promise<Paginated<Quest>> {
    const result = await QuestsDbDatasource.findMany(status, page);
    return { ...result, nodes: result.nodes.map(withXpReward) };
  },
};
