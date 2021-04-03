/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import execute from '../execute';

const jishoSearchWordBaseUrl = `${process.env.JISHO_BASE_URL}/search/words?keyword=`;

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  await execute(async () => {
    const keyword = decodeURIComponent(req.query.keyword ?? '');
    if (!req.query.keyword) {
      throw new Error('Must send a keyword');
    }
    const url = jishoSearchWordBaseUrl + encodeURIComponent(keyword);
    const { data } = await axios.get(url);
    return data;
  }, context, 'Jisho error.', 'Failed searching for dictionary entries.');
};

export default httpTrigger;
