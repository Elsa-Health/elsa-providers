import { StyleSheet } from "react-native"
import { color } from "./color"
import { md } from "./stylesResponsive"

const styles = StyleSheet.create({
    contentTextVerticalSpacing: {
        marginTop: 12,
    },

    headerTextContentVerticalSpacing: {
        marginTop: 8,
    },

    input: {
        height: 60,
        width: "100%",
        backgroundColor: "#E5E5E5",
        color: "#A8A8A8",
        borderWidth: 0,
        borderColor: "#E5E5E5",
        // marginTop: 12,  //value to be fixed
    },
    button: {
        // paddingVertical: 8,
        marginTop: 12,
        elevation: 0,
        height: 44,
    },
    buttonFilled: {
        marginTop: 12,
        elevation: 0,
        height: 44,
        backgroundColor: color.primary,
    },

    buttonOutline: {
        marginTop: 12,
        elevation: 0,
        height: 44,
        borderColor: color.primary,
    },

    contentHeader: {
        fontSize: md ? 22 : 18,
        fontWeight: "bold",
    },

    bodyContent: {
        fontSize: md ? 20 : 16,
        // fontWeight:"normal"
    },

    buttonText: {
        fontSize: md ? 18 : 14,
        color: "white",
    },
    mainContainerPadding: {
        paddingHorizontal: md ? 36 : 12,
    },
})

// this codes to be refactored
// it is kept so to prevent breaking other pages
// but the styles have to be accessed from styles.
export const style = {
    contentHeader: styles.contentHeader,
    bodyContent: styles.bodyContent,
    buttonText: styles.buttonText,
    contentTextVerticalSpacing: styles.contentTextVerticalSpacing,
    buttonFilled: styles.buttonFilled,
    buttonOutline: styles.buttonOutline,
    input: styles.input,
    headerTextContentVerticalSpacing: styles.headerTextContentVerticalSpacing,
    mainContainerPadding: styles.mainContainerPadding,
    multiSelect: {
        item: { paddingVertical: 16 },
        selectToggle: {
            backgroundColor: "#F3F3F3",
            borderColor: "#A8A8A8",
            borderWidth: 1,
            borderRadius: 2,
            paddingVertical: 14,
            paddingHorizontal: 10,
            marginTop: 4,
        },
        itemText: {
            color: color.text,
            fontSize: 18,
            fontWeight: "normal",
        },
        selectedItemText: {
            color: color.primary,
        },
        chipContainer: {
            borderRadius: 2,
        },
        selectedSubItemText: { color: color.primary },
        subItem: { marginVertical: 3 },
    },
}
