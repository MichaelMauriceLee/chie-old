// eslint-disable-next-line import/no-unresolved
import { Context } from '@azure/functions';

export const execute = async (
  callback: () => any,
  context: Context,
  logHeader: string,
  defaultErrorMessage: string,
) => {
  try {
    const data = await callback();
    context.res = {
      body: data,
    };
  } catch (err) {
    context.log(logHeader, err);
    if (err.response) {
      context.res = {
        status: err.response.status,
        body: err.response.data.message ?? err.response.data,
      };
    } else if (err.message) {
      context.res = {
        status: 400,
        body: err.message,
      };
    } else {
      context.res = {
        status: 500,
        body: defaultErrorMessage,
      };
    }
  }
};

export default execute;
