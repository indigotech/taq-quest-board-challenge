import { FaIcon } from '@atomic/atm.fa-icon';
import type { Quest, QuestStatus } from '@domain/model/quest.model';
import { ADVANCE_LABEL, QUEST_DIFFICULTY_LABEL, formatQuestAge } from './quest-presentation';

interface QuestCardProps {
  quest: Quest;
  columnStatus: QuestStatus;
  onAdvance: (quest: Quest) => void;
}

export function QuestCard(props: QuestCardProps) {
  const { quest, columnStatus, onAdvance } = props;
  const advanceLabel = ADVANCE_LABEL[columnStatus];

  return (
    <article className="border-neutral-soft bg-neutral-xxsoft flex flex-col gap-[10px] rounded-[4px] border p-[14px] shadow-[0_1px_0_var(--color-background-strong),0_3px_8px_rgba(60,40,20,0.12)]">
      <h3 className="font-primary text-neutral-strong m-0 text-[18px] leading-[1.2] font-semibold">{quest.title}</h3>
      <p className="font-primary m-0 text-[15px] italic" style={{ color: 'var(--tinta-2)' }}>
        {quest.description}
      </p>
      <div className="flex flex-wrap gap-[6px]">
        <span
          className="border-background-strong bg-neutral-xsoft rounded-full border px-[10px] py-[2px] text-[14px]"
          style={{ color: 'var(--tinta-2)' }}>
          {QUEST_DIFFICULTY_LABEL[quest.difficulty]}
        </span>
      </div>
      <div className="border-neutral-soft flex items-center justify-between gap-sm border-t border-dashed pt-sm">
        <span className="flex items-center gap-xs text-[15px]" style={{ color: 'var(--tinta-2)' }}>
          <FaIcon.StarFull className="text-sm" style={{ color: 'var(--ouro-escuro)' }} />
          {quest.xpReward} XP
        </span>
        <span className="text-[15px]" style={{ color: 'var(--tinta-2)' }}>
          {formatQuestAge(quest.createdAt)}
        </span>
      </div>
      {advanceLabel ? (
        <button
          type="button"
          onClick={() => onAdvance(quest)}
          className="font-secondary h-[40px] rounded-[4px] border text-[13px] font-semibold tracking-[0.06em] hover:brightness-110"
          style={
            columnStatus === 'open'
              ? {
                  background: 'var(--color-neutral-strong)',
                  borderColor: 'var(--color-neutral-strong)',
                  color: 'var(--ficha-nome)',
                }
              : {
                  background: 'var(--color-primary-medium)',
                  borderColor: 'var(--color-neutral-strong)',
                  color: 'var(--color-neutral-strong)',
                }
          }>
          {advanceLabel}
        </button>
      ) : (
        <div
          className="flex items-center gap-[6px] text-[15px] italic"
          style={{ color: 'var(--color-feedback-success-medium)' }}>
          <FaIcon.Check className="text-sm" />
          Cantada pelos bardos
        </div>
      )}
    </article>
  );
}
