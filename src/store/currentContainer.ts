import create from "zustand"

type State = {
    current : CurrentContainer | null,
    setCurrent : (current : CurrentContainer | null) => void
    reload : number
    setReload : (reload : number) => void
}


export const useCurrentContainer = create<State>((set) => ({
    current : null,
    setCurrent : (current : CurrentContainer | null) => set({ current }),
    reload : 0 ,
    setReload : (reload : number) => set({ reload }),
}))