import React from 'react';

import { useParams } from 'react-router-dom';
import { isUndefined } from 'lodash';
import { useEffect } from 'react';

import { useProfile } from '../api/auth';

import _404 from './404';

import styles from './styles/News.module.scss';
import styles2 from './styles/Profile.module.scss'
export const URL = '/profile';

export default () => {
  const {userId} = useParams();
  
  if(isUndefined(userId)){
    console.error('~userId is undefined');
    return <_404 />;
  }

  // Get the profiledata when it is mounted.
  const [getProfile, { loading, data, error }] = useProfile();
  useEffect(() => {
    getProfile(parseInt(userId));
  }, []);

  if (loading) return <div className={styles.wrapper}>Loading</div>;
  if (error) return <div className={styles.wrapper}>Error</div>;
  if (!data) return null;

  const profile_ = data.userById;
  //console.log(profile_);
  return (
    <>
      <div className={styles2.nickname}>
        <div>{'nickname: '+profile_.nickname}</div>
      </div>
      <div className={styles2.email}>
        <div>{'email: '+profile_.email}</div>
      </div>
    
   
      
    </>
  )
}