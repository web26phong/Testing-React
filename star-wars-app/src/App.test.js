import React from "react";
import {render} from "@testing-library/react";
import App from "./App";
import StarWarsCharacters from "./components/StarWarsCharacters";

test("Previous and Next buttons are rendered", ()=>{
    const {getByText} = render(<StarWarsCharacters />);

    getByText(/Previous/i);
    getByText(/Next/i);
})