import React from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import { merge } from 'lodash';
import { border, size, spacing, bg, text } from '@acm-homepage/theme-shortcut';

import Header from './component/Header';

import { mRV } from './util/theme';

/******************************************************************************
 * Set the page's content.
 *****************************************************************************/
export const title = (
  <React.Fragment>
    Soochow University
    <br />
    ACM Homepage
  </React.Fragment>
);

export const footer = <span>This is footer.</span>;

export const info = (
  <React.Fragment>
    <Header.Space>
      <Header>Infomation</Header>
    </Header.Space>
    <Header headnumber={4} sx={{ textAlign: 'left', py: '1rem' }}>
      Soochow University
    </Header>
    <div>
      Soochow University, also known as Suzhou University, is a public
      university in Suzhou (Soochow), China. Its root can be traced to the
      original Soochow University (東吳大學) founded by Methodists in 1900,
      which was later split and merged with a couple of institutions. It is part
      of the Double First Class University Plan held by the Ministry of
      Education for developing world-class universities. It only admits those
      who score at top 5% in the National College Entrance Examination of China,
      thus is regarded as a relatively selective university. The School of
      Humanities, School of Textile and Clothing Engineering, School of
      Chemistry, Chemical Engineering and Materials Science, and School of
      Medicine are the university's most distinguished schools.
    </div>
  </React.Fragment>
);

/******************************************************************************
 * The style object, or the function to get style object (cannot set as theme
 * neither cannot be a component).
 *****************************************************************************/
export const utilMainPart: ThemeUIStyleObject = merge(
  spacing({ m: { l: 'auto', r: 'auto' }, p: { l: '1rem', r: '1rem' } }),
  size({
    w: mRV({ _: '100%', lg: `${(100 * 10) / 12}%`, xl: `${(100 * 8) / 12}%` }),
  }),
);

export const boxSx = merge(
  border({ width: '2px', col: 'bg-6', radius: '0.25rem' }),
  bg({ col: 'bg-0' }),
  size({ w: { _: '36rem', max: '100%' } }),
  spacing({ p: '1rem' }),
  text({ col: 'bg-0' }),
);

/******************************************************************************
 * Others
 *****************************************************************************/
// After 100ms, we will try to preload some picute, etc. to get better feel.
export const preloadTime = 100;
