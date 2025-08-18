import { create } from 'zustand';

interface ITab {
    index: number;
    setIndex: (idx: number) => void;
    register: 'notRegister' | 'Registered' | 'Postpone';
    setRegister: (register: 'notRegister' | 'Registered' | 'Postpone') => void;
}
export const useTab = create<ITab>((set) => ({
    index: 0,
    setIndex: (idx: number) =>
        set((state) => ({
            index: idx
        })),
    register: 'notRegister',
    setRegister: (register) =>
        set((state) => ({
            register: register
        }))
}));