/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import axios from 'axios';

const jishoSearchWordBaseUrl = 'https://jisho.org/api/v1/search/words?keyword=';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const keyword = decodeURIComponent(req.query.keyword ?? '');
  if (!req.query.keyword) {
    throw new Error('Must send a keyword');
  }
  const url = jishoSearchWordBaseUrl + encodeURIComponent(keyword);
  const { data } = await axios.get(url);
  context.res = {
    body: data,
  };
};

export default httpTrigger;
