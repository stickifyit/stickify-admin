import create from "zustand"

type State = {
    containers : Container[],
    setContainers : (containers : Container[]) => void
}

export const useContainers = create<State>((set) => ({
    containers : [],
    setContainers : (containers : Container[]) => set({ containers }),
}))