import React from "react";
import {render, fireEvent, wait} from "@testing-library/react";
import StarWarsCharacters from "./components/StarWarsCharacters";
import {getData as mockGetData} from "./api";

jest.mock('./api/');

test("Buttons rendered and working", async ()=>{
    mockGetData.mockResolvedValue({
        next: "next link",
        previous: "previous link",
        results: [
            {name: "name1", url: "url1"}, 
            {name: "name2", url: "url2"}
        ]
    })

    const {getByText} = render(<StarWarsCharacters />);
    const previousButton = getByText(/previous/i);
    const nextButton = getByText(/next/i);

    
    // const url = initialData.next;

    fireEvent.click(previousButton);
    fireEvent.click(nextButton);
    expect(mockGetData).toHaveBeenCalledTimes(1);
    expect(mockGetData).toHaveBeenCalledWith("https://swapi.co/api/people");

    await wait(()=> expect(getByText(/name1/i)));
    getByText(/name1/i);
})