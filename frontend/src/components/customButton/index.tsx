import * as S from "./styles";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  border?: string;
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: () => void;
  fontSize?: string;
  width?: string;
};

export function CustomButton({
  children,
  type,
  border,
  backgroundColor,
  color,
  hoverBackgroundColor,
  disabled = false,
  fontSize,
  width,
  onClick
}: Props) {
  return (
    <S.Button
      type={type}
      $border={border}
      $backgroundColor={backgroundColor}
      $color={color}
      $hoverBackgroundColor={hoverBackgroundColor}
      disabled={disabled}
      $fontSize={fontSize}
      $width={width}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
}
