import React from "react"
import CustomPicker from "../custom-picker/custom-picker"
import { Row, Col, Text } from "../"
import _ from "lodash"
// import { Text } from "../text/text"

import { YEAR_NUMBERS, DAY_NUMBERS, MONTH_NAMES } from "../../common/constants"
import { isValidDate, pickerOptionsFromList, getMonthNumber, getYearsTo } from "../../common/utils"
import moment from "moment"

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
    const validDefault = isValidDate(defaultDate)
    const dateofMonth = validDefault ? moment(defaultDate).utcOffset("+3").date() : 1

    const [state, setState] = React.useState({
        date: dateofMonth,
        month: validDefault ? new Date(defaultDate).getMonth() : 0,
        year: validDefault ? new Date(defaultDate).getFullYear() : new Date().getFullYear(),
    })

    React.useEffect(() => {
        const dateProposal = `${state.month + 1}/${state.date}/${state.year}`

        // FIXME: the dates are currently stored as UCT time ... not EAT ... FIX THIS!!
        const isValid = isValidDate(new Date(state.year, state.month, state.date))
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
                    selectedValue={MONTH_NAMES[state.month]?.toLowerCase()}
                    onChange={(v) => {
                        setState((state) => ({ ...state, month: getMonthNumber(v) }))
                    }}
                />
            </Col>

            <Col md={4}>
                <CustomPicker
                    options={pickerOptionsFromList(DAY_NUMBERS)}
                    defaultFirstItem="Day"
                    defaultFirstItemValue=""
                    accessibilityLabel="Day"
                    selectedValue={state.date}
                    onChange={(v) => {
                        // console.warn("Date: ", v)
                        setState((state) => ({ ...state, date: +v }))
                    }}
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
