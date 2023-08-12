import { FC, ReactNode } from "react";

export const Show: FC<{
  children: ReactNode;
  fallback: ReactNode;
  when: boolean;
}> = (props) => {
  if (props.when) {
    return <>{props.children}</>;
  } else {
    return <>{props.fallback}</>;
  }
};
