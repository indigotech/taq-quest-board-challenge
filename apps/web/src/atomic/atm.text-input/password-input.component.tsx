import { FaIcon } from '@atomic/atm.fa-icon';
import React from 'react';

import { TextInput, type TextInputProps } from './text-input.component';

export interface PasswordInputProps extends Omit<TextInputProps, 'type' | 'autoComplete' | 'rightButton'> {}

export const PasswordInput = React.forwardRef(
  ({ ...props }: PasswordInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const computedRightButton = {
      icon: showPassword ? <FaIcon.PasswordHide /> : <FaIcon.PasswordShow />,
      onClick: () => setShowPassword(prev => !prev),
      ariaLabel: showPassword ? 'Ocultar senha' : 'Mostrar senha',
    };

    return (
      <TextInput
        {...props}
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        autoComplete={'off'}
        rightButton={computedRightButton}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
