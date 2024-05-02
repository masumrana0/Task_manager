import { create } from "zustand";

// for application state manage
interface IState {
  authState: boolean;
  setAuthState: () => void;
  createProjectModalState: boolean;
  setCreateModalToggle: () => void;
  projectUpdateModalState: boolean;
  setProjectModalToggle: () => void;
}

export const useStateStore = create<IState>((set) => ({
  authState: false,
  setAuthState: () =>
    set((state) => ({
      authState: !state.authState,
    })),

  createProjectModalState: false,
  setCreateModalToggle: () =>
    set((state) => ({
      createProjectModalState: !state.createProjectModalState,
    })),

  projectUpdateModalState: false,
  setProjectModalToggle: () =>
    set((state) => ({
      projectUpdateModalState: !state.projectUpdateModalState,
    })),
}));

// for project store

interface IProjectStore {
  projects: any[];
  specificProject: any | null;
  setProjects: (payload: any[]) => void;
  updateSpecificProject: (payload: any) => void;
  deleteSpecificProject: (payload: any) => void;
  setOneProject: (payload: any) => void;
}

export const useProjectStore = create<IProjectStore>((set) => ({
  projects: [],
  specificProject: [],
  setProjects: (payload: any[]) => set({ projects: payload }),

  updateSpecificProject: (payload: any) => {
    set((state) => ({
      projects: [
        ...state.projects.filter((project) => project.id !== payload.id),
        payload,
      ],
    }));
  },
  deleteSpecificProject: (payload: any) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== payload.id),
    }));
  },

  setOneProject: (payload: any) => {
    set((state) => ({
      specificProject:
        state.projects.find((project) => project.id === payload) || null,
    }));
  },
}));
