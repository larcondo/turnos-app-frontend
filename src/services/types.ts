import { UserInformation } from "@/types";

export type LoginRequestError = {
  field: string;
  message: string;
}

export interface LoginResponse {
  data?: UserInformation;
  requestError?: LoginRequestError;
  error?: unknown;
}