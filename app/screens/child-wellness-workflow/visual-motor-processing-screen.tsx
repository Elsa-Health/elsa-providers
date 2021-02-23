import React from "react"
import { View, Dimensions, StatusBar, TouchableOpacity, Image } from "react-native"
import { Text } from "../../components"
import Orientation from "react-native-orientation-locker"
import * as Animatable from "react-native-animatable"
import { randomIntFromInterval } from "./form-consistency-screen"
import uuidV1 from "uuid/v1"
import Pulse from "./pulse"
import { times } from "lodash"
import _ from "lodash"
import { color } from "../../theme"

interface Target {
    id: string
    position: {
        x: number
        y: number
    }
}

const VisualMotorProcessing = () => {
    const [canvasState, setCanvasState] = React.useState({
        height: 42.66666793823242,
        width: 1280,
        x: 0,
        y: 0,
    })

    const [targets, setTargets] = React.useState<Target[]>([])
    const [timeStamps, setTimeStamps] = React.useState<number[]>([])
    const [targetCount, setTargetCount] = React.useState(1)

    React.useEffect(() => {
        Orientation.lockToLandscape()
        generateTarget(targetCount)
    }, [])

    const onCanvasLayout = ({ nativeEvent }) => {
        setCanvasState({
            ...nativeEvent.layout,
            height: nativeEvent.layout.height - 40,
            width: nativeEvent.layout.width - 40,
        })
    }

    const generateTarget = (count = 1) => {
        const target = times(count, () => ({ id: uuidV1(), position: proposeLocation() }))

        setTargets([...target])
    }

    const proposeLocation = () => ({
        x: randomIntFromInterval(15, canvasState.width - 20),
        y: randomIntFromInterval(15, canvasState.height - 20),
    })

    const refreshCanvas = () => generateTarget(targetCount)

    const pulseTouched = ({ nativeEvent }, target: Target) => {
        const { pageX, pageY } = nativeEvent
        setTimeStamps((state) => [...state, new Date().getTime()])

        const remainingTargets = targets.filter((t) => t.id !== target.id)

        if (remainingTargets.length === 0) {
            return refreshCanvas()
        }
        // refreshCanvas()
        setTargets(remainingTargets)
        console.log(pageY)
    }

    const avgResponsetimes = getAverageTime(timeStamps)

    return (
        <View style={{ flex: 1 }} onLayout={onCanvasLayout}>
            {/* <View style={{ position: "absolute", left: 0, top: 100}}>
                <Pulse color="orange" numPulses={3} diameter={40} speed={20} duration={2000} />
            </View> */}
            <StatusBar backgroundColor={color.palette.white} barStyle="light-content" />
            {targets.map((target) => (
                // <Animatable.Text
                //     key={target.id}
                //     animation="pulse"
                //     easing="ease-out"
                //     iterationCount="infinite"
                //     style={{
                //         textAlign: "center",
                //         position: "absolute",
                //         left: target.position.x,
                //         top: target.position.y,
                //     }}
                // >
                //     ❤️
                // </Animatable.Text>

                <View
                    key={target.id}
                    style={{
                        position: "absolute",
                        left: target.position.x,
                        top: target.position.y,
                    }}
                    onTouchStart={(evt) => pulseTouched(evt, target)}
                >
                    <Pulse color="red" numPulses={8} initialDiameter={20} diameter={100} speed={1} duration={500} />
                </View>
            ))}

            <View>
                <Text>
                    {isNaN(avgResponsetimes) ? "" : (avgResponsetimes / 60).toFixed(2)} Seconds
                </Text>
            </View>
        </View>
    )
}

const getAverageTime = (timeStamps: number[]) => {
    const averageDelta = ([x, ...xs]: number[]) => {
        if (x === undefined) return NaN
        else return xs.reduce(([acc, last], x) => [acc + (x - last), x], [0, x])[0] / xs.length
    }

    // console.log(averageDelta(timeStamps), timeStamps)

    // return "_.mean(averageDelta(timeStamps))"

    return averageDelta(timeStamps)
}

export default VisualMotorProcessing
