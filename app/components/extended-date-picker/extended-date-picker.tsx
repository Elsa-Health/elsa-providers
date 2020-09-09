import React from "react"
import CustomPicker from "../custom-picker/custom-picker"
import { Row, Col, Text } from "../"
// import { Text } from "../text/text"

import { YEAR_NUMBERS, DAY_NUMBERS, MONTH_NAMES } from "../../common/constants"
import { isValidDate, pickerOptionsFromList, getMonthNumber, getYearsTo } from "../../common/utils"

interface ExtendedDatePickerProps {
    onDateSet: (date: Date) => any
    label: string
    defaultDate?: Date
    futureOnly?: boolean
}

const ExtendedDatePickerNoMemo: React.FC<ExtendedDatePickerProps> = ({
    onDateSet,
    label,
    defaultDate,
    futureOnly = false,
}) => {
    const validDefalt = isValidDate(defaultDate)
    const [state, setState] = React.useState({
        date: validDefalt ? defaultDate.getDate() : 1,
        month: validDefalt ? defaultDate.getMonth() : 0,
        year: validDefalt ? defaultDate.getFullYear() : new Date().getFullYear(),
    })

    React.useEffect(() => {
        const dateProposal = `${state.month + 1}/${state.date}/${state.year}`
        const isValid = isValidDate(new Date(dateProposal))
        if (isValid) {
            onDateSet(new Date(dateProposal))
        }
    }, [state.date, state.month, state.year])

    return (
        <Row>
            <Col md={12} marginVertical={8}>
                <Text size="h6">{label}</Text>
            </Col>
            <Col md={4}>
                <CustomPicker
                    options={pickerOptionsFromList(MONTH_NAMES)}
                    defaultFirstItem="Month"
                    defaultFirstItemValue=""
                    accessibilityLabel="Month"
                    selectedValue={MONTH_NAMES[state.month].toLowerCase()}
                    onChange={(v) => setState((state) => ({ ...state, month: getMonthNumber(v) }))}
                />
            </Col>

            <Col md={4}>
                <CustomPicker
                    options={pickerOptionsFromList(DAY_NUMBERS)}
                    defaultFirstItem="Day"
                    defaultFirstItemValue=""
                    accessibilityLabel="Day"
                    selectedValue={state.date}
                    onChange={(v) => setState((state) => ({ ...state, date: +v }))}
                />
            </Col>

            <Col md={4}>
                <CustomPicker
                    options={pickerOptionsFromList(futureOnly ? getYearsTo(2025) : YEAR_NUMBERS)}
                    defaultFirstItem="Year"
                    defaultFirstItemValue=""
                    accessibilityLabel="Year"
                    selectedValue={state.year}
                    onChange={(v) => setState((state) => ({ ...state, year: +v }))}
                />
            </Col>
        </Row>
    )
}

const ExtendedDatePicker = React.memo(ExtendedDatePickerNoMemo, (prev, next) => {
    return prev.defaultDate === next.defaultDate
})

export default ExtendedDatePicker
