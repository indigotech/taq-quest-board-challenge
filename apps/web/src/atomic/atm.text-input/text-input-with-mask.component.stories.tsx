import { FaIcon } from '@atomic/atm.fa-icon';
import { TextFieldMasks, TextInput } from '@atomic/atm.text-input';
import { H3, InputLabel } from '@atomic/atm.typography';
import type * as React from 'react';

export default {
  title: 'Atomic/Atoms/TextInput',
  tags: ['text-input'],
  argTypes: {
    customMask: { control: { type: 'text' } },
  },
};

interface TextInputStoryProps {
  type?: 'email' | 'text' | 'number' | 'password';
  customMask?: string;
  onValueChange?: (value?: number | string | string[]) => void;
}

export const MaskedCPF: React.FC<TextInputStoryProps> = () => {
  return (
    <div>
      <H3>Masked (CPF)</H3>
      <InputLabel>Text input</InputLabel>
      <TextInput mask={TextFieldMasks.cpf()} />
    </div>
  );
};

export const WithIconAndMask: React.FC<TextInputStoryProps> = props => {
  return (
    <div>
      <H3>With icon and custom mask</H3>
      <InputLabel>Text input</InputLabel>
      <TextInput
        placeholder="ex: AAA-9999"
        mask={props.customMask ? TextFieldMasks.custom(props.customMask) : undefined}
        icon={<FaIcon.Search />}
      />
    </div>
  );
};

export const CustomMask: React.FC<TextInputStoryProps> = props => {
  return (
    <div>
      <H3>Custom mask</H3>
      <InputLabel>Text input</InputLabel>
      <TextInput
        placeholder="ex: AAA-9999"
        mask={props.customMask ? TextFieldMasks.custom(props.customMask) : undefined}
        type={props.type}
      />
    </div>
  );
};
