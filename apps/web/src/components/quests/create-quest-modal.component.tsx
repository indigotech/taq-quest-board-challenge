import { Button } from '@atomic/atm.button';
import { TextAreaInput, TextInput } from '@atomic/atm.text-input';
import { InputLabel } from '@atomic/atm.typography';
import { Col, Grid } from '@atomic/obj.grid';
import { Modal } from '@atomic/obj.modal';
import type { QuestInput } from '@domain/model/quest.model';
import { type FormEvent, useState } from 'react';

const TITLE_MAX_LENGTH = 200;
const DESCRIPTION_MAX_LENGTH = 5000;

interface CreateQuestModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (input: QuestInput) => Promise<boolean>;
  isLoading: boolean;
  errorMessage?: string | null;
}

export function CreateQuestModal(props: CreateQuestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const canSubmit = title.trim().length > 0 && description.trim().length > 0 && !props.isLoading;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    const succeeded = await props.onSubmit({ title: title.trim(), description: description.trim() });
    if (succeeded) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Modal opened={props.opened} onClose={props.onClose} title="Nova missão" small>
      <form onSubmit={handleSubmit}>
        <Grid>
          <Col sm={12} className="mb-md">
            <InputLabel htmlFor="quest-title">Título da missão</InputLabel>
            <TextInput
              id="quest-title"
              value={title}
              onChange={eventOrValue =>
                setTitle(typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value)
              }
              maxLength={TITLE_MAX_LENGTH}
              placeholder="Enfrentar o dragão"
            />
          </Col>
          <Col sm={12} className="mb-md">
            <InputLabel htmlFor="quest-description">Descrição</InputLabel>
            <TextAreaInput
              id="quest-description"
              value={description}
              onChange={event => setDescription(event.target.value)}
              maxLength={DESCRIPTION_MAX_LENGTH}
              rows={4}
              placeholder="Derrote a fera nas montanhas ao norte e traga prova da vitória."
            />
          </Col>
          <Col sm={12}>
            <Button type="submit" variant="cta" expanded disabled={!canSubmit} loading={props.isLoading}>
              Publicar missão
            </Button>
          </Col>
          {props.errorMessage && (
            <Col sm={12} className="mt-sm">
              <p role="alert" className="text-feedback-danger text-sm">
                {props.errorMessage}
              </p>
            </Col>
          )}
        </Grid>
      </form>
    </Modal>
  );
}
