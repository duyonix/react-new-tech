import { put, call, takeLatest, all } from "redux-saga/effects";
import AuthService from "@/services/auth";
import WorkplaceService from "@/services/workplace";
import { privateRoutes } from "@/routes/config";
import { toast } from "react-toastify";
import { workplaceRolePermissions } from "@/data/rolePermission";
import { authActions } from "./auth.slice";
import messages from "@/constants/messages";
import _ from "lodash";

type RoleApp = {
  app: string;
  feature: string;
  subRoles?: any[];
};

type MultiLevelRole = {
  name: string;
  action: any;
  rolePermissions: {};
};

function* getPayloadData(
  allRoles: RoleApp[],
  multiLevelRoles: MultiLevelRole[]
) {
  const roles = [...allRoles];
  const globalRole = allRoles.find(role => role.app === "Global");
  const menu = globalRole
    ? _.cloneDeep(privateRoutes)
    : privateRoutes.filter(route =>
        allRoles.find(role => role.app === route.role)
      );

  const filterRoles = globalRole
    ? [...multiLevelRoles]
    : multiLevelRoles.filter(item =>
        allRoles.find(role => role.app === item.name)
      );
  const rawMenu = yield all(filterRoles.map(role => call(role.action)));

  const filterMenu = rawMenu.map((role: any, index: number) => {
    if (role.data) {
      let modulesCode = Object.keys(role.data);
      let modules = modulesCode.map(module => ({
        app: filterRoles[index].rolePermissions[module],
        feature: role.data[module]
      }));
      return {
        name: filterRoles[index].name,
        modules
      };
    }
    return {
      name: filterRoles[index].name,
      modules: []
    };
  });

  filterMenu.forEach((item: any) => {
    let idx = roles.findIndex(role => role.app === item.name);
    if (idx !== -1) {
      roles[idx].subRoles = item.modules || [];
    } else if (globalRole) {
      roles.push({
        app: item.name,
        feature: globalRole.feature,
        subRoles: item.modules || []
      });
    }
  });

  menu.forEach(menuItem => {
    let existMenu = filterMenu.find((menu: any) => menu.name === menuItem.role);
    if (existMenu) {
      menuItem.subMenu = menuItem.subMenu.filter(item =>
        existMenu.modules.find((module: any) => module.app === item.title)
      );
    }
  });
  return {
    roles,
    sidebar: menu
  };
}

function* getRoles() {
  const authService = new AuthService();
  const roleUser = yield call(authService.getRoleUser);
  if (!roleUser || roleUser.error) {
    yield call(authService.logout);
    let message = roleUser ? roleUser.error.messageEN : messages.AUTH_ERROR;
    yield put(authActions.loginError({ message }));
  } else {
    const roles: RoleApp[] = roleUser.data.apps.map((item: any) => ({
      app: item.app,
      feature: item.feature
    }));

    const workplaceService = new WorkplaceService();
    // BE must have api to get role inside each multi level roles
    const multiLevelRoles: MultiLevelRole[] = [
      {
        name: "Workplace",
        action: workplaceService.role.getRolePermissions,
        rolePermissions: workplaceRolePermissions
      }
    ];
    const payloadData = yield call(getPayloadData, roles, multiLevelRoles);
    yield put(authActions.getRolesSuccess(payloadData));

    const user = yield call(
      authService.getUser,
      localStorage.getItem("userId")
    );
    if (user) {
      yield put(authActions.getUserSuccess({ user: user.data }));
      yield put(authActions.loginSuccess());
    } else {
      yield call(authService.logout);
    }
  }
}

function* login(action: any) {
  const authService = new AuthService();
  const res = action.payload.values.uname
    ? yield call(authService.login, action.payload.values)
    : yield call(authService.loginCode, { code: action.payload.values });

  if (res.error) {
    yield put(authActions.loginError({ message: messages.LOGIN_ERROR }));
  } else {
    const workplaceService = new WorkplaceService();
    const resWorkplace = yield call(
      workplaceService.auth.loginWorkplace,
      res.data.tokenItem.azureToken
    );
    if (resWorkplace.code === 200) {
      localStorage.setItem("access_token", res.data.tokenId);
      localStorage.setItem("workplace_token", resWorkplace.data.access_token);
      localStorage.setItem("userId", res.data.tokenItem.userId);
      yield call(getRoles);
      if (localStorage.getItem("access_token")) {
        toast.success(messages.LOGIN_SUCCESS);
      }
    } else {
      yield put(authActions.loginError({ message: messages.LOGIN_ERROR }));
    }
  }
}

export function* authSaga() {
  yield takeLatest(authActions.login.type, login);
  yield takeLatest(authActions.getRoles.type, getRoles);
}
