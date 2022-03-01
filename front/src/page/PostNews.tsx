import { utilMainPart } from '../config';

import Header from '../component/Header';

export const URL = '/postnews';

export default () => {
  return (
    <div sx={{ ...utilMainPart }}>
      <Header.Space>
        <Header>Post News</Header>
      </Header.Space>
      Post News
    </div>
  );
};
