import React from "react";
import {render, fireEvent, wait} from "@testing-library/react";
import StarWarsCharacters from "./components/StarWarsCharacters";
import {getData} from "./api";

jest.mock("./api");

const initialData = {
    next: "next url",
    previous: null,
    results: [{name: "name1", url: "urlOne"}]
}

const secondData = {
    next: "next2 url",
    previous: "previous url",
    results: [{name: "name2", url: "urlTwo"}]
}

test("Previous and Next buttons are rendered", async ()=>{
    getData.mockResolvedValueOnce(initialData)
    const {getByText} = render(<StarWarsCharacters />);

    const previousButton = getByText(/Previous/i);
    const nextButton = getByText(/Next/i);
    expect(getData).toHaveBeenCalledTimes(1);

    await wait(()=> expect(getByText(/name1/i)))

    getData.mockResolvedValueOnce(secondData); //give values for when next button clicked
    await wait(()=> fireEvent.click(nextButton)); //click next button

    await wait(()=> expect(getByText(/name2/i)))
    getByText(/name2/i);
    expect(getData).toHaveBeenCalledTimes(2);

    getData.mockResolvedValueOnce(initialData); //give values for when prev button clicked
    await wait(()=> fireEvent.click(previousButton)) //click previous button

    await wait(()=> expect(getByText(/name1/i)))
    getByText(/name1/i)

    expect(getData).toHaveBeenCalledTimes(3);
})