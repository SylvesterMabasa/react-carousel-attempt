import React from "react";
import CarouselImage from "./carouselImage";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe(">>> C O M P O N E N T --- <CarouselImage />", () => {
  it("should shallow render", () => {
    const wrapper = shallow(<CarouselImage />);
    expect(wrapper).toHaveLength(1);
  });
});
