import { Button as MButton } from "@mui/material";
import PropTypes from "prop-types";

function Button({ style, variant, color, onClick, title }) {
  return (
    <MButton onClick={onClick} variant={variant} color={color} sx={style}>
      {title}
    </MButton>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf(["primary", "secondary"]),
  variant: PropTypes.oneOf(["contained", "outlined"]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  title: "جستجو",
  style: {},
  color: "primary",
  variant: "contained",
  onClick: () => null,
};

export { Button };
