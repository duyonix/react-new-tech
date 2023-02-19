import BaseService from "../BaseService";
const PREFIX = process.env.WORKPLACE_SERVER + "/v1/roles";

export default class WorkplaceRoleService extends BaseService {
  async getViewModules(params: any) {
    try {
      const res = await super.send(
        "GET",
        `${PREFIX}/view-module`,
        super.headerWorkplace(),
        null,
        params
      );
      return res.data;
    } catch (err: any) {
      return super.workplaceErrorResponse(err);
    }
  }

  async getRolePermissions() {
    try {
      const res = await super.send(
        "GET",
        `${PREFIX}/role-permission`,
        super.headerWorkplace()
      );
      return res.data;
    } catch (err: any) {
      return super.workplaceErrorResponse(err);
    }
  }
}
