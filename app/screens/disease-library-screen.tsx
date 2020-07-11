import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList } from "react-native"
import { List, Divider } from 'react-native-paper'
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"

export interface DiseaseLibraryScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pneumonia',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Urinary Tract Infection',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Bronchitis',
  },

  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f631',
    title: 'Asthma',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d722',
    title: 'Intestinal Worms',
  },

];

const DiseaseListItem = ({item}:{item:any}) => {
  return (
    <>
    <List.Item
      title={item.title}
      right={props => <List.Icon {...props} icon="chevron-right" />}
    />
    <Divider/>
    </>
  )
}
const DiseaseList = () => {
  const renderItem=({item})=>(
    <DiseaseListItem item={item}/>
  )

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
export const DiseaseLibraryScreen: React.FunctionComponent<DiseaseLibraryScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText="Disease Library" />
      <View style={{ padding: 10 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, marginRight: 12, marginTop: 5, backgroundColor: "#e5e5e5", height: 150 }}>

          </View>
          <View style={{ flex: 1 }}>
            <Text>The Disease Library is a collection of information for you to read and share with your clients. It will help inform you about each of the diseases in the Elsa Health Assistant.</Text>
          </View>
        </View>
        <View style={{
          marginTop: 12,
          marginHorizontal: -10,
        }}>
          <Divider />

          {/* list issue to be fixed */}
          <DiseaseList/>
        </View>
      </View>
    </Screen>
  )
})
