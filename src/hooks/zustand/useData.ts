import { create } from 'zustand';

interface IAuth {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}
export const useData = create<IAuth>((set) => ({
    user: null,
    setUser: (user: IUser | null) =>
        set((state) => ({
            user: user
        }))
}));