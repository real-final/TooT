export interface IuserInfo {
  bankruptcyNo: number;
  cash: number;
  deleteAt: null | string; // 또는 deleteAt: any;로 설정할 수 있습니다.
  joinAt: [number, number, number, number, number, number];
  lastQuizDate: null | string; // 또는 lastQuizDate: any;로 설정할 수 있습니다.
  name: string;
  profileImage: string;
  providerId: string;
  resignNo: number;
  seedMoney: number;
}

export interface Idata {
  success?: boolean;
  data?: IuserInfo;
  error?: null | string; // 에러 메시지의 형식을 모르므로 null 또는 문자열로 추정합니다.
}

export interface IuserAuthContext {
  accessToken?: string;
  userInfo?: IuserInfo;
}

 