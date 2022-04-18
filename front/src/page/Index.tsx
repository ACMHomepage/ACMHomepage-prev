import React from 'react';
import { useNavigate } from 'react-router-dom';

import { title } from '../config';

import News from '../component/News/News';

import styles from './styles/Index.module.scss';

export default function Index() {
  const navigate = useNavigate();

  const goto_info_page = () => navigate('info');

  return (
    <React.Fragment>
      <div className={styles.header_wrapper}>
        <h1 className={styles.header}>{title}</h1>
        <button onClick={goto_info_page} className={styles.info_button}>
          More infomation
        </button>
      </div>
      <h2 className={styles.news_title}>News of ACM</h2>
      <div className={styles.news_wrapper}>
        <News />
      </div>
    </React.Fragment>
  );
}
