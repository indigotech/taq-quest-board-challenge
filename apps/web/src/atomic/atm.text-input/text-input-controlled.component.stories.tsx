import { TextInput } from '@atomic/atm.text-input';
import { H3, InputLabel } from '@atomic/atm.typography';
import type * as React from 'react';

export default {
  title: 'Atomic/Atoms/TextInput',
  tags: ['text-input'],
  argTypes: {
    type: {
      options: ['email', 'text', 'number', 'password'],
      control: { type: 'select' },
    },
  },
};

interface TextFieldStoryProps {
  type?: 'email' | 'text' | 'number' | 'password';
  value?: string;
  customMask?: string;
  onValueChange?: (value?: number | string | string[]) => void;
}

export const Controlled: React.FC<TextFieldStoryProps> = props => {
  return (
    <div>
      <H3>Controlled</H3>
      <InputLabel>Text input</InputLabel>
      <TextInput type={props.type ?? 'text'} />
    </div>
  );
};
