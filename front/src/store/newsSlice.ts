import { useLazyQuery, useMutation, gql } from '@apollo/client';

/******************************************************************************
 * Post news
 *****************************************************************************/

const CREATE_NEWS = gql`
  # The image should be a base64 data string.
  mutation CreateNews($title: String!, $imageUrl: String!, $content: String!) {
    createNews(title: $title, imageUrl: $imageUrl, content: $content) {
      id
    }
  }
`;

export interface CreateNewsData {
  createNews: {
    id: number;
  };
}

export interface CreateNewsVars {
  title: string;
  imageUrl: string;
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
    imageUrl: string,
    content: string,
  ) => {
    createNews({ variables: { title, imageUrl, content } });
  };

  return [createNewsWithVars, state] as [
    typeof createNewsWithVars,
    typeof state,
  ];
};

/******************************************************************************
 * Get news of a specific id.
 *****************************************************************************/

const GET_NEWS = gql`
  query GetNews($id: Int) {
    getNews(id: $id) {
      title
      content
      imageUrl
    }
  }
`;

export interface GetNewsData {
  getNews: {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
  }[];
}

export interface GetNewsVars {
  id: number;
}

/**
 * A hook to get news of a specific id. It will return a tuple with two element:
 * - A function to get news.
 * - A state about the process of creating news.
 */
export const useGetNews = () => {
  const [getNews, state] = useLazyQuery<GetNewsData, GetNewsVars>(GET_NEWS);

  const getNewsWithVars = (id: number) => {
    getNews({ variables: { id } });
  };

  return [getNewsWithVars, state] as [typeof getNewsWithVars, typeof state];
};

/******************************************************************************
 * Get news list.
 *****************************************************************************/

const GET_NEWS_LIST = gql`
  query GetNews {
    getNews {
      id
      title
      imageUrl
      summary
    }
  }
`;

export interface GetNewsListData {
  getNews: {
    id: number;
    title: string;
    imageUrl: string;
    summary: string;
  }[];
}

export interface GetNewsListVars {}

/**
 * A hook to get news list. It will return a tuple with two element:
 * - A function to get news list.
 * - A state about the process of creating news.
 */
export const useGetNewsList = () => {
  const [getNewsList, state] = useLazyQuery<GetNewsListData, GetNewsListVars>(
    GET_NEWS_LIST,
  );
  const getNewsListWithVars = () => {
    console.log('before', state);
    getNewsList();
    console.log('after', state);
  };
  return [getNewsListWithVars, state] as [
    typeof getNewsListWithVars,
    typeof state,
  ];
};
