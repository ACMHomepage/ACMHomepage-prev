import React from 'react';
import { useNavigate } from 'react-router-dom';

import { title, utilMainPart } from '../config';

import News from '../component/News';
import Button from '../component/Button';
import Header from '../component/Header';

export default function Index() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div sx={{ ...utilMainPart }}>
        <Header.Space>
          <Header>{title}</Header>
          <Button withBorder filp size="lg" sx={{ px: '2rem' }} onClick={() => navigate('info')}>
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
