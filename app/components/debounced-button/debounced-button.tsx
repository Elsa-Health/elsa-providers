import React from "react"
import { debounce } from "lodash" // 4.0.8

interface Props {
    onPress: Function
}

const withPreventDoubleClick = (WrappedComponent: any) => {
    class PreventDoubleClick extends React.PureComponent<Props, {}> {
        debouncedOnPress = () => {
            this.props.onPress && this.props.onPress()
        }

        onPress = debounce(this.debouncedOnPress, 300, { leading: true, trailing: false })

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress} />
        }
    }

    // @ts-ignore
    PreventDoubleClick.displayName = `withPreventDoubleClick(${
        WrappedComponent.displayName || WrappedComponent.name
    })`
    return PreventDoubleClick
}

export { withPreventDoubleClick }
