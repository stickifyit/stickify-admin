import create from "zustand"

type State = {
    current : Container | null,
    setCurrent : (current : Container | null) => void
    reload : number
    setReload : (reload : number) => void
}


export const useCurrentContainer = create<State>((set) => ({
    current : null,
    setCurrent : (current : Container | null) => set({ current }),
    reload : 0 ,
    setReload : (reload : number) => set({ reload }),
}))