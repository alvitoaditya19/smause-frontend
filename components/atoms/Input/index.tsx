/* eslint-disable react/jsx-props-no-spreading */
import { InputHTMLAttributes } from 'react';
import cx from "classnames";


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: String;
  placeHolder: string;
  status: boolean;
  typeInput:boolean;
}


export default function Input(props:Partial<InputProps>) {
  const { label,placeHolder,status,typeInput, ...nativeProps } = props;

  return (
    <>
      <label
        htmlFor="name"
        className="form-label text-lg fw-medium text-black mb-3"
      >
        {label}
      </label>
      <input
        type={typeInput ? "password" : "text"}
        disabled = {status}
        className= {status ? "form-control rounded-full text-lg bg-grey4 inline lg:min-w-[440px] min-w-0" : "form-control rounded-full text-lg bg-background4 inline lg:min-w-[440px] min-w-0"}
        id="name"
        name="name"
        aria-describedby="name"
        placeholder={placeHolder}
        {...nativeProps}
      />
    </>
  );
}
