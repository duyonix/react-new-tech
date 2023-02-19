export const credentials = {
  tenantId: process.env.AZURE_TANENT,
  clientId: process.env.AZURE_CLIENT_ID,
  redirectUri: process.env.AZURE_CALLBACK_URL,
  scope: process.env.AZURE_CLIENT_SCOPE,
  authority: process.env.AZURE_AUTH
};
const tenantId = credentials.tenantId || "common";

export default class AzureInstance {
  private authority: string;
  private authorizeEndpoint: string;
  private redirectUri: string | undefined;
  private tokenEndpoint: string;
  private profileUri: string;
  private clientId: string | undefined;
  private scope: string | undefined;
  private token: {};
  private state: number;

  constructor() {
    this.authority = `https://login.microsoftonline.com/${tenantId}`;
    this.authorizeEndpoint = "/oauth2/v2.0/authorize";
    this.redirectUri = credentials.redirectUri;
    this.tokenEndpoint = "/oauth2/v2.0/token";
    this.profileUri = "https://graph.microsoft.com/v1.0/me";
    this.clientId = credentials.clientId;
    this.scope = credentials.scope;
    this.token = {};
    this.state = 1;
  }

  // Login by AzureAD
  public async loginByAzureAD() {
    const loginAADUrl = this.getAuthUrl();
    window.location.href = loginAADUrl;
  }

  public getAuthUrl() {
    return (
      this.authority +
      this.authorizeEndpoint +
      "?client_id=" +
      this.clientId +
      "&response_type=code" +
      "&redirect_uri=" +
      this.redirectUri +
      "&scope=" +
      this.scope +
      "&response_mode=query" +
      "&state=" +
      this.state
    );
  }
}
