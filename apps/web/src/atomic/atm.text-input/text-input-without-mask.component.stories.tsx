import { FaIcon } from '@atomic/atm.fa-icon';
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

interface TextInputStoryProps {
  type?: 'email' | 'text' | 'number' | 'password';
  onValueChange?: (value: number | string | string[]) => void;
}

export const WithoutMask: React.FC<TextInputStoryProps> = props => {
  return (
    <div>
      <H3>Without mask</H3>
      <InputLabel>Text input</InputLabel>
      <TextInput type={props.type ?? 'text'} />
    </div>
  );
};

export const WithIconAndWithoutMask: React.FC<TextInputStoryProps> = props => {
  return (
    <div>
      <H3>With icon without mask</H3>
      <InputLabel>Text input</InputLabel>
      <TextInput type={props.type ?? 'text'} icon={<FaIcon.Home />} />
    </div>
  );
};
