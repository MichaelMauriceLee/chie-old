/* eslint-disable import/no-unresolved */
import { AzureFunction, Context } from '@azure/functions';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import execute from '../execute';

const analysisResultsUrl = `${process.env.CV_BASE_URL}/vision/v3.2-preview.3/read/analyzeResults`;

const httpTrigger: AzureFunction = async (context: Context): Promise<void> => {
  await execute(async () => {
    if (!context.bindingData.analysisId) {
      throw new Error('Must include analysis id.');
    }
    const { data } = await axios.get(`${analysisResultsUrl}/${context.bindingData.analysisId}`, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.CV_KEY,
      },
    });
    return data;
  }, context, 'Get analysis results error.', 'Failed getting analysis results.');
};

export default httpTrigger;
