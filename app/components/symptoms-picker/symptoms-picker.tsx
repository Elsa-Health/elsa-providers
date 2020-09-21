import React from "react"
import { Alert, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Chip } from "react-native-paper"
import { color } from "../../theme"
import CustomPicker from "../custom-picker/custom-picker"
import { Row } from "../row/row"
import SearchAndSelectBar from "../search-and-select-bar/search-and-select-bar"
import Spacer from "../spacer/spacer"
import _, { differenceWith } from "lodash"
import { Text } from "../text/text"
import { getRelatedSymptoms, symptomDependencies, symptomDurationOptions } from "./symptomsNetwork"

const SymptomsPicker: React.FC = () => {
    const [selectedSymptoms, setSelectedSymptoms] = React.useState([])
    const toggleSelectedSymptom = (symptom: string) => {
        if (selectedSymptoms.includes(symptom)) {
            setSelectedSymptoms(selectedSymptoms.filter((sym) => sym !== symptom))
        } else {
            setSelectedSymptoms([...selectedSymptoms, symptom])
        }
    }

    const relatedSymptoms = getRelatedSymptoms(selectedSymptoms, 5)
    return (
        <View>
            <SearchAndSelectBar
                options={differenceWith(
                    [
                        "fever",
                        "cough",
                        "ear pain",
                        "dyspnoea",
                        "eye pain",
                        "eye discharge",
                        "decreased visual acuity",
                        "red eyes",
                    ],
                    selectedSymptoms,
                )}
                hideSelectedOptions
                selectedOptions={[...selectedSymptoms]}
                toggleOption={toggleSelectedSymptom}
            />

            <Row alignItems="center">
                <Text>Related: </Text>
                <Row>
                    {relatedSymptoms.map((symptom) => (
                        <Chip
                            key={symptom}
                            onPress={() =>
                                setSelectedSymptoms(_.uniq([...selectedSymptoms, symptom]))
                            }
                            style={{ padding: 2, marginRight: 12 }}
                        >
                            <Text size="small" bold>
                                {_.upperFirst(symptom)}
                            </Text>
                        </Chip>
                    ))}
                </Row>
            </Row>

            {selectedSymptoms.map((symptom) => (
                <SymptomFeatures
                    key={`features-component__${symptom}`}
                    label={_.upperFirst(symptom)}
                    symptom={symptom}
                    toggleSymptom={toggleSelectedSymptom}
                />
            ))}
        </View>
    )
}

interface SymptomFeaturesProps {
    label: string
    symptom: string
    toggleSymptom: (symptom: string) => any
}

const SymptomFeatures: React.FC<SymptomFeaturesProps> = ({ label, symptom, toggleSymptom }) => {
    const [duration, setDuration] = React.useState(1)
    const removeSymptom = () =>
        Alert.alert(
            "Remove " + label,
            `Are you sure you want to remove ${label}?`,
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Remove " + label,
                    onPress: () => toggleSymptom(symptom),
                },
            ],
            { cancelable: true },
        )

    const symptomDependency = symptomDependencies.find(
        (dependencies) => dependencies.symptom === symptom,
    )
    if (!symptomDependency) {
        return <Text>Empty</Text>
    }

    const [symptomFeatures, setSymptomFeatures] = React.useState({ ...symptomDependency })

    const { visibilityRules } = symptomDependency
    return (
        <View style={styles.symptomFeatureContainer}>
            <Row justifyContent="space-between" alignItems="center">
                <Row alignItems="center">
                    <Text bold size="h6">
                        {label}:
                    </Text>
                    <Spacer horizontal size={20} />
                    <CustomPicker
                        options={symptomDurationOptions}
                        width={135}
                        containerStyle={{
                            paddingVertical: 0,
                            paddingHorizontal: 0,
                        }}
                        onChange={(value) => setDuration(Number(value))}
                        selectedValue={duration}
                    />
                </Row>
                <TouchableOpacity onPress={removeSymptom} activeOpacity={0.5}>
                    <Text color="angry">Remove Symptom</Text>
                </TouchableOpacity>
            </Row>
            {symptomDependency.attributes.map((attribute) => {
                const attrRule = visibilityRules.find((rule) => rule[0] === attribute)
                if (attribute) {
                    const featureValue = symptomFeatures[attrRule[1]]
                    const operation =
                        attrRule[2] === "equalsTo"
                            ? function (a, b) {
                                  return a === b
                              }
                            : null
                }
                return (
                    <Row
                        key={`symptom-attribute__${attribute}`}
                        alignItems="center"
                        styles={styles.attributeRow}
                    >
                        <Text>{_.upperFirst(attribute)}:</Text>
                        <Spacer horizontal size={10} />
                        <TouchableOpacity activeOpacity={0.5} style={styles.attributeButton}>
                            <Text>Dry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={[styles.attributeButton, styles.activeAttributeButton]}
                        >
                            <Text color="white">Productive</Text>
                        </TouchableOpacity>
                    </Row>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    activeAttributeButton: {
        backgroundColor: color.primary,
    },
    attributeButton: {
        borderColor: color.primary,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 24,
        paddingVertical: 6,
    },
    attributeRow: { marginVertical: 8, paddingLeft: 50 },
    symptomFeatureContainer: {
        borderBottomColor: color.offWhiteBackground,
        borderBottomWidth: 1,
        marginTop: 30,
        paddingBottom: 20,
    },
})

export { SymptomsPicker }
