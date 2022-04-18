import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { size, bg, flexbox } from '@acm-homepage/theme-shortcut';
import { merge } from 'lodash';

import { URL as postNewsUrl } from '../../page/PostNews';

import Button from './../Button';

const PostNews = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={merge(
        size({ h: '2rem' }),
        bg({ col: { _: 'bg-2', hv: 'bg-4' } }),
        flexbox({
          dir: 'row',
          gap: '0.25rem',
          place: { content: 'center', items: 'center' },
        }),
      )}
      className={className}
      onClick={() => navigate(postNewsUrl)}
    >
      <Send size={16} />
      Post News
    </Button>
  );
};

export default PostNews;
