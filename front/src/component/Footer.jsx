import React from 'react';

import { footer } from '../config';

import styles from './styles/Footer.module.scss';

export default function App() {
  return (
    <React.Fragment>
      <div className={styles.Space} />
      <div className={styles.Footer}>
        <div className={styles.Main}>{footer}</div>
      </div>
    </React.Fragment>
  );
}
