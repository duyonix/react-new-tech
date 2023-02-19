import BaseService from "../BaseService";
const PREFIX = process.env.WORKPLACE_SERVER + "/v1/authencation";

export default class WorkplaceAuthService extends BaseService {
  async loginWorkplace(azureToken: string) {
    try {
      const res = await super.send(
        "POST",
        `${PREFIX}/login`,
        super.headerWorkplace(),
        {
          method: "tokenAzure",
          azureToken: azureToken
        }
      );
      return res.data;
    } catch (err: any) {
      return err?.response.data;
    }
  }
}
