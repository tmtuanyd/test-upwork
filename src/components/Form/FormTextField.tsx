import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SafeAny } from '../../models';

export interface InputFieldProps {
  label: string;
  name: string;
  control: SafeAny;
  disabled?: boolean;
  reset?: boolean;
  type?: 'string' | 'integer' | 'float';
  notShowErrorText?: boolean;
}

const FormTextField = ({
  label,
  control,
  name,
  reset,
  type,
  disabled,
  notShowErrorText = false
}: InputFieldProps) => {
  const { resetField, setValue, trigger } = useFormContext();
  const handleClear = useCallback(() => {
    resetField(name);
  }, [resetField, name]);

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (type === 'integer' && e.currentTarget.value.match(/^[0-9]*$/)) {
        setValue(name, e.currentTarget.value);
        await trigger(name);
        return;
      }
      if (
        type === 'float' &&
        (e.currentTarget.value.match(/^\d{1,}(\.\d{0,4})?$/) || e.currentTarget.value === '')
      ) {
        setValue(name, e.currentTarget.value);
        await trigger(name);
        return;
      }
      if (type === 'string' || type === undefined) {
        setValue(name, e.currentTarget.value);

        if (type === 'string') {
          await trigger(name);
        }
        return;
      }
      setValue(name, e.currentTarget.value.slice(0, -1));
    },
    [trigger, type, name, setValue]
  );

  const properties = useMemo(() => {
    return type ? { onChange: handleChange } : {};
  }, [handleChange, type]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { ...fieldProps } = field;
        return (
          <TextField
            {...fieldProps}
            inputRef={field.ref}
            disabled={disabled}
            {...properties}
            fullWidth
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message && !notShowErrorText ? fieldState.error.message : undefined
            }
            label={label}
            type={'text'}
            InputProps={{
              endAdornment: reset ? (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClear} edge='end'>
                    {<Clear />}
                  </IconButton>
                </InputAdornment>
              ) : null
            }}
          />
        );
      }}
    />
  );
};

export default FormTextField;
