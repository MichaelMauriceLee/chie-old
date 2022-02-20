/* eslint-disable import/no-unresolved */
import { AzureFunction, Context } from '@azure/functions';
import axios from 'axios';

const analysisResultsUrl = `https://${process.env.CV_NAME}.cognitiveservices.azure.com/vision/v3.2/read/analyzeResults`;

const httpTrigger: AzureFunction = async (context: Context): Promise<void> => {
  if (!context.bindingData.analysisId) {
    throw new Error('Must include analysis id.');
  }
  const { data } = await axios.get(`${analysisResultsUrl}/${context.bindingData.analysisId}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.CV_KEY,
    },
  });
  context.res = {
    body: data,
  };
};

export default httpTrigger;
