import { ReactNode } from 'react';
import { IconContext } from 'react-icons';

interface IIconProps extends IconContext {
  children: ReactNode;
}

export function Icon({ children, ...props }: IIconProps) {
  return <IconContext.Provider value={props}>{children}</IconContext.Provider>;
}
