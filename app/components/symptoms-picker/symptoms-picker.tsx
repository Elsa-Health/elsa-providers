import React from "react"
import { Alert, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Chip } from "react-native-paper"
import { color, md, sm } from "../../theme"
import CustomPicker from "../custom-picker/custom-picker"
import { Row } from "../row/row"
import SearchAndSelectBar from "../search-and-select-bar/search-and-select-bar"
import Spacer from "../spacer/spacer"
import _, { includes } from "lodash"
import { Text } from "../text/text"
import {
    getRelatedSymptoms,
    RENAME_findNode,
    symptomDependencies,
    SymptomDependency,
    symptomDurationOptions,
    symptomsList,
    updateSystemSymptomNode,
} from "./symptomsNetwork"
import { toggleStringFromList } from "../../common/utils"
import { useSymptomFeatures, useSystemSymptomStore } from "../../models/symptoms-store"
import { SystemSymptomMapping } from "../../common/systemSymptoms"

interface SymptomsPickerProps {
    // defaultIncluded
}

// TODO: Support taking in active symptoms as prop or connected to global state - latter is a bad idea
const SymptomsPicker: React.FC<SymptomsPickerProps> = () => {
    const [selectedSymptoms, setSelectedSymptoms] = React.useState([])
    const symptomsFeatures = useSymptomFeatures() // React.useState({}) // { cough: { type: "dry", duration: 3, "time of day": ["morning"] } }
    // const setSymptomsFeatures = useSymptomFeatures((state) => state.updateSymptomFeatures)
    const systemsSymptoms = useSystemSymptomStore<SystemSymptomMapping[]>(
        (state) => state.systemsSymptoms,
    )
    const updateNodeBySymptom = useSystemSymptomStore((state) => state.updateNodeBySymptom)
    const toggleSelectedSymptom = (symptom: string) => {
        if (selectedSymptoms.includes(symptom)) {
            updateNodeBySymptom(symptom, "absent") // Set this root and its children to absent
            setSelectedSymptoms(selectedSymptoms.filter((sym) => sym !== symptom))
        } else {
            updateNodeBySymptom(symptom, "present") // Set this root ant its children to present
            setSelectedSymptoms([...selectedSymptoms, symptom])
        }
    }

    // React.useEffect(()=> [selectedSymptoms])

    const updateSymptomFeatures = (updates: SymptomDependency) => {
        const mapping = {}
        updates.attributes.forEach((attribute) => {
            mapping[attribute] = updates[attribute] || null

            // if (updates.attributeOptions[attribute]?.type === "radio") {
            //     updates.attributes.filter(attr => attr !== updates[])
            //     mapping.currentAbsent.push()
            // }
        })

        // mapping
        // updateNodeBySymptom("fever", "present")
        // updateNodeBySymptom("cough", "present")
        // updateNodeBySymptom("abdominal pain", "present")
        updateNodeBySymptom(updates.symptom, "present")

        // console.warn("UPDATES", updates, mapping)
        // updateSystemSymptomNode(systemsSymptoms, "dry", "present")

        // perform updates to state for each key at a time
        // TODO: if the key already has the value in global state, then ignore (in updater)
        _.keys(mapping).forEach((key) => {
            // if its an array, we do so
            if (Array.isArray(mapping[key])) {
                mapping[key].map((symptom) => updateNodeBySymptom(symptom, "present"))

                updates.attributeOptions[key]?.options
                    .filter((opt) => !mapping[key].includes(opt))
                    .forEach((opt) => updateNodeBySymptom(opt, "absent"))
            } else {
                // console.warn("ey", mapping[key])
                if (mapping[key] === null) {
                    // this node should not do any updates, its not filled in,
                    return
                }
                updateNodeBySymptom(mapping[key], "present")

                updates.attributeOptions[key]?.options
                    .filter((opt) => opt !== mapping[key])
                    .forEach((opt) => updateNodeBySymptom(opt, "absent"))
            }
        })

        // console.warn("updated mapping", JSON.stringify(mapping, null, 2), updates.symptom)
        // symptomsFeatures.updateSymptomFeatures({ [updates.symptom]: { ...mapping } })
    }

    const [showSearchOptions, setShowSearchOptions] = React.useState(false)

    const onChangeSearchString = (searchStr: string) => setShowSearchOptions(searchStr.length > 0)

    const relatedSymptoms = getRelatedSymptoms(selectedSymptoms, 5)

    // console.log("symptoms: ", JSON.stringify(symptomsFeatures, null, 2))

    return (
        <View>
            <SearchAndSelectBar
                options={symptomsList}
                hideSelectedOptions
                selectedOptions={[...selectedSymptoms]}
                toggleOption={toggleSelectedSymptom}
                onChangeSearchString={onChangeSearchString}
            />

            {/* Related symptoms and set of symptom features - hide when in search mode */}
            <View style={showSearchOptions && { display: "none" }}>
                <Row marginVertical={8} alignItems="center">
                    <Text>Related: </Text>
                    <Row>
                        {relatedSymptoms.map((symptom) => (
                            <Chip
                                key={symptom}
                                onPress={() =>
                                    setSelectedSymptoms(_.uniq([...selectedSymptoms, symptom]))
                                }
                                style={{ padding: 2, marginRight: 12, marginBottom: 4 }}
                            >
                                <Text size="small" bold>
                                    {_.upperFirst(symptom)}
                                </Text>
                            </Chip>
                        ))}
                    </Row>
                </Row>

                {selectedSymptoms.map((symptom, index) => {
                    return (
                        <SymptomFeatures
                            key={`features-component__${symptom}`}
                            label={_.upperFirst(symptom)}
                            symptom={symptom}
                            lastItem={index === selectedSymptoms.length - 1}
                            toggleSymptom={toggleSelectedSymptom}
                            updateSymptomFeatures={updateSymptomFeatures}
                        />
                    )
                })}
            </View>
        </View>
    )
}

