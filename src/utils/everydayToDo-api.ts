import { IServerResponse, TUser } from '@utils-types';
import { getCookie, setCookie } from './cookie';
import { IProjectList, TProjectList } from '../service/slices/project.slice';
import { ITodo, TListTodo } from '../service/slices/todo.slice';
import { ITask, TListTask } from '../service/slices/task.slice';
import { ICheckedTask } from '../service/Asyncs/task';
import { IComments, TComments } from '../service/slices/comments.slice';

const URL = 'http://192.168.0.3:3334';

export type TLoginData = {
  email: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

type TServerResponse<T> = {
  success: boolean;
} & T;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const loginUserApi = async (
  data: TLoginData
): Promise<TAuthResponse> => {
  //console.log('url' + URL);

  const response = await fetch(`${URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

  const responseData = await checkResponse<TAuthResponse>(response);
  if (responseData?.success) {
    console.log(responseData);

    return responseData;
  }
  return Promise.reject(responseData);
};

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export type TAddProject = TServerResponse<{
  project: TProjectList[];
}>;

export type TListData = {
  todoList: TListTodo[];
};

export type TTaskListData = {
  taskList: TListTask[];
};

export type TProjectData = {
  id: string;
  name: string;
  owner?: string;
  member?: string;
};

export const createTodoData = async (data: TListTodo): Promise<ITodo> => {
  const response = await fetch(`${URL}/api/todo/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

  const responseData: TListTodo = await data;

  return await response.json();
};

export const fetchGetTodoData = async (
  projectId: string
): Promise<TListData> => {
  const response = await fetch(`${URL}/api/todo/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ projectId })
  });
  return await response.json();
};

export const fetchProjects = async (email: string): Promise<TAddProject> => {
  const response = await fetch(`${URL}/api/projects/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ email })
  });

  return await response.json();
};

export const addMemberInProject = async (
  email: string,
  project: string
): Promise<TAddProject> => {
  const response = await fetch(`${URL}/api/projects/addMemeber`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ email, project })
  });
  return await response.json();
};

export const getMemberInProject = async (data: {
  email: string;
  project: string;
}): Promise<IServerResponse> => {
  try {
    const response = await fetch(`${URL}/api/projects/getMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ data })
    });

    const responseData: IServerResponse = await response.json();
    //console.log(responseData);

    return responseData;
  } catch (error) {
    throw new Error('Error getting member: ' + error);
  }
};

export const addProject = async (data: TProjectList): Promise<TAddProject> => {
  try {
    const response = await fetch(`${URL}/api/projects/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: getCookie('accessToken'),
        id: data.id,
        name: data.name,
        owner: data.owner
      })
    });

    const responseData = await checkResponse<TAddProject>(response);
    if (responseData?.success) {
      return responseData;
    }
    return Promise.reject(responseData);
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const removeProject = async (id: string): Promise<TProjectList> => {
  try {
    const response = await fetch(`${URL}/api/projects/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id: id
      })
    });

    const responseData = await checkResponse<TProjectList>(response);
    //console.log('API ' + responseData);

    return responseData;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${URL}/api/auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

export const logoutApi = () =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TServerResponse<{}>>(res));

export const createTask = async (data: TListTask): Promise<ITask> => {
  const response = await fetch(`${URL}/api/task/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

  return await response.json();
};

export const getTaskList = async (todoId: string): Promise<TTaskListData> => {
  const response = await fetch(`${URL}/api/task/list`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ todoId })
  });

  return await response.json();
};

export const setChecked = async (data: ICheckedTask) => {
  const response = await fetch(`${URL}/api/task/checked`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

  return await response.json();
};

export const addComments = async (data: IComments): Promise<TComments> => {
  const response = await fetch(`${URL}/api/todo/addComment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });
  await console.log(response.json);
  return await response.json();
};

export const getComments = async (taskId: string): Promise<TComments> => {
  const response = await fetch(`${URL}/api/todo/loadingComments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ taskId })
  });

  return await response.json();
};

type ICheckTaskPermission = {
  answer: boolean;
};

export const checkTaskPermission = async (data: {
  user: string;
  task: string;
  project: string;
}): Promise<TListTask[]> => {
  const response = await fetch(`${URL}/api/task/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data)
  });

  return await response.json();
};

export type TCheckProject = {
  projectData: TProjectList[];
};

export const getCurrentProjectData = async (
  id: string
): Promise<IProjectList> => {
  const response = await fetch(`${URL}/api/projects/getProject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ id: id })
  });

  return await response.json();
};

// редактирование таски

export const editTaskData = async (data: {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  tags: string | undefined;
}): Promise<TListTask> => {
  console.log('edit in fetch progress');

  const response = await fetch(`${URL}/api/task/edit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ data })
  });

  console.log('Статус ответа:', response.status);

  const result = await response.json();
  return await result;
};

export const profileLoad = async (data: {
  userId: string | number;
}): Promise<TUser> => {
  const response = await fetch(`${URL}/api/profile/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ data })
  });

  console.log(response.status);

  return await response.json();
};
