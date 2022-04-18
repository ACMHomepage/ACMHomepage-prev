import { NavLink } from 'react-router-dom';
import { ReactComponent as ACMHomepageSVG } from './asserts/ACMHomepage.svg';
import styles from './styles/Logo.module.scss';

const Logo = () => {
  return (
    <NavLink to="/" className={styles.logo}>
      <ACMHomepageSVG className={styles.img} />
    </NavLink>
  );
};

export default Logo;
