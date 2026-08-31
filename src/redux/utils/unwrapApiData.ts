/** Backend cap/corporate/fraud routes wrap payloads in { success, data }; dashboard routes often do not. */
export function unwrapApiData<T>(response: T | { data?: T }): T {
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: T }).data;
  }
  return response as T;
}
