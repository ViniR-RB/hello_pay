export default class RepositoryException implements Error {
  name: string;
  message: string;
  statusCode: number;
  constructor(message: string, statusCode?: number) {
    this.message = message;
    this.name = 'RepositoryException';
    this.statusCode = statusCode || 500;
  }
}
