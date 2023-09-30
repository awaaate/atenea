export const EDITOR_WIDTH = {
  lg: 700,
  md: 500,
  sm: 300,
};
export const EDITOR_WIDTH_CLASSES = `sm:min-w-400px md:min-w-500px lg:min-w-700px`;
export const ENV =
  process.env.NODE_ENV === "production" ? "production" : "development";

export const API_URL =
  ENV === "development" ? "http://localhost:3000/api" : "/api";

export const APP_URL = ENV === "development" ? "http://localhost:3000" : "/";
