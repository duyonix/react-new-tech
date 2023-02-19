interface AuthState {
  isLogin: boolean;
  token: string;
  message: string;
  user: any;
  roles: any[];
  sidebar: any[];
}

interface DefaultState {
  loading: boolean;
  data: any;
  error: any;
}
