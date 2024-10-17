import React, { FC, ReactNode } from "react";

export const Greating: FC<{ message: string; children?: ReactNode }> = ({ message, children }) => {
  return (
    <>
      <div>{`Hello world! ${message}`}</div>
      {children}
    </>
  );
};
