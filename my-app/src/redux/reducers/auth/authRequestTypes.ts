export type InitialStateType = {
  error: string | null | unknown;
  loading: boolean;
  isLogin: boolean;
  userLanguage: string;
};

export interface IncomeArgsType {
  username: string;
  password: string;
}
