import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { SearchResult } from '../models/SearchResult';
import { getSearchResults } from '../services/agent';

export const fetchSearchResults = async (
  word: string | null,
): Promise<SearchResult[]> => {
  try {
    const data = await getSearchResults(word ?? '');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response) {
      throw err;
    } else {
      throw new Error('Failed to get search results');
    }
  }
};

const useSearchResult = (
  searchWord: string,
  errorCallback?: (error: AxiosError) => void,
): UseQueryResult<SearchResult[], AxiosError> => useQuery(
  ['searchResults', searchWord],
  () => fetchSearchResults(searchWord),
  {
    enabled: false,
    onError: (error: AxiosError) => {
      if (errorCallback) {
        errorCallback(error);
      }
    },
    retry: (_, error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        return false;
      }
      return true;
    },
  },
);

export default useSearchResult;
