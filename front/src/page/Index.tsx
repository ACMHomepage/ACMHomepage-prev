import React from 'react';
import { useNavigate } from 'react-router-dom';
import { merge } from 'lodash';
import { border, size, spacing, font } from '@acm-homepage/theme-shortcut';

import { title, utilMainPart } from '../config';

import News from '../component/News';
import Button, { buttonFlipStyle } from '../component/Button';
import Header from '../component/Header';

export default function Index() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div sx={utilMainPart}>
        <Header.Space>
          <Header>{title}</Header>
          <Button
            onClick={() => navigate('info')}
            sx={merge(
              spacing({ p: { l: '2rem', r: '2rem' } }),
              font({ size: 'xl' }),
              size({ h: '3rem' }),
              border({ width: '2px', col: 'fg-0' }),
              buttonFlipStyle(),
            )}
          >
            More infomation
          </Button>
        </Header.Space>
      </div>
      <div sx={utilMainPart}>
        <News />
      </div>
    </React.Fragment>
  );
}
