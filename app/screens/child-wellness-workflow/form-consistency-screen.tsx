import React from "react"
import { View, Dimensions, StatusBar, TouchableOpacity, Image } from "react-native"
import { Text } from "../../components"
import Orientation from "react-native-orientation-locker"
import { color } from "../../theme"
import _, { shuffle, times, uniq } from "lodash"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import uuidV1 from "uuid/v1"
import { isInteger } from "validate.js"
import { useNavigation } from "@react-navigation/native"

interface OptionItem {
    id: string
    selected: boolean
    isTruth: boolean
    value: string
    position: {
        x: number
        y: number
    }
}

// Currently these are the image names
const optionValues = [
    "./images/1.png",
    "./images/2.png",
    "./images/3.png",
    "./images/4.png",
    "./images/5.png",
    "./images/6.png",
    "./images/7.png",
    "./images/8.png",
    "./images/9.png",
    "./images/10.png",
    "./images/11.png",
    "./images/12.png",
    "./images/13.png",
    "./images/14.png",
    "./images/15.png",
    "./images/16.png",
    "./images/17.png",
    "./images/18.png",
    "./images/19.png",
    "./images/20.png",
    "./images/21.png",
    "./images/22.png",
    "./images/23.png",
    "./images/24.png",
    "./images/25.png",
    "./images/26.png",
    "./images/27.png",
    "./images/28.png",
    "./images/29.png",
    "./images/30.png",
    "./images/31.png",
    "./images/32.png",
    "./images/33.png",
    "./images/34.png",
    "./images/35.png",
    "./images/36.png",
    "./images/37.png",
    "./images/38.png",
    "./images/39.png",
    "./images/40.png",
    "./images/41.png",
    "./images/42.png",
    "./images/43.png",
    "./images/44.png",
    "./images/45.png",
    "./images/46.png",
    "./images/47.png",
    "./images/48.png",
    "./images/49.png",
    "./images/50.png",
]

const requiredImages = {
    "./images/1.png": require("./images/1.png"),
    "./images/2.png": require("./images/2.png"),
    "./images/3.png": require("./images/3.png"),
    "./images/4.png": require("./images/4.png"),
    "./images/5.png": require("./images/5.png"),
    "./images/6.png": require("./images/6.png"),
    "./images/7.png": require("./images/7.png"),
    "./images/8.png": require("./images/8.png"),
    "./images/9.png": require("./images/9.png"),
    "./images/10.png": require("./images/10.png"),
    "./images/11.png": require("./images/11.png"),
    "./images/12.png": require("./images/12.png"),
    "./images/13.png": require("./images/13.png"),
    "./images/14.png": require("./images/14.png"),
    "./images/15.png": require("./images/15.png"),
    "./images/16.png": require("./images/16.png"),
    "./images/17.png": require("./images/17.png"),
    "./images/18.png": require("./images/18.png"),
    "./images/19.png": require("./images/19.png"),
    "./images/20.png": require("./images/20.png"),
    "./images/21.png": require("./images/21.png"),
    "./images/22.png": require("./images/22.png"),
    "./images/23.png": require("./images/23.png"),
    "./images/24.png": require("./images/24.png"),
    "./images/25.png": require("./images/25.png"),
    "./images/26.png": require("./images/26.png"),
    "./images/27.png": require("./images/27.png"),
    "./images/28.png": require("./images/28.png"),
    "./images/29.png": require("./images/29.png"),
    "./images/30.png": require("./images/30.png"),
    "./images/31.png": require("./images/31.png"),
    "./images/32.png": require("./images/32.png"),
    "./images/33.png": require("./images/33.png"),
    "./images/34.png": require("./images/34.png"),
    "./images/35.png": require("./images/35.png"),
    "./images/36.png": require("./images/36.png"),
    "./images/37.png": require("./images/37.png"),
    "./images/38.png": require("./images/38.png"),
    "./images/39.png": require("./images/39.png"),
    "./images/40.png": require("./images/40.png"),
    "./images/41.png": require("./images/41.png"),
    "./images/42.png": require("./images/42.png"),
    "./images/43.png": require("./images/43.png"),
    "./images/44.png": require("./images/44.png"),
    "./images/45.png": require("./images/45.png"),
    "./images/46.png": require("./images/46.png"),
    "./images/47.png": require("./images/47.png"),
    "./images/48.png": require("./images/48.png"),
    "./images/49.png": require("./images/49.png"),
    "./images/50.png": require("./images/50.png"),
}

