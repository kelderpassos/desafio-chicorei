export default class RequestError extends Error {
  readonly statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }
}
