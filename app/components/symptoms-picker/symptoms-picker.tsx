import React from "react"
import { Alert, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Chip } from "react-native-paper"
import { color } from "../../theme"
import CustomPicker from "../custom-picker/custom-picker"
import { Row } from "../row/row"
import SearchAndSelectBar from "../search-and-select-bar/search-and-select-bar"
import Spacer from "../spacer/spacer"
import _, { differenceWith, includes } from "lodash"
import { Text } from "../text/text"
import {
    getRelatedSymptoms,
    symptomDependencies,
    symptomDurationOptions,
    symptomsList,
} from "./symptomsNetwork"
import { toggleStringFromList } from "../../common/utils"

// when selecting cough it trows an error ???

// TODO: Support taking in active symptoms as prop or connected to global state - latter is a bad idea
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

    console.log("related sytmptoms : ", selectedSymptoms)
    return (
        <View>
            <SearchAndSelectBar
                options={symptomsList}
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

            {selectedSymptoms.map((symptom) => {
                return (
                    <SymptomFeatures
                        key={`features-component__${symptom}`}
                        label={_.upperFirst(symptom)}
                        symptom={symptom}
                        toggleSymptom={toggleSelectedSymptom}
                    />
                )
            })}
        </View>
    )
}

interface SymptomFeaturesProps {
    label: string
    symptom: string
    toggleSymptom: (symptom: string) => any
}

const SymptomFeatures: React.FC<SymptomFeaturesProps> = ({ label, symptom, toggleSymptom }) => {
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

    //  am lost in this codes, why do we need to do this while we are just displaying the symptom?
    //
    const symptomDependency = symptomDependencies.find(
        (dependencies) => dependencies.symptom === symptom,
    )
    if (!symptomDependency) {
        // In the wierd case this does not render from the dependencies. should not be expected to happen
        return <View />
    }

    const [symptomFeatures, setSymptomFeatures] = React.useState({ ...symptomDependency })

    const { visibilityRules, attributeOptions, attributes } = symptomDependency
    // console.log(JSON.stringify(symptomFeatures, null, 2))
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
                        onChange={(value) =>
                            setSymptomFeatures((symptomFeatures) => ({
                                ...symptomFeatures,
                                duration: Number(value),
                            }))
                        }
                        selectedValue={symptomFeatures.duration}
                    />
                </Row>
                <TouchableOpacity onPress={removeSymptom} activeOpacity={0.5}>
                    <Text color="angry">Remove Symptom</Text>
                </TouchableOpacity>
            </Row>
            {attributes.map((attribute) => {
                const attrRule = visibilityRules.find((rule) => rule[0] === attribute)
                const attrOptions = attributeOptions[attribute]
                const renderComponent = (() => {
                    if (attrRule) {
                        const featureName = attrRule[1] // the feature we are depending on
                        const operation = getOperation(attrRule[2]) // the operation that we will run
                        const featureValue = attrRule[3] // the value the feature is supposed to be
                        return operation(symptomFeatures[featureName], featureValue) // return the evaluation of the operation
                    }
                    return true // render any component without visibility rules
                })()

                if (!renderComponent) return <View key={`symptom-attribute__${attribute}`} />
                return (
                    <Row
                        key={`symptom-attribute__${attribute}`}
                        alignItems="center"
                        styles={styles.attributeRow}
                    >
                        <Text>{_.upperFirst(attribute)}:</Text>
                        <Spacer horizontal size={10} />
                        {attrOptions.type === "radio" &&
                            attrOptions.options.map((option) => (
                                <SymptomFeatureOptionButton
                                    key={`attribute-option__${option}`}
                                    isActive={symptomFeatures[attribute] === option}
                                    onPress={() =>
                                        setSymptomFeatures({
                                            ...symptomFeatures,
                                            [attribute]: option,
                                        })
                                    }
                                    value={option}
                                />
                            ))}

                        {/* Checboxes support selecting multiple values */}
                        {attrOptions.type === "checkbox" &&
                            attrOptions.options.map((option) => (
                                <SymptomFeatureOptionButton
                                    key={`attribute-option__${option}`}
                                    isActive={symptomFeatures[attribute].includes(option)}
                                    onPress={() =>
                                        setSymptomFeatures({
                                            ...symptomFeatures,
                                            [attribute]: toggleStringFromList(
                                                option,
                                                symptomFeatures[attribute],
                                            ),
                                        })
                                    }
                                    value={option}
                                />
                            ))}
                    </Row>
                )
            })}
        </View>
    )
}

interface SymptomFeatureOptionButtonProps {
    value: string
    isActive: boolean
    onPress: (string) => void
}

const SymptomFeatureOptionButton: React.FC<SymptomFeatureOptionButtonProps> = ({
    value,
    isActive,
    onPress,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={[styles.attributeButton, isActive && styles.activeAttributeButton]}
        >
            <Text color={isActive ? "white" : "default"}>{_.upperFirst(value)}</Text>
        </TouchableOpacity>
    )
}

function getOperation(type: string): (a, b) => boolean {
    if (type === "equalsTo") {
        return _.isEqual
    } else if (type === "notEqualsTo") {
        return function (a, b) {
            return a !== b
        }
    } else if (type === "includes") {
        return includes
    } else {
        return function (a, b) {
            return false
        }
    }
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
