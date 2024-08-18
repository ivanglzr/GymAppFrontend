export class HttpStatusError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpStatusError";
  }
}
