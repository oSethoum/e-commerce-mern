import { create } from "zustand";

export interface IProfile {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

export interface State {
  baseURL: string;
  profile?: IProfile;
}

export interface Actions {
  setProfile: (profile: IProfile) => void;
  clearProfile: () => void;
  request: (url: string, init?: RequestInit) => Promise<Response>;
}

export const appStore = create<State & Actions>((set, get) => ({
  baseURL: "http://localhost:4000",
  setProfile: (profile: IProfile) => set({ profile }),
  clearProfile: () => set({ profile: undefined }),
  request: async (url, init) => {
    if (!url.startsWith("http")) {
      url = get().baseURL + url;
    }
    return fetch(url, {
      method: init?.method || "GET",
      ...init,
      headers: {
        authorization: get().profile?.token || "",
        "content-type": "application/json",
        ...init?.headers,
      },
      credentials: "include",
    });
  },
}));
