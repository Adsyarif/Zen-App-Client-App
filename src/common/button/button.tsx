import { FC, ButtonHTMLAttributes, ReactNode, PropsWithChildren } from "react";

export const enum ButtonStyles {
  BaseButton = "border-none",
  PrimaryButton = "bg-green-900 rounded-lg text-white p-2 my-5 font-semibold hover:bg-green-700",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ButtonStyle?: ButtonStyles;
  hidenButton?: boolean;
  activeButton?: boolean;
  isLoading?: boolean;
}

type ButtonCompnent = FC<ButtonProps> & PropsWithChildren;
const Button: ButtonCompnent = ({
  children,
  ButtonStyle = "",
  isLoading = false,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      disabled={isLoading}
      className={
        "hover:brightness-50 " +
        ButtonStyle +
        `${restProps.className ? " " + restProps.className : ""}`
      }
    >
      {children}
    </button>
  );
};

export default Button;
