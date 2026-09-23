import { TextAreaInput } from '@atomic/atm.text-input';
import { H3, InputLabel } from '@atomic/atm.typography';
import type * as React from 'react';

export default {
  title: 'Atomic/Atoms/TextInput',
};

interface TextInputStoryProps {
  onValueChange?: (value?: number | string | string[]) => void;
}

export const TextArea: React.FC<TextInputStoryProps> = () => {
  return (
    <div>
      <H3>Text area</H3>
      <InputLabel>Text area</InputLabel>
      <TextAreaInput placeholder="TextArea" />
    </div>
  );
};
