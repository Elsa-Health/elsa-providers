import create from "zustand"
import AsyncStorage from "@react-native-community/async-storage"

type locales = "en" | "sw"

type LocaleState = {
    locale: locales
    setLocale: (sny) => void
    syncLocale: () => any
    translateChoice: (choices: [string, string]) => string
}

const useLocale = create<LocaleState>((set, get) => ({
    locale: "en",
    setLocale: async (locale: "en" | "sw") => {
        set((state) => ({ ...state, locale }))
        try {
            await AsyncStorage.setItem("@locale", locale)
        } catch (e) {
            //   FIXME: Add support for better language support
            console.warn("Error changing the users language")
        }
    },
    syncLocale: async () => {
        try {
            const value = (await AsyncStorage.getItem("@locale")) as locales
            if (value !== null) {
                // value previously stored
                set((state) => ({ ...state, locale: value }))
            }
        } catch (err) {
            // error reading value
            console.warn(
                "Error synchronising locale information from local storage. Defaulting to english.",
                err,
            )
            set((state) => ({ ...state, locale: "en" }))
        }
    },
    translateChoice: (choices) => {
        return get().locale === "en" ? choices[0] : choices[1]
    },
}))

export { useLocale }
