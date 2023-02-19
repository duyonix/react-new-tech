const messages = {
  AUTH_ERROR:
    "Can't get your permission. Please contact IT Helpdesk for further support",
  LOGIN_SUCCESS: "Login success",
  LOGIN_ERROR: "Login failed, please try again !",
  SESSION_EXPIRE: "Your session has expired. Please login again.",
  PERMISSION_DENIED: "You don't have permission to do this action",
  TITLE_PERMISSION_DENIED: "Sorry, you are not authorized to access this page.",
  LEAVE: "Are you sure you want to leave? Unsaved changes may be lost",
  PAGE_NOT_FOUND: "Sorry, the page you looking for does not exist.",
  CREATE_SUCCESS: (text: string) => `Create ${text} successfully`,
  CREATE_FAILED: (text: string) => `Create ${text} failed`,
  EDIT_SUCCESS: (text: string) => `Edit ${text} successfully`,
  EDIT_FAILED: (text: string) => `Edit ${text} failed`,
  DELETE_SUCCESS: (text: string) => `Delete ${text} successfully`,
  DELETE_FAILED: (text: string) => `Delete ${text} failed`,
  IMPORT_SUCCESS: (text: string) => `Import ${text} successfully`,
  IMPORT_FAILED: (text: string) => `Import ${text} failed`,
  EXPORT_FAILED: (text: string) => `Export ${text} failed`,
  EXISTED: (text: string) => `${text} already exists`,
  NOT_EXIST: (text: string) => `This ${text} does not exist`,
  CONFIRM_DELETE: (text: string) => `Are you sure to delete this ${text}?`,
  GET_DETAIL_FAILED: (text: string) => `Get ${text} detail failed`
};

export default messages;
