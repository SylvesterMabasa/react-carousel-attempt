import React from "react";
import CarouselContainer from "./carouselConatiner";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

describe(">>> C O M P O N E N T --- <CarouselContainer />", () => {
  it("should shallow render", () => {
    const wrapper = shallow(<CarouselContainer />);
    expect(wrapper).toHaveLength(1);
  });
});
