import React from "react"
import { View } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Card, Text, Checkbox } from "../../components"
import { color, sm, xs } from "../../theme"
import {
    getSystemWithPresentSymptom,
    SystemSymptomMapping,
    SystemSymptoms,
} from "../../common/systemSymptoms"
import { useSystemSymptomStore } from "../../models/symptoms-store"

interface SymptomBySystemProps {}
const SymptomBySystem: React.FC<SymptomBySystemProps> = () => {
    const systemsSymptoms = useSystemSymptomStore<SystemSymptomMapping[]>(
        (state) => state.systemsSymptoms,
    )
    const setSystemsSymptoms = useSystemSymptomStore<(state: any) => any>(
        (state) => state.setSystemsSymptoms,
    )
    // const [systemsSymptoms, setSystemSymptoms] = React.useState([...symptomsBySystems])

    const updateSymptomState = (symptomState: any, systemName: string) => {
        // console.log()
        const _systemsSymptoms = [...systemsSymptoms]
        const systemIndex = _systemsSymptoms.findIndex(
            (systemSymptoms) => systemSymptoms.system === systemName,
        )
        _systemsSymptoms[systemIndex].mapping = symptomState
        // // console.log(
        // //     "WE ARE AT THE ROOT",
        // //     // JSON.stringify(symptomState, null, 2),
        // //     JSON.stringify(_systemsSymptoms, null, 2),
        // //     systemIndex,
        // // )
        setSystemsSymptoms([..._systemsSymptoms])
    }

    const activeSystemNames = getSystemWithPresentSymptom(systemsSymptoms).map(
        (system) => system.system,
    )

    // console.log("System: ", getSystemWithPresentSymptom(systemsSymptoms))

    return (
        <>
            {systemsSymptoms.map((systemsMapping) => {
                return (
                    <Card
                        key={`root-system__${systemsMapping.system}`}
                        title={`${systemsMapping.name}`}
                        collapsible
                        defaultCollapsed={!activeSystemNames.includes(systemsMapping.system)}
                    >
                        <SymptomsList
                            root={true}
                            symptomsList={systemsMapping.mapping}
                            updateSymptomState={(symptomState) =>
                                updateSymptomState(symptomState, systemsMapping.system)
                            }
                        />
                    </Card>
                )
            })}
        </>
    )
}

interface SymptomsListProps {
    symptomsList: SystemSymptoms
    root: boolean
    value: string | boolean
    withTitle?: boolean
    parent?: any
    handleSubOptionChange?: (parent: any) => any
    updateSymptomState: (symptomState: any) => void
}

const SymptomsList: React.FC<SymptomsListProps> = ({
    symptomsList,
    root,
    withTitle,
    handleSubOptionChange,
    updateSymptomState,
    parent,
}) => {
    const updateChildState = (updatedState, childIndex) => {
        // TODO: If a parent (a node with child nodes) is toggled to be false, all its children should also be triggered to become false
        if (updatedState.children.length > 0) {
            // console.warn(
            //     "Node has children",
            //     JSON.stringify(updatedState.children),
            //     updatedState.value,
            //     childIndex,
            // )

            // HACK: If the parent is set to absent, stringify all the children and replace all occurances of present with absent
            // Why: So that if a parent symptom is set to absent, we want to make sure things that depend on it are also set to absent
            if (updatedState.value === "absent") {
                updatedState.children = JSON.parse(
                    JSON.stringify(updatedState.children).replace(
                        /"value":"present"/g,
                        `"value":"absent"`,
                    ),
                )
            }
        }

        // If it is a root node, change its value
        if (root) {
            // console.log("Root Updates: ", symptomsList)
            symptomsList[childIndex] = updatedState
            updateSymptomState(symptomsList)
        } else {
            symptomsList[childIndex] = updatedState
            _handleSubOptionChange(symptomsList)
        }
    }

    const _handleSubOptionChange = (updates) => {
        if (parent && parent.children && parent.children.length > 0) {
            parent.children = updates
            console.warn(parent, updates)
            handleSubOptionChange && handleSubOptionChange(parent)
            return
        }

        // console.warn(JSON.stringify(updates, null, 2))

        if (!root || parent !== undefined) {
            handleSubOptionChange && handleSubOptionChange(parent)
        } else if (root) {
            // console.warn("AT THE ROOT")
            updateSymptomState(updates)
        }
    }

    return (
        <View style={{ marginBottom: 0, paddingRight: 0 }}>
            {symptomsList.map((symptomList, index) => (
                <View key={`${symptomList.name}`} style={{ flexDirection: "row", marginBottom: 0 }}>
                    <MaterialIcon
                        size={20}
                        name={root ? "record-circle-outline" : "checkbox-blank-circle-outline"}
                        style={{
                            marginTop: 4,
                            marginRight: 5,
                            display: !symptomList.title && !root ? "none" : "flex",
                        }}
                        color={color.primary}
                    />
                    <View style={{ flex: 1 }}>
                        {symptomList.title ? (
                            <Text text={symptomList.title} size={sm ? "default" : "h6"} />
                        ) : (
                            <Checkbox
                                rtl={root}
                                value={symptomList.value === "present"}
                                text={symptomList.name}
                                onToggle={() =>
                                    updateChildState(
                                        {
                                            ...symptomList,
                                            value:
                                                symptomList.value === "absent"
                                                    ? "present"
                                                    : "absent",
                                        },
                                        index,
                                    )
                                }
                                style={{ marginBottom: 2 }}
                            />
                        )}
                        <View
                            style={{
                                flexDirection: "column",
                                marginBottom: 0,
                                paddingLeft: 24, // this must be responsive
                                marginVertical: 8,
                            }}
                        >
                            {/* <Text>{!root && JSON.stringify(symptomList, null, 2)}</Text> */}
                            {((symptomList.children?.length > 0 &&
                                symptomList.value === "present") ||
                                symptomList.title) && (
                                <SymptomsList
                                    symptomsList={symptomList.children}
                                    withTitle={symptomList.title?.length > 0}
                                    // value={symptomList.value}
                                    root={false}
                                    handleSubOptionChange={_handleSubOptionChange}
                                    parent={symptomsList}
                                    updateSymptomState={updateSymptomState}
                                />
                            )}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}
export default SymptomBySystem
