export default class TokenModel {
  accessToken: string;
  refreshToken: string;
  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
  toJSON(): { access_token: string; refresh_token: string } {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
    };
  }
}
