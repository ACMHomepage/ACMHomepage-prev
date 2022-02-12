import { utilMainPart } from '../config';
import { mRV } from '../util/theme';
import DarkToggle from './DarkToggle';
import Dropdown from './Dropdown';

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
        <span sx={{ fontWeight: 'bold', flex: 1 }}>ACM Homepage</span>
        <DarkToggle sx={{ display: mRV({ _: 'none', md: 'flex' }) }} />
        <Dropdown sx={{ display: mRV({ _: 'block', md: 'none' }) }} />
      </nav>
    </div>
  );
}
