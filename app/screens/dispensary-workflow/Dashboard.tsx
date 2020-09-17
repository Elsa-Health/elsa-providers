import React from "react"
import { StatusBar, View } from "react-native"
import { Text } from "../../components"

const Dashboard = () => {
    return (
        <View>
            <StatusBar backgroundColor="white" barStyle="light-content" />

            <Text size="h5">Dispensary Workflow</Text>

            <Text>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium exercitationem
                molestias culpa quaerat voluptatem ratione quo perspiciatis numquam vero?
                Repellendus nobis mollitia expedita aut numquam deserunt tempore qui nemo
                recusandae!
            </Text>
        </View>
    )
}

export default Dashboard
