import React from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./menu.styles";
import { Link } from "react-router-dom";

interface Status {
  // open: Function;
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu = ( {open, setOpen}: Status) => {
  return (
	  //when clicking on one of the links, close the nav bar
    <StyledMenu open={open}>
      <Link to="/login" className="text-styles" onClick={() => setOpen(!open)}>Login</Link>
      <Link to="/register" className="text-styles" onClick={() => setOpen(!open)}>Register</Link>
      <Link to="/dashboard" className="text-styles" onClick={() => setOpen(!open)}>Dashboard</Link>
    </StyledMenu>
  )
}

Menu.propTypes = {
	open: bool.isRequired,
}
export default Menu;