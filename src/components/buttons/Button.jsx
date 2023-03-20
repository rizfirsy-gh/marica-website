import React from "react";
import Link from "next/link";
import propTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({
  type,
  variant,
  isLink,
  href,
  isClicked,
  className,
  children,
}) => {
  return (
    <button
      type={type !== "" ? type : "button"}
      className={`${className} ${
        variant === "primary"
          ? "bg-gradient-to-t from-pink-600 to-pink-400 text-sirsak drop-shadow-md"
          : "bg-transparent text-semangka border border-semangka"
      } px-5 py-3 rounded-lg`}
      onClick={isLink ? null : () => isClicked()}
    >
      {isLink ? <Link href={href}>{children}</Link> : <span>{children}</span>}
    </button>
  );
};

export default Button;

Button.propTypes = {
  variant: propTypes.oneOf(["primary", "secondary"]),
  isLink: propTypes.bool,
};