import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { TextField } from "@consta/uikit/TextField";
import { Text } from "@consta/uikit/Text";

export const TextFieldCustom = ({
  name,
  rules,
  defaultValue,
  control,
  shouldUnregister,
  ...textFieldProps
}) => {
  // В случае использования FormProvider, можно не передавать control,
  // он будет взят из FormContext
  const context = useFormContext();

  const renderTextField = ({ field, fieldState, formState }) => {
    const { onChange, onBlur, value, ref } = field;
    const handleChange = ({ e }) => {
      onChange(e);
    };
    return (
      <div>
        <TextField
          {...textFieldProps}
          onChange={handleChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
        />
        {fieldState.error && (
          <Text view="alert">{fieldState.error.message}</Text>
        )}
      </div>
    );
  };

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      control={control || context.control}
      shouldUnregister={shouldUnregister}
      render={renderTextField}
    />
  );
};

export default TextFieldCustom;
