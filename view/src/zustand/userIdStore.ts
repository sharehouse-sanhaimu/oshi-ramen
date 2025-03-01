import { create } from "zustand";

type userIDStoreStateType = {
	id: string;
 setID: (id: string) => void;
	getID: () => void;
};

const userIDStore = create<userIDStoreStateType>()((set, get) => ({
	id: '0',
 setID: (id: string) => {
  set({ id });
 },
	getID: () => {
  return get().id;
	},
}));

export { userIDStore };