interface SymptomFeaturesProps {
    label: string
    symptom: string
    lastItem: boolean
    updateSymptomFeatures: (updates: any) => any
    toggleSymptom: (symptom: string) => any
}

const SymptomFeatures: React.FC<SymptomFeaturesProps> = ({
    label,
    symptom,
    lastItem,
    updateSymptomFeatures,
    toggleSymptom,
}) => {
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

    // find the symptom dependencies in the mapping in order to render the correct symptom options
    const symptomDependency = symptomDependencies.find(
        (dependencies) => dependencies.symptom === symptom,
    )

    if (!symptomDependency) {
        // In the wierd case this does not render from the dependencies. should not be expected to happen
        return <View />
    }

    const [symptomFeatures, setSymptomFeatures] = React.useState({ ...symptomDependency })

    React.useEffect(() => {
        updateSymptomFeatures(symptomFeatures)
    }, [symptomFeatures])

    // FIXME: Potentially do the update at this level, instead of the above level
    // FIXME: Find way to pass state down here so that they listen to the same state
    // console.log("FOUND: ", symptomDependency, RENAME_findNode(symptom))

    // console.warn("Finding things", RENAME_findNode(symptom))

    const { visibilityRules, attributeOptions, attributes } = symptomDependency
    // console.log("Symptom features: ", JSON.stringify(symptomFeatures, null, 2))
    return (
        <View style={[styles.symptomFeatureContainer, lastItem && styles.noBorder]}>
            <Row justifyContent="space-between" alignItems="center">
                <Row alignItems="center">
                    <Text bold size={sm ? "default" : "h6"}>
                        {label}:
                    </Text>
                    <Spacer horizontal size={20} />
                    <CustomPicker
                        options={symptomDurationOptions}
                        width={sm ? 130 : 135}
                        height={sm ? 50 : null}
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
                    <Text size={sm ? "small" : "default"} color="angry">
                        {sm ? "Remove" : "Remove Symptom"}
                    </Text>
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
                        <Text size={sm ? "h7" : "default"}>{_.upperFirst(attribute)}:</Text>
                        <Spacer horizontal size={10} />
                        {/* <View style={{ marginLeft: 20 }}> */}
                        {attrOptions.type === "radio" &&
                            attrOptions.options.map((option) => (
                                <SymptomFeatureOptionButton
                                    key={`attribute-option__${option}`}
                                    isActive={symptomFeatures[attribute] === option}
                                    onPress={() => {
                                        // console.warn("Updating", attribute, option)
                                        setSymptomFeatures({
                                            ...symptomFeatures,
                                            [attribute]: option,
                                        })
                                    }}
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
                        {/* </View> */}
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
            <Text size={sm ? "h7" : "default"} color={isActive ? "white" : "default"}>
                {_.upperFirst(value)}
            </Text>
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
        marginBottom: 5,
        marginRight: 10,
        paddingHorizontal: sm ? 12 : 24,
        paddingVertical: 6,
    },
    attributeRow: { marginVertical: 8, paddingLeft: sm ? 10 : 50 },
    noBorder: {
        borderBottomWidth: 0,
    },
    symptomFeatureContainer: {
        borderBottomColor: color.offWhiteBackground,
        borderBottomWidth: 1,
        marginTop: 30,
        paddingBottom: 20,
    },
})

export { SymptomsPicker }
