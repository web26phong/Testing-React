import React from "react";
import {render, fireEvent, wait} from "@testing-library/react";
import App from "../App";
import StarWarsCharacters from "./StarWarsCharacters";
import {getData as mockGetData} from "../api";

jest.mock('../api/');

const initialData = {
    next: "next link",
    previous: null,
    results: [
        {name: "name1", url: "asdf"}, 
        {name: "name2", url: "asdf"}
    ]
}

test("Buttons rendered and working", async ()=>{
    const {getByText} = render(<StarWarsCharacters />);
    const previousButton = getByText(/previous/i);
    const nextButton = getByText(/next/i);

    mockGetData.mockResolvedValue(initialData)


    // const url = initialData.next;

    fireEvent.click(previousButton);
    // fireEvent.click(nextButton);
    expect(mockGetData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledWith("https://swapi.co/api/people");

    await wait(()=> expect(getByText(/name1/i)));
    getByText(/name1/i);
})