import React from "react";
import { bool, func } from "prop-types";
import { StyledBurger } from "./burger.styles";

interface Status {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//parse state into function
const Burger = ({ open, setOpen }: Status) => {
  return (
    //on 'open' state, when pressed return 'open' as 'false'
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <span />
      <span />
      <span />
    </StyledBurger>
  );
};

//show warning message if the following isn't the type it's specified as
Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;