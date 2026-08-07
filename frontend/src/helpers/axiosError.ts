import axios from "axios";
import React from "react";
import type { ApiErrorResponse } from "../types/ApiErrorResponse";

export const handleAxiosErrors = ({
  requestError,
  setError,
  message,
}:{
  requestError: unknown;
  setError: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}) => {
  if (!axios.isAxiosError<ApiErrorResponse>(requestError)) {
    setError(message);
    return;
  }

  if (!requestError.response) {
    setError("Cannot connect to the server. Please try again later!");
    return;
  }
  setError(requestError.response.data.message || message);
};
