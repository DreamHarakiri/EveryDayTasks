export type TUser = {
  email: string;
  name: string;
};

export type TAddMember = {
  email: string;
  project: string;
  isMember: boolean; // Добавляем isMember сюда, если он должен быть частью объекта
};

export type TGetMemberProject = {
  data: TAddMember;
  isMember?: boolean;
};

export interface IServerResponse {
  data: TAddMember;
  success: boolean;
}
