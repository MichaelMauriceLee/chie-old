/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import axios from 'axios';

const analyzeImageUrl = `https://${process.env.CV_NAME}.cognitiveservices.azure.com/vision/v3.2/read/analyze?language=ja`;

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const buffer = Buffer.from(req.body.image.split(',')[1], 'base64');
  const { headers } = await axios.post(analyzeImageUrl, buffer, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.CV_KEY,
      'Content-Type': 'application/octet-stream',
    },
  });
  const readResultUrl = headers['operation-location'];
  context.res = {
    body: readResultUrl.split('/').pop(),
  };
};

export default httpTrigger;
