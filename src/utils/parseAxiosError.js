export function parseAxiosError(error) {
  try {
    const data = typeof error.response?.data === "string"
      ? JSON.parse(error.response.data)
      : error.response?.data;
    return data;
  } catch {
    return null;
  }
}
