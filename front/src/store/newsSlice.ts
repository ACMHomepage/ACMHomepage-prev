import { useLazyQuery, useMutation, gql } from '@apollo/client';

/******************************************************************************
 * Post news
 *****************************************************************************/

const CREATE_NEWS = gql`
  # The image should be a base64 data string.
  mutation CreateNews($title: String!, $image_uri: String!, $content: String!) {
    news(title: $title, image_uri: $image_uri, content: $content) {
      id
    }
  }
`;

export interface CreateNewsData {
  news: {
    id: number;
  };
}

export interface CreateNewsVars {
  title: string;
  image_uri: string;
  content: string;
}

/**
 * A hook to create news. It will return a tuple with two element:
 * - A function to crate news.
 * - A state about the process of creating news.
 */
export const useCreateNews = () => {
  const [createNews, state] = useMutation<CreateNewsData, CreateNewsVars>(
    CREATE_NEWS,
  );

  const createNewsWithVars = (
    title: string,
    image_uri: string,
    content: string,
  ) => {
    console.log({title, image_uri, content});
    createNews({ variables: { title, image_uri, content } });
  };

  return [createNewsWithVars, state] as [
    typeof createNewsWithVars,
    typeof state,
  ];
};
