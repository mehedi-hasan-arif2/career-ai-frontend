import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}
