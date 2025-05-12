'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="d0acc4aaacaa4d17cc10959983f4f85ab6d1ab93"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
