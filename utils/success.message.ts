export type SuccessResponse = {
  data: any;
  statusCode: number;
  success: boolean;
  message: string;
};

export const successResponse = (
  response: any,
  status: number,
  message: string,
): SuccessResponse => {
  return {
    data: response === undefined ? [] : response,
    statusCode: status,
    success: true,
    message: message,
  };
};
