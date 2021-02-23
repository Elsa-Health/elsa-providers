import React from "react"
import { View } from "react-native"
import { Text, TextInput, Button, Chip } from "react-native-paper"
import _ from "lodash"
import { Col } from "../col/col"
import { color, style, md } from "../../theme"
import { SearchAndSelectBarProps } from "./search-and-select-bar.props"

const SearchAndSelectBar: React.FC<SearchAndSelectBarProps> = ({
    options,
    selectedOptions,
    toggleOption,
    hideSelectedOptions,
    onChangeSearchString,
}) => {
    const [searchString, setSearchString] = React.useState("")

    React.useEffect(() => {
        onChangeSearchString && onChangeSearchString(searchString)
    }, [searchString])
    return (
        <React.Fragment>
            <Col md={12}>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginBottom: 5,
                    }}
                >
                    {!hideSelectedOptions &&
                        selectedOptions.map((option) => (
                            <Button
                                mode="outlined"
                                key={option}
                                onPress={() => toggleOption(option)}
                                style={[style.buttonOutline, { marginRight: 10, marginTop: 10 }]}
                                uppercase={false}
                                icon={{
                                    source: "close",
                                    direction: "rtl",
                                }}
                            >
                                <Text
                                    style={{
                                        color: color.primary,
                                        fontSize: md ? 18 : 14,
                                    }}
                                >
                                    {_.upperFirst(option)}
                                </Text>
                            </Button>
                        ))}
                </View>
            </Col>
            <Col md={12}>
                <TextInput
                    value={searchString}
                    keyboardType="default"
                    onChangeText={(text) => setSearchString(text)}
                    mode="outlined"
                    label="Search ... "
                    style={style.input}
                    underlineColor="transparent"
                    theme={{ colors: { primary: color.primary } }}
                />
            </Col>
            <View
                style={{
                    marginTop: 5,
                    borderRadius: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}
            >
                {searchString.length > 0 &&
                    options
                        .filter((opt) => opt.toLowerCase().includes(searchString.toLowerCase()))
                        .map((option) => (
                            <Chip
                                key={option}
                                style={{ padding: 5, marginRight: 5, marginTop: 5 }}
                                textStyle={{ fontSize: md ? 17 : 14 }}
                                onPress={() => {
                                    toggleOption(option)
                                    setSearchString("")
                                }}
                            >
                                {_.upperFirst(option)}
                            </Chip>
                        ))}
            </View>
        </React.Fragment>
    )
}

export default SearchAndSelectBar
