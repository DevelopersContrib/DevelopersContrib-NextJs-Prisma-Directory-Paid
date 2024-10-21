import React from "react";

type Props = {
  msg: string;
};

const ErrorBlock = ({ msg }: Props) => {
  return (
    <div className="d-block text-danger small mt-2">
            {msg}
        </div>
  );
};

export default ErrorBlock;
