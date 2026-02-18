import { create } from "zustand";

export type ForgeName  = "github" | "gitlab" | "forgejo";

export type ForgeConfig  = {
  id: string;
  name: ForgeName;
  username: string;
  token: string;
  url: string;
};

type GGCGState = {
  forges: ForgeConfig[];
  setForges: (forges: ForgeConfig[]) => void;
};


export const useGGCGStore = create<GGCGState>((set, get) => ({
    forges: [
        {
            id: "gh",
            name: "github",
            username: "Maethik",
            token: "",
            url: "https://github.com",
        },
        {
            id: "gl",
            name: "gitlab",
            username: "mguilbert",
            token: "",
            url: "https://git.ixapack.io",
        },
        {
            id: "fj",
            name: "forgejo",
            username: "mguilbert",
            token: "",
            url: "https://forge.cloudron.evereast-solutions.com",
        },
    ],
    setForges: (forges) => set({ forges }),
}));