import styles from './styles/TagList.module.scss';

interface TagListProps {
  tagList: string[];
}

export default (props: TagListProps) => {
  const { tagList } = props;

  return (
    <div className={styles.tagList}>
      {tagList.map((tag, index) => (
        <span className={styles.tag} key={index}>
          {tag}
        </span>
      ))}
    </div>
  );
};
