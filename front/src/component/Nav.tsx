import { Link } from 'react-router-dom';

import { utilMainPart } from '../config';
import { mRV, setColor, setBorder } from '../util/theme';

import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';
import LogButton from './LogButton';

export default function Nav() {
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
        <LogButton
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
}
