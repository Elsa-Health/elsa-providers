import React from "react"
import { render } from "@testing-library/react-native"
import BulletList from "./bullet-list"

test("it renders", () => {
    const { getByText } = render(<BulletList id="testBullet" items={[]} />)
})
