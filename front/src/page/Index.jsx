import React, { useState, useEffect } from 'react';

import News from '../component/News';
import Button from '../component/Button';
import { title } from '../config';
import { mRV } from '../util/theme';
import { utilMainPart } from '../config';

function Headline({ title }) {
  return (
    <div
      sx={{
        py: mRV({ _: '6rem', sm: '8rem', md: '8rem' }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}
    >
      <h1
        sx={{
          textAlign: 'center',
          fontSize: mRV({ _: '4xl', md: '5xl', lg: '6xl' }),
          fontWeight: 'h1',
        }}
      >
        {title}
      </h1>
      <div>
        <Button withBorder filp size="lg" sx={{ width: '12rem' }}>
          More infomation
        </Button>
      </div>
    </div>
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
