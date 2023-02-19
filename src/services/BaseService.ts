import axios from "axios";
import { checkExpire, getJSONFromBlob } from "@/utils";
import _ from "lodash";
import errorCodes from "@/constants/errorCodes";
import AuthService from "@/services/auth";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export default class BaseService {
  send(
    method: Method,
    url: string,
    headers: any = null,
    data: any = null,
    params: any = null,
    responseType: any = "json"
  ) {
    return axios({
      method,
      url,
      headers,
      data,
      params,
      responseType
    });
  }

  header() {
    let token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  headerWiki() {
    return { authorization: process.env.WIKI_API_KEY_AUTH };
  }

  headerWorkplace() {
    let tokenWorkplace = localStorage.getItem("workplace_token");
    return {
      Tenant: process.env.WORKPLACE_TENANT_KEY_AUTH,
      Authorization: tokenWorkplace ? `Bearer ${tokenWorkplace}` : ""
    };
  }

  workplaceErrorResponse(err: any) {
    if (err.response) {
      if (checkExpire(err.response.status)) {
        const authService = new AuthService();
        authService.logout().then(() => {
          window.location.href = "/login?expired=true";
        });
      } else if (
        _.get(err, "response.data.detail.code", "") ===
        errorCodes.WORKPLACE.ROLE.PERMISSION_DENIED
      ) {
        window.location.href = "/403";
      }
      let data = err.response?.data || {};
      const isBlobData =
        data instanceof Blob && data.type === "application/json";
      return isBlobData ? getJSONFromBlob(data) : data;
    }
    return err.message;
  }
}
