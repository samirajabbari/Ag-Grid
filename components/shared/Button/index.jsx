import { Button as MButton } from "@mui/material";
import PropTypes from "prop-types";

function Button({ style, variant, color, onClick, title, type }) {
  return (
    <MButton
      onClick={onClick}
      variant={variant}
      color={color}
      sx={style}
      type={type}
    >
      {title}
    </MButton>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf(["primary", "secondary"]),
  variant: PropTypes.oneOf(["contained", "outlined"]),
  type: PropTypes.oneOf(["primary", "text", "reset"]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  title: "جستجو",
  style: {},
  color: "primary",
  variant: "contained",
  type: "",
  onClick: () => null,
};

export { Button };
