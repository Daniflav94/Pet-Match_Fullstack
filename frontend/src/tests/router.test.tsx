import {render, screen} from "@testing-library/react"
import App from "../App"
import { BrowserRouter } from "react-router-dom";

describe('Routes', () => {
    test('Should render main route', () => {
        const { getByText } = render(<App />, {wrapper: BrowserRouter});

        expect(getByText("Como funciona")).toBeInTheDocument()
    })
})