import BaseService from "../BaseService";
const PREFIX = process.env.MYVNG_SERVER + "/passport";

export default class AuthService extends BaseService {
  async login(data: any) {
    try {
      const res = await super.send("POST", `${PREFIX}/login`, null, data);
      return res?.data || res;
    } catch (err: any) {
      return err?.response.data;
    }
  }

  async loginCode(data: any) {
    try {
      const res = await super.send(
        "POST",
        `${PREFIX}/login-by-office-with-code-admin`,
        {
          code: process.env.AZURE_CALLBACK_URL || ""
        },
        data
      );
      return res?.data || res;
    } catch (err: any) {
      return err?.response.data;
    }
  }

  async logout() {
    try {
      const res = await super.send("DELETE", `${PREFIX}/logout`, null, null, {
        tokenId: localStorage.getItem("access_token")
      });
      if (res?.data) {
        localStorage.clear();
      }
    } catch (err: any) {
      return err?.response.data;
    }
  }

  async getUser(data: any) {
    try {
      const uri =
        process.env.MYVNG_SERVER + `/v1/users/profile/basic/get-by-id/${data}`;
      const res = await super.send("GET", uri, super.header());
      return res?.data || res;
    } catch (err: any) {
      return err?.response.data;
    }
  }

  async getRoleUser() {
    try {
      const uri = process.env.MYVNG_SERVER + "/v1/role/get-user-role";
      const res = await super.send("GET", uri, super.header());
      return res?.data || res;
    } catch (err: any) {
      return err?.response.data;
    }
  }
}
