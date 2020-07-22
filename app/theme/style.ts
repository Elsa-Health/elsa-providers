import { ViewStyle,TextStyle } from "react-native"
import { color } from "./color"

const contentTextVerticalSpacing:ViewStyle={
    marginTop:12
}

const headerTextContentVerticalSpacing:ViewStyle={
    marginTop:8
}

const input:ViewStyle={
    height: 44,
    width: "100%",
    backgroundColor: "#E5E5E5",
    marginTop: 12,  //value to be fixed
}


const button:ViewStyle={
    // paddingVertical: 8, 
    marginTop: 12, 
    elevation: 0,
    height:44
}
const buttonFilled:ViewStyle={
    ...button,
    backgroundColor:color.primary ,
  
}

const buttonOutline:ViewStyle={
    ...button,
    borderColor:color.primary
}

const contentHeader:TextStyle={
    fontSize:15,
    fontWeight:"bold"
}

const bodyContent:TextStyle={
    fontSize:14
}

const buttonText:TextStyle={
    fontSize:12
}

export const style={
    contentHeader,
    bodyContent,
    buttonText,
    contentTextVerticalSpacing,
    buttonFilled,
    buttonOutline,
    input,
    headerTextContentVerticalSpacing
}



