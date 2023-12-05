import create from "zustand"

type State = {
    containers : CurrentContainer[],
    setContainers : (containers : CurrentContainer[]) => void
}

export const useContainers = create<State>((set) => ({
    containers : [],
    setContainers : (containers : CurrentContainer[]) => set({ containers }),
}))