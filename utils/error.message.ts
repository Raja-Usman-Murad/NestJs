export type ErrorResponse = {
  statusCode: number;
  success: boolean;
  message: string;
};

export const errorResponse = (
  status: number,
  message: string,
): ErrorResponse => {
  return {
    statusCode: status,
    success: false,
    message: message,
  };
};
