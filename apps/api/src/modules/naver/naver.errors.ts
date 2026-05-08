export class NaverConfigurationError extends Error {}
export class NaverValidationError extends Error {}
export class NaverTimeoutError extends Error {}
export class NaverApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }
}
export class NaverNetworkError extends Error {}
export class NaverMappingError extends Error {}
