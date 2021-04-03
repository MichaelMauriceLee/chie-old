/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import execute from '../execute';

const analyzeImageUrl = `${process.env.CV_BASE_URL}/vision/v3.2-preview.3/read/analyze?language=ja`;

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  await execute(async () => {
    const { headers } = await axios.post(analyzeImageUrl, req.body, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.CV_KEY,
        'Content-Type': 'application/octet-stream',
      },
    });

    const readResultUrl = headers['operation-location'];

    return readResultUrl.split('/').pop();
  }, context, 'Image analysis request failed.', 'Failed requesting image analysis.');
};

export default httpTrigger;
