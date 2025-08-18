import { create } from 'zustand';

interface IAuth {
    user: IUser | null;
    setUser: (user: IUser) => void;
}
export const useData = create<IAuth>((set) => ({
    user: null,
    setUser: (user: IUser) =>
        set((state) => ({
            user: user
        }))
}));