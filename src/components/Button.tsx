import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  background-color: ${(props) => {
    if (props.disabled) return "#cccccc";
    return props.variant === "secondary" ? "#6c757d" : "#007bff";
  }};
  color: white;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => {
      if (props.disabled) return "#cccccc";
      return props.variant === "secondary" ? "#5a6268" : "#0056b3";
    }};
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};
