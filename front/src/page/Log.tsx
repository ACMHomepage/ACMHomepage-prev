import React from 'react';

import { utilMainPart } from '../config';
import Header from '../component/Header';
import { setBorder, setFlex } from '../util/theme';

interface InputProps {
  title: React.ReactNode;
}

const Input = ({ title }: InputProps) => {
  return (
    <label>
      <div sx={{ fontSize: 'xs' }}>{title}</div>
      <input
        sx={{
          bg: 'secondaryBackground',
          fontSize: '2xl',
          height: '3rem',
          width: '100%',
          padding: '0.5rem',
          color: 'text',
          ...setBorder({ color: 'text' }),
        }}
      />
    </label>
  );
};

export default () => {
  return (
    // <div sx={{ ...utilMainPart, ...setFlex({ center: true }) }}>
    <Header.Space sx={{ ...utilMainPart }}>
      <div
        sx={{
          bg: 'secondaryBackground',
          width: '36rem',
          maxWidth: '100%',
          p: '1rem',
          ...setBorder({ width: '0px' }),
          ...setFlex({ gap: '1rem', direction: 'column' }),
        }}
      >
        <div sx={{ textAlign: 'center', fontSize: '2xl' }}>ACM Homepage</div>
        <Input title="User name" />
        <Input title="Password" />
      </div>
    </Header.Space>
    // </div>
  );
};
