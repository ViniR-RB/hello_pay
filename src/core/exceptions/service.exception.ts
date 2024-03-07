export default class ServiceException implements Error {
  name: string;
  message: string;
  statusCode: number;
  constructor(message: string, statusCode?: number) {
    this.message = message;
    this.name = 'ServiceException';
    this.statusCode = statusCode || 500;
  }
}
