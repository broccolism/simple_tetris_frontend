import React from "react";

import { StyledMainHall } from "./styles/StyledMainHall";
import { StyledMainHallButton } from "./styles/StyledMenu";
import Menu from "./Menu";

const MainHall = () => {
  return (
    <StyledMainHall>
      <Menu text="1P" />
      <Menu text="2P" />
      <Menu text="ONLIN" />
      <Menu text="SETTING" />
    </StyledMainHall>
  );
};

export default MainHall;
