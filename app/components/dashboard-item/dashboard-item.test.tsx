import React from "react"
import { render } from "@testing-library/react-native"
import DashboardItem, { DashboardItemProps } from "./dashboard-item"

const item: DashboardItemProps = {
    actionText: "Test Action Text",
    description: "Here is some dummy text for rendering in the description part of this dashboard item",
    title: "Card Title",
    route: ""
}

test("It mounts without crashing", () => {
    const { getByText, queryByTestId } = render(<DashboardItem {...item} />)
    expect(queryByTestId("itemImage")).toBeFalsy()
})
