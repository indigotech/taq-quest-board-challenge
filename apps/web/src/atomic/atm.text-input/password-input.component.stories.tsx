import { PasswordInput } from '@atomic/atm.text-input';
import { H3, InputLabel } from '@atomic/atm.typography';
import type * as React from 'react';

export default {
  title: 'Atomic/Atoms/PasswordInput',
  tags: ['text-input', 'password-input'],
};

export const Basic: React.FC = () => {
  return (
    <div>
      <H3>Password input</H3>
      <InputLabel>Senha</InputLabel>
      <PasswordInput />
    </div>
  );
};
