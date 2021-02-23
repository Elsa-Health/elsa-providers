import create from "zustand"
type drawerState = "open" | "closed"

type UIState = {
    drawerState: drawerState
    openDrawer: () => any
    closeDrawer: () => any
    setDrawerState: (newState: drawerState) => void
}

const useUIState = create<UIState>((set) => ({
    drawerState: "closed",
    openDrawer: () => set((state) => ({ ...state, drawerState: "open" })),
    closeDrawer: () => set((state) => ({ ...state, drawerState: "closed" })),
    setDrawerState: (newState: drawerState) =>
        set((state) => ({ ...state, drawerState: newState })),
}))

export { useUIState }
