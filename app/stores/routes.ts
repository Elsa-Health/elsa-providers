import create from "zustand"

// this is a simple store to keep treack of which route to go to

// to be renamed and adding more state data and to be moved to models folder
export const useRouteStore = create((set) => ({
    isPatientNew: false,
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
    setIsPatientNew: (status: boolean) => set((state) => ({ ...state, isPatientNew: status })),
}))
