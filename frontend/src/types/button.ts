export interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  icon?: React.ReactNode; // apapun yang bisa dirender sebagai ikon
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isAnimated?: boolean;
}
