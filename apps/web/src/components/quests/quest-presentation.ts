import type { QuestDifficulty, QuestStatus } from '@domain/model/quest.model';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export const QUEST_STATUS_COLUMNS: Array<{ status: QuestStatus; title: string; subtitle: string }> = [
  { status: 'open', title: 'Pergaminhos Novos', subtitle: 'À espera de um campeão' },
  { status: 'in_progress', title: 'Em Jornada', subtitle: 'Heróis na estrada' },
  { status: 'resolved', title: 'Lendas Concluídas', subtitle: 'Já nas canções' },
];

export const QUEST_DIFFICULTY_LABEL: Record<QuestDifficulty, string> = {
  easy: 'Fácil',
  normal: 'Normal',
  high: 'Difícil',
};

export const NEXT_STATUS: Partial<Record<QuestStatus, QuestStatus>> = {
  open: 'in_progress',
  in_progress: 'resolved',
};

export const ADVANCE_LABEL: Partial<Record<QuestStatus, string>> = {
  open: 'Aceitar missão',
  in_progress: 'Selar a vitória',
};

export function formatQuestAge(createdAt: string): string {
  return `Aberta há ${formatDistanceToNow(new Date(createdAt), { locale: ptBR })}`;
}
