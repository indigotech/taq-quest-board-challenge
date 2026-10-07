import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CreateQuestModal } from './create-quest-modal.component';

describe('CreateQuestModal', () => {
  it('marks both fields as required', () => {
    render(<CreateQuestModal opened onClose={vi.fn()} onSubmit={vi.fn()} isLoading={false} />);

    expect(screen.getByLabelText('Título da missão')).toBeRequired();
    expect(screen.getByLabelText('Descrição')).toBeRequired();
  });

  it('explains which fields are missing instead of submitting', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<CreateQuestModal opened onClose={vi.fn()} onSubmit={onSubmit} isLoading={false} />);

    expect(screen.getByRole('button', { name: 'Publicar missão' })).toBeEnabled();
    await user.type(screen.getByLabelText('Título da missão'), '   ');
    await user.click(screen.getByRole('button', { name: 'Publicar missão' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Título da missão')).toHaveAccessibleDescription('Informe o título da missão.');
    expect(screen.getByLabelText('Título da missão')).toBeInvalid();
    expect(screen.getByLabelText('Descrição')).toHaveAccessibleDescription('Informe a descrição da missão.');

    await user.type(screen.getByLabelText('Título da missão'), 'Enfrentar o dragão');
    expect(screen.getByLabelText('Título da missão')).not.toHaveAccessibleDescription();
  });

  it('submits the trimmed title and description, then clears the form on success', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(true);
    render(<CreateQuestModal opened onClose={vi.fn()} onSubmit={onSubmit} isLoading={false} />);

    await user.type(screen.getByLabelText('Título da missão'), '  Enfrentar o dragão  ');
    await user.type(screen.getByLabelText('Descrição'), '  Derrote a besta  ');
    await user.click(screen.getByRole('button', { name: 'Publicar missão' }));

    expect(onSubmit).toHaveBeenCalledWith({ title: 'Enfrentar o dragão', description: 'Derrote a besta' });
    expect(screen.getByLabelText('Título da missão')).toHaveValue('');
    expect(screen.getByLabelText('Descrição')).toHaveValue('');
  });

  it('keeps the form filled when the submission fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(false);
    render(<CreateQuestModal opened onClose={vi.fn()} onSubmit={onSubmit} isLoading={false} />);

    await user.type(screen.getByLabelText('Título da missão'), 'Enfrentar o dragão');
    await user.type(screen.getByLabelText('Descrição'), 'Derrote a besta');
    await user.click(screen.getByRole('button', { name: 'Publicar missão' }));

    expect(screen.getByLabelText('Título da missão')).toHaveValue('Enfrentar o dragão');
  });

  it('shows the error message when one is given', () => {
    render(
      <CreateQuestModal
        opened
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        isLoading={false}
        errorMessage="Falha ao publicar a missão"
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Falha ao publicar a missão');
  });
});