const OPTION_ITEM_SIZE = 80

const FormConsistency = () => {
    const navigation = useNavigation()
    const [canvasState, setCanvasState] = React.useState({
        height: 648,
        width: 897.3333129882812,
        x: 382.6666564941406,
        y: 40,
    })
    const [options, setOptions] = React.useState<OptionItem[]>([])
    const [trueValue, setTrueValue] = React.useState("")
    const [selectedValues, setSelectedValues] = React.useState([])
    const [screenItems, setScreenItems] = React.useState(2)

    const [turns, setTurns] = React.useState(2)

    React.useEffect(() => {
        Orientation.lockToLandscape()
    }, [])

    React.useEffect(() => {
        const truths = options.filter((opt) => opt.isTruth)
        const trueSelected = selectedValues.filter(
            (id) => options.find((o) => o.id === id)?.isTruth,
        )

        if (truths.length === trueSelected.length) {
            if (isInteger(turns)) setScreenItems(turns)
            refreshCanvas()
            setTurns(+(turns + 0.2).toFixed(1))
        }
    }, [selectedValues])

    React.useEffect(() => {
        generatePoints(screenItems, OPTION_ITEM_SIZE)
    }, [canvasState])

    React.useEffect(() => {
        generatePoints(screenItems, OPTION_ITEM_SIZE)
    }, [screenItems])

    const refreshCanvas = () => {
        setSelectedValues([])
        generatePoints(screenItems, OPTION_ITEM_SIZE)
    }

    const resetCanvas = () => {
        setSelectedValues([])
        setScreenItems(2)
        setTurns(2)
        // refreshCanvas()
        // generatePoints(2, OPTION_ITEM_SIZE)
    }

    // Generate all the points that will be rendered on the canvas
    const generatePoints = (count: number, radius = 30) => {
        // const { height, width } = canvasState

        const truth = randomChoice(optionValues)

        let plainPoints = _.shuffle(optionValues)
            .map(
                (option): OptionItem => ({
                    id: uuidV1(),
                    selected: false,
                    isTruth: option === truth,
                    value: option,
                    position: proposeLocation(),
                }),
            )
            .splice(0, count)

        if (plainPoints.find((p) => p.isTruth) === undefined) {
            plainPoints.pop()
            plainPoints.push({
                id: uuidV1(),
                selected: false,
                isTruth: true,
                value: truth,
                position: proposeLocation(),
            })
        }

        if (screenItems > 10 && screenItems % 5 === 0) {
            const repeatItemsCount = screenItems / 5

            const pPoints = shuffle(
                _.concat(
                    plainPoints,
                    times(
                        repeatItemsCount,
                        (n): OptionItem => ({
                            id: uuidV1(),
                            selected: false,
                            isTruth: true,
                            value: truth,
                            position: proposeLocation(),
                        }),
                    ),
                ),
            ).splice(0, count)

            plainPoints = pPoints
        }

        plainPoints.forEach((item, idx) => {
            const remaining = _.without(plainPoints, item)

            let foundOptimal = false
            let proposedLocation = item.position

            while (foundOptimal === false) {
                const tooCloseItem = remaining.filter((point) => {
                    const { x, y } = point.position

                    const delta_x = Math.abs(x - proposedLocation.x)
                    const delta_y = Math.abs(y - proposedLocation.y)

                    const distance = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2))

                    // console.log("dist", distance)

                    // FIXME: WTF is happening here? why does this function when the distance is less than the radius?
                    return distance <= radius
                })

                if (tooCloseItem.length === 0) {
                    foundOptimal = true
                    plainPoints[idx].position = proposedLocation
                    break
                } else {
                    proposedLocation = proposeLocation()
                }
            }
        })

        setOptions([...plainPoints])
        setTrueValue(truth)
    }

    const proposeLocation = () => ({
        x: randomIntFromInterval(0, canvasState.width - OPTION_ITEM_SIZE),
        y: randomIntFromInterval(0, canvasState.height - OPTION_ITEM_SIZE),
    })

    const onCanvasLayout = ({ nativeEvent }) => {
        setCanvasState({
            ...nativeEvent.layout,
            height: nativeEvent.layout.height - 40,
            width: nativeEvent.layout.width - 40,
        })
        console.log(nativeEvent.layout)
    }

    const onOptionPress = (option: OptionItem) => {
        // console.log(option)
        setSelectedValues(uniq([...selectedValues, option.id]))
    }

    console.log(turns)
    return (
        <>
            <StatusBar backgroundColor={color.palette.white} barStyle="light-content" />
            <View style={{ flex: 1, flexDirection: "row", paddingVertical: 40 }}>
                <View style={{ flex: 2.5, paddingHorizontal: 20 }}>
                    <View
                        style={{
                            position: "absolute",
                            left: 10,
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{ height: 50, width: 50, marginRight: 10 }}
                            source={require("../phone-auth-screen/logo.png")}
                            resizeMode="contain"
                        />
                        <Text size="h6" color="primary">
                            Elsa Child Wellness Support {`\n`}
                            <Text size="small" color="primary">
                                Visual Perception Test
                            </Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("cw.VisualMotorProcessing")}
                        style={{ height: 20, width: "100%", backgroundColor: "transparent" }}
                    />

                    <View
                        style={{
                            borderRightWidth: 2,
                            borderRightColor: "#ccc",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                height: OPTION_ITEM_SIZE * 2,
                                width: OPTION_ITEM_SIZE * 2,
                            }}
                            resizeMode="contain"
                            source={requiredImages[trueValue]}
                        />
                    </View>

                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            onPress={refreshCanvas}
                            onLongPress={resetCanvas}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 3,
                                paddingHorizontal: 15,
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 4,
                                marginLeft: 2,
                                // marginHorizontal: 6,
                            }}
                        >
                            <MaterialCommunityIcon name="refresh" size={30} />
                            <Text> Refresh</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => setScreenItems((state) => Math.max(state - 1, 0))}
                                style={{
                                    padding: 2,
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    borderRadius: 4,
                                    marginHorizontal: 6,
                                }}
                            >
                                <MaterialCommunityIcon name="minus" size={30} />
                            </TouchableOpacity>
                            <Text>{screenItems}</Text>
                            <TouchableOpacity
                                onPress={() => setScreenItems((state) => state + 1)}
                                style={{
                                    padding: 2,
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    borderRadius: 4,
                                    marginHorizontal: 6,
                                }}
                            >
                                <MaterialCommunityIcon name="plus" size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    onLayout={onCanvasLayout}
                    // onTouchEnd={onCanvasTouch}
                    style={{ flex: 5, paddingHorizontal: 20 }}
                >
                    {options.map((option) => {
                        const isSelected = selectedValues.includes(option.id)
                        return (
                            <TouchableOpacity
                                key={option.id}
                                onPress={() => onOptionPress(option)}
                                style={{
                                    position: "absolute",
                                    left: option.position.x,
                                    top: option.position.y,
                                    height: OPTION_ITEM_SIZE,
                                    width: OPTION_ITEM_SIZE,
                                    borderColor:
                                        option.isTruth && isSelected
                                            ? "green"
                                            : !option.isTruth && isSelected
                                            ? "red"
                                            : "transparent",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    style={{
                                        height: OPTION_ITEM_SIZE,
                                        width: OPTION_ITEM_SIZE,
                                        transform:
                                            screenItems > 8
                                                ? [
                                                      {
                                                          rotate: `${randomIntFromInterval(
                                                              0,
                                                              360,
                                                          )}deg`,
                                                      },
                                                  ]
                                                : [],
                                    }}
                                    // transform={{ scale: "0.5, 0.5" }}
                                    resizeMode="contain"
                                    source={requiredImages[option.value]}
                                />
                            </TouchableOpacity>
                        )
                    })}

                    {/* {options.map((option) => (
                        <TouchableOpacity
                            key={option.id + "tracek"}
                            onPress={() => onOptionPress(option)}
                            style={{
                                position: "absolute",
                                left: option.position.x,
                                top: option.position.y,
                                height: 4,
                                width: 4,
                                borderColor: "red",
                                borderWidth: 1,
                            }}
                        />
                    ))} */}
                </View>
            </View>
        </>
    )
}

export function randomIntFromInterval(min = 0, max = 1): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// Notes:
// 1. Adaptive items could be: number of items on page and size of items on page

export default FormConsistency
