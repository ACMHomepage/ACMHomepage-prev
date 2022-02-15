import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

import { utilMainPart } from '../config';
import { mRV } from '../util/theme';

import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';
import Button from './Button';

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
        <Button
          withBorder
          bg="secondaryBackground"
          sx={{ gap: '0.25rem', display: mRV({ _: 'none', md: 'flex' }) }}
        >
          <LogIn size={16} />
          Log in / Log on
        </Button>
        <Dropdown sx={{ display: mRV({ _: 'block', md: 'none' }) }} />
      </nav>
    </div>
  );
}
