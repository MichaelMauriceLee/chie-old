/* eslint-disable import/no-unresolved */
import { AzureFunction, Context } from '@azure/functions';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import execute from '../execute';

const tokenUrl = `https://${process.env.TRANSLATION_REGION}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`;

const httpTrigger: AzureFunction = async (context: Context): Promise<void> => {
  await execute(async () => {
    const { data } = await axios.post(tokenUrl, null, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.TRANSLATION_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return { token: data, region: process.env.TRANSLATION_REGION };
  },
  context,
  'Get translation token error.',
  'Failed getting translation token.');
};

export default httpTrigger;
