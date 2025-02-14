export interface AddTokenResponse {
  type: 'addTokenResponse';
  message: string;
}

export interface GetTokenResponse {
  type: 'getTokenResponse';
  token: string;
}
