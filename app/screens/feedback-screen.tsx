import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Header, Text, TextInput, Button, Row } from "../components"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { color, style } from "../theme"
import RadioQuestion from "../components/radio-question/radio-question"
import { BOOLEAN_OPTIONS } from "../common/constants"
import Spacer from "../components/spacer/spacer"
import _ from "lodash"

export interface FeedbackScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

interface StarRatingsProps {
    maxRating: number
    rating: number
    starSize?: number
    onChange: (rating: number) => any
}

const StarRatings: React.FC<StarRatingsProps> = ({
    maxRating = 5,
    rating = 4,
    starSize = 40,
    onChange,
}) => {
    return (
        <Row>
            {_.times(maxRating, (i) => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={`star-rating__${i + 1}`}
                    onPress={() => onChange(i + 1)}
                >
                    <Icon
                        name={i + 1 <= rating ? "star" : "star-outline"}
                        size={starSize}
                        color={color.primary}
                    />
                </TouchableOpacity>
            ))}
        </Row>
    )
}

export const FeedbackScreen: React.FunctionComponent<FeedbackScreenProps> = (props) => {
    // const { someStore } = useStores()
    const [feedback, setFeedback] = React.useState({
        error: false,
        description: "",
        notes: "",
        rating: 4,
    })

    const submit = () => console.log(feedback)
    return (
        <Screen preset="scroll" title="Feedback">
            <Spacer size={25} />
            <Text size="h6">Overall, what is your experience with the Elsa Health Assistant?</Text>
            <Row justifyContent="space-around" marginVertical={20}>
                <StarRatings
                    rating={feedback.rating}
                    onChange={(rating) => setFeedback((state) => ({ ...state, rating }))}
                    maxRating={5}
                    starSize={50}
                />
            </Row>
            <RadioQuestion
                question="Do you have an error or a problem?"
                options={BOOLEAN_OPTIONS}
                questionSize="h6"
                id="error"
                value={feedback.error}
                onPress={(val) => setFeedback((state) => ({ ...state, error: val as boolean }))}
            />
            {/* <AssessmentQuestion question="Are you reporting an error or problem?" /> */}
            {feedback.error && (
                <View style={{ marginVertical: 10 }}>
                    {/* <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}> */}
                    <Text>Please describe your error or problem.</Text>
                    <TextInput
                        placeholder="Start typing..."
                        multiline={true}
                        numberOfLines={4}
                        value={feedback.description}
                        autoCorrect={false}
                        onChangeText={(text) =>
                            setFeedback((state) => ({ ...state, description: text }))
                        }
                    />
                </View>
            )}

            <Spacer size={10} />
            <Text>Please add any additional notes.</Text>
            <TextInput
                placeholder="Start typing..."
                multiline={true}
                numberOfLines={4}
                autoCorrect={false}
                value={feedback.notes}
                onChangeText={(text) => setFeedback((state) => ({ ...state, notes: text }))}
            />

            <Spacer size={25} />
            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={submit}
                uppercase={false}
                mode="contained"
                label="Next"
            />
        </Screen>
    )
}
