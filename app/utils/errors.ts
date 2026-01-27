/**
 * Create a custom error for the application
 */
export function createAppError(
  message: string,
  statusCode: number = 404,
) {
  const fatal = import.meta.client

  return createError({ statusCode, message, fatal })
}
