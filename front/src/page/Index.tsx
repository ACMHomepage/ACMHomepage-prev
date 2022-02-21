import React from 'react';
import { useNavigate } from 'react-router-dom';

import { title, utilMainPart } from '../config';
import { setBorder } from '../util/theme';

import News from '../component/News';
import Button, { buttonFlipStyle } from '../component/Button';
import Header from '../component/Header';

export default function Index() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div sx={{ ...utilMainPart }}>
        <Header.Space>
          <Header>{title}</Header>
          <Button
            onClick={() => navigate('info')}
            sx={{
              px: '2rem',
              fontSize: 'xl',
              height: '3rem',
              ...setBorder({ width: '2px', color: 'fg-0' }),
              ...buttonFlipStyle(),
            }}
          >
            More infomation
          </Button>
        </Header.Space>
      </div>
      <div sx={{ ...utilMainPart }}>
        <News />
      </div>
    </React.Fragment>
  );
}
