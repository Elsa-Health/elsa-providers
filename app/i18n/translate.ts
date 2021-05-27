import i18n from "i18n-js"

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: string, options?: object, fallback = null) {
    const trans = key ? i18n.t(key, options) : null
    if (!trans) return null
    if (trans.indexOf("[missing") === -1) return trans

    return fallback || null
    // console.log("translate", trans, trans?.includes("[missing ") ? fallback : null)
    // return trans.includes("[missing ") ? "fallback" : null
}

export function changeLanguage(key: "en" | "sw"): any {
    return (i18n.local = key)
}
