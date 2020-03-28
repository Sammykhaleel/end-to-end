import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";

describe("<CitySearch /> component", () => {
  let CitySearchWrapper;
  beforeAll(() => {
    CitySearchWrapper = shallow(<CitySearch />);
  });
  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });
  test("render list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });
  test("render text input correctly", () => {
    const query = CitySearchWrapper.state("query");
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });
  test("change state when text input changes", () => {
    const eventObject = { target: { value: "Berlin" } };
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });
  test("render list of suggestions correctly", () => {
    const suggestions = CitySearchWrapper.state("suggestions");
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(
      suggestions.length
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(
        CitySearchWrapper.find(".suggestions li")
          .at(i)
          .text()
      ).toBe(suggestions[i].name_string);
    }
  });
  test("click on suggestion should change query state", () => {
    CitySearchWrapper.setState({
      suggestions: [
        {
          city: "Kitchener",
          country: "ca",
          localized_country_name: "Canada",
          state: "ON",
          name_string: "Kitchener, Ontario, Canada",
          zip: "N2A 0A1",
          lat: 43.44,
          lon: -80.43
        },
        {
          city: "Kitchener",
          country: "ca",
          localized_country_name: "Canada",
          state: "BC",
          name_string: "Kitchener, British Columbia, Canada",
          zip: "V0B 1W0",
          lat: 49.17,
          lon: -116.33
        }
      ]
    });

    CitySearchWrapper.find(".suggestions li")
      .at(0)
      .simulate("click");
    expect(CitySearchWrapper.state("query")).toBe("Kitchener, Ontario, Canada");
  });
});