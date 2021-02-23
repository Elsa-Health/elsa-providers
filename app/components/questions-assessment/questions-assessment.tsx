import React from "react"
import { getQuestion } from "../../elsa-local/questions"
import { useLocale } from "../../models/language"
import RadioQuestion from "../radio-question/radio-question"

interface QuestionsAssessmentProps {
    interestingSymptoms: any[]
    setObservationState: (observationState: any) => any
    observationState: any
}
const QuestionsAssessment: React.FC<QuestionsAssessmentProps> = ({
    interestingSymptoms,
    observationState,
    setObservationState,
}) => {
    const language = useLocale(state => state.locale)
    return (
        <>
            {interestingSymptoms.map((symptom, index) => {
                const question = getQuestion(symptom, language)
                return (
                    <RadioQuestion
                        key={symptom + "__" + index}
                        id={symptom + "__" + index}
                        onPress={(status: "present" | "absent") => {
                            setObservationState((observationState) => ({
                                ...observationState,
                                [symptom]: status,
                            }))
                        }}
                        value={observationState[symptom]}
                        question={question}
                        marginVertical={16}
                    />
                )
            })}
        </>
    )
}

export default QuestionsAssessment
