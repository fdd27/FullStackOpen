import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from '@mui/material'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState("");

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
