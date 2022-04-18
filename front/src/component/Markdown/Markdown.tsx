import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';

import styles from './styles/Markdown.module.scss';

interface MarkdownProps {
  children: string;
  className: string;
}

const Markdown = ({ children, className }: MarkdownProps) => {
  return (
    <div className={classNames(className, styles.markdown)}>
      <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default Markdown;
