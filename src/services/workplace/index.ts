import WorkplaceAuthService from "./auth";
import WorkplaceRoleService from "./role";

export default class WorkplaceService {
  auth = new WorkplaceAuthService();
  role = new WorkplaceRoleService();
}
