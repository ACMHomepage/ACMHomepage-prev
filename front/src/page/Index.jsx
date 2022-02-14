import React from 'react';

import { title } from '../config';
import { utilMainPart } from '../config';

import News from '../component/News';
import Button from '../component/Button';
import Header from '../component/Header';

function Headline({ title }) {
  return (
    <Header.Space>
      <Header>{title}</Header>
      <Button withBorder filp size="lg" sx={{ px: '2rem' }}>
        More infomation
      </Button>
    </Header.Space>
  );
}

export default function Index() {
  return (
    <React.Fragment>
      <div sx={{ ...utilMainPart }}>
        <Headline title={title} />
      </div>
      <div sx={{ ...utilMainPart }}>
        <News />
      </div>
    </React.Fragment>
  );
}
