import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { utilMainPart } from '../config';
import { mRV, setColor, setBorder } from '../util/theme';

import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';
import SignButton, { SignButtonPropType } from './SignButton';

const GET_USER = gql`
  query CurrentUser {
    currentUser {
      name
    }
  }
`;

/**
 * Nav. A helper bar over **all** pages.
 */
export default () => {
  const { loading, error, data } = useQuery(GET_USER);

  return (
    <div
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        bg: 'secondaryBackground',
        zIndex: 50,
      }}
    >
      <nav
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& > * + *': { marginLeft: '1rem' },
          py: '0.75rem',
          height: '3rem',
          ...utilMainPart,
        }}
      >
        <Link to="/" sx={{ fontWeight: 'bold', flex: 1 }}>
          ACM Homepage
        </Link>
        <DarkToggle
          showText={false}
          sx={{ display: mRV({ _: 'none', md: 'flex' }) }}
        />
        <SignButton
          type={
            data ? SignButtonPropType.SignOut : SignButtonPropType.SignInOrUp
          }
          sx={{
            display: mRV({ _: 'none', md: 'flex' }),
            height: '2rem',
            ...setColor({ bg: 'bg-2', hover: { bg: 'bg-4' } }),
            ...setBorder({ color: 'bg-6', width: '2px' }),
          }}
        />
        <Dropdown sx={{ display: mRV({ _: 'block', md: 'none' }) }} />
      </nav>
    </div>
  );
};
