import React, { AnchorHTMLAttributes, ReactChild, ReactChildren } from "react";
import { useRouter } from "./hooks";

interface LinkProps extends AnchorHTMLAttributes<any> {
  to: string;
  children: ReactChild | ReactChildren | ReactChild[];
}

function Link({ to, children, onClick, ...otherProps }: LinkProps) {
  const { push } = useRouter();

  function handleClick(e: any) {
    e.preventDefault();
    push(to);
  }

  return (
    <a {...otherProps} href={to} onClick={handleClick}>{children}</a>
  )
}

export default Link;
