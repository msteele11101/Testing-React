import React from "react"
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";
import App from "../App";


// test("App renders without crashing", () => {
//         render(<App />);
//     });
    
// test("Star Wars Characters page renders without crashing", () => {
//         render(<StarWarsCharacters />);
//     });

jest.mock("../api");

test('renders characters w/ buttons', async () => {
    mockGetData.mockResolvedValue({
        id: 1,
        next: "https://swapi.co/api/people",
        previous: "https://swapi.co/api/people",
        results: [
            {
                name: 'Luke Skywalker', url: 'Test'
            },{
                name: 'Han Solo', url: 'test'
            }
        ]})

    // const newData = {
    //     next: "https://swapi.co/api/people/?page=3",
    //     previous: "https://swapi.co/api/people/?page=1"
    // };

    const { getByText } = render(<StarWarsCharacters />);

    fireEvent.click(getByText("Next"));
    fireEvent.click(getByText("Previous"))

    expect(mockGetData).toHaveBeenCalledTimes(1);

    wait(() => getByText(/Next/i))
    wait(() => getByText(/Previous/i))

})