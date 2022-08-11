import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@consta/uikit/TextField";
import { Text } from "@consta/uikit/Text";


interface ITextFieldProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  width?: any;

  defaultValue?: any;
  shouldUnregister?: any;

  rules?: {};
  control?: any;

  required?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  icon?: string;

  handleChange?: VoidFunction;
  onBlur?: VoidFunction;
}

const TextFieldCustom: FC<ITextFieldProps> = (props, ...textFieldProps) => {
  //function TextFieldCustom({ name, type, placeholder, value, ...textFieldProps }: ITextFieldProps) {
  const context = useFormContext();
  const renderTextField = ({ field, fieldState, formState }: any) => {
    const { onChange, onBlur, value, ref } = field;
    // const handleChange = ({ e }: { e: string | null }) => {
    //   onChange(e);
    // };
    return (
      <div>
        <TextField
          {...textFieldProps}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.onBlur}
          width={props.width}
          caption={fieldState.error && fieldState.error.message}
        //ref={props.ref}
        />

        
      </div>
    );
  };

  return (
    <Controller
      name={props.name}
      rules={props.rules}
      defaultValue={props.defaultValue}
      control={props.control || context.control}
      shouldUnregister={props.shouldUnregister}
      render={renderTextField}
    />
  )
}

export default TextFieldCustom;




