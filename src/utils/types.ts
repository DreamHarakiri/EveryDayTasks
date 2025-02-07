export type TUser = {
  email: string;
  name: string;
};

export type TAddMember = {
  email: string;
  project: string;
  isMember: boolean;
};

export type TGetMemberProject = {
  data: TAddMember;
  isMember?: boolean;
};

export interface IServerResponse {
  data: TAddMember;
  success: boolean;
}
