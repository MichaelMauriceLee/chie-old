import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { TranslateLineRequest, TranslateLineResponse } from '../models/Translation';
import { getTranslation, getTranslationToken } from '../services/agent';

const fetchTranslation = async (
  sentence: string,
  to: string,
  from?: string,
) => {
  try {
    const { token } = await getTranslationToken();
    const payload: TranslateLineRequest[] = [
      {
        Text: sentence,
      },
    ];
    const data = await getTranslation(payload, token, to, from);
    return data;
  } catch (err) {
    if (err.response) {
      throw err;
    } else {
      throw new Error('Failed to get translation');
    }
  }
};

const useTranslation = (
  sentence: string,
  to: string,
  from?: string,
  errorCallback?: (error: AxiosError) => void,
): UseQueryResult<TranslateLineResponse[], AxiosError> => useQuery(['translation', sentence],
  () => fetchTranslation(sentence, to, from),
  {
    enabled: false,
    onError: (error: AxiosError) => { if (errorCallback) { errorCallback(error); } },
    retry: (_, error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        return false;
      }
      return true;
    },
  });

export default useTranslation;
