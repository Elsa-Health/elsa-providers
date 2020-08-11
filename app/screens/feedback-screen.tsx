import * as React from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle, View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Header } from "../components"
import Icon from "react-native-vector-icons/MaterialIcons"

import { AssessmentQuestion } from './assessment-questions-screen'
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"
import { TextInput, Button, Text } from "react-native-paper"


export interface FeedbackScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {

}

interface RatingState {
  Default_Rating: number
  Max_Rating: number
}

// to be re-written as functional component

class Rating extends React.Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      Default_Rating: 1,
      Max_Rating: 5,
    };
  }

  UpdateRating(key) {
    this.setState({ Default_Rating: key });
  }
  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.Max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}>
          <Icon name={i <= this.state.Default_Rating ? "star" : "star-border"} style={{ fontSize: 40 }} color={color.primary} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={[styles.childView, style.contentTextVerticalSpacing]}>{React_Native_Rating_Bar}</View>
    );
  }
}

export const FeedbackScreen: React.FunctionComponent<FeedbackScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (

    <Screen style={ROOT} preset="scroll" title="Feedback">
      <View style={{ padding: 10 }}>
        <Text style={style.bodyContent}>If you would like to provide feedback or report an error, please do so here.</Text>
        <Text style={[style.bodyContent, style.contentTextVerticalSpacing]} >Overall, what is your experience with the application.</Text>
        <Rating />
        <AssessmentQuestion question="Are you reporting an error or problem?" />
        <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}>Please describe your error or problem.</Text>
        <TextInput
          placeholder="Start typing..."
          mode="flat"
          multiline={true}
          numberOfLines={4}
          value={""}
          onChangeText={text => { }}
          underlineColor="transparent"
          style={[style.headerTextContentVerticalSpacing]}
          theme={{ colors: { primary: color.primary } }}
        />

        <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}>Please add any additional notes.</Text>
        <TextInput
          placeholder="Start typing..."
          mode="flat"
          multiline={true}
          numberOfLines={4}
          value={""}
          onChangeText={text => { }}
          underlineColor="transparent"
          style={[style.headerTextContentVerticalSpacing]}
          theme={{ colors: { primary: color.primary } }}
        />

        <View style={style.contentTextVerticalSpacing}>
          <Button
            style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
            uppercase={false}
            onPress={() => { }}
          ><Text style={style.buttonText}>Submit</Text></Button>
        </View>
      </View>
    </Screen>
  )
})


const styles = StyleSheet.create({

  childView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,

    color: '#000',
    marginTop: 15,
  },
});