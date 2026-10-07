import { Button } from '@atomic/atm.button';
import { Body } from '@atomic/atm.typography';
import { LoadingCentered } from '@atomic/mol.loading';
import { Col, Grid } from '@atomic/obj.grid';
import type { Quest, QuestInput, QuestStatus } from '@domain/model/quest.model';
import { useCreateQuest } from '@domain/quests/use-create-quest.use-case';
import { useListQuests } from '@domain/quests/use-list-quests.use-case';
import { useCallback, useMemo, useState } from 'react';
import { CreateQuestModal } from './create-quest-modal.component';
import { QuestBoardHeader } from './quest-board-header.component';
import { QuestColumn } from './quest-column.component';
import { QuestPlayerHud } from './quest-player-hud.component';
import { NEXT_STATUS, QUEST_STATUS_COLUMNS } from './quest-presentation';

const QuestBoardPage = () => {
  const { quests, isLoading, error, refetch } = useListQuests();
  const { createQuest, isLoading: isCreating, error: createError } = useCreateQuest();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, QuestStatus>>({});
  // Only the first load replaces the board with a spinner; refetches keep the current columns on screen.
  const isInitialLoading = isLoading && quests.length === 0;

  const effectiveStatus = useCallback(
    (quest: Quest): QuestStatus => statusOverrides[quest.id] ?? quest.status,
    [statusOverrides],
  );

  const handleAdvance = (quest: Quest) => {
    const next = NEXT_STATUS[effectiveStatus(quest)];
    if (!next) {
      return;
    }

    setStatusOverrides(previous => ({ ...previous, [quest.id]: next }));
  };

  const columns = useMemo(
    () =>
      QUEST_STATUS_COLUMNS.map(column => ({
        ...column,
        quests: quests.filter(quest => effectiveStatus(quest) === column.status),
      })),
    [quests, effectiveStatus],
  );

  const handleCreateQuest = async (input: QuestInput) => {
    const created = await createQuest(input);
    if (created) {
      setIsCreateModalOpen(false);
      refetch();
    }
    return Boolean(created);
  };

  return (
    <Grid className="max-w-[1100px] py-lg">
      <Col sm={12} className="mb-lg">
        <QuestBoardHeader onCreateClick={() => setIsCreateModalOpen(true)} />
      </Col>

      <Col sm={12} className="mb-lg">
        <QuestPlayerHud />
      </Col>

      {isInitialLoading && (
        <Col sm={12}>
          <LoadingCentered />
        </Col>
      )}

      {!isLoading && error && (
        <Col sm={12} className="text-center">
          <Body role="alert">{error.message}</Body>
          <Button variant="secondary" onClick={refetch} className="mt-md">
            Tentar de novo
          </Button>
        </Col>
      )}

      {!isInitialLoading && !error && (
        <Col sm={12}>
          <div className="grid grid-cols-3 items-start gap-[18px]">
            {columns.map(column => (
              <QuestColumn
                key={column.status}
                status={column.status}
                title={column.title}
                subtitle={column.subtitle}
                quests={column.quests}
                onAdvance={handleAdvance}
              />
            ))}
          </div>
        </Col>
      )}

      <CreateQuestModal
        opened={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateQuest}
        isLoading={isCreating}
        errorMessage={createError?.message}
      />
    </Grid>
  );
};

export default QuestBoardPage;
