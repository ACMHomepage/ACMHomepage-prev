const toTagList = (tagList: string): string[] => {
  return tagList
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
};

export default toTagList;
