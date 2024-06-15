import React from "react";
import {
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

interface FormLabelInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage?: string;
}

const FormLabelInput: React.FC<FormLabelInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  errorMessage,
}) => (
  <FormControl isInvalid={!!errorMessage}>
    <FormLabel>{label}</FormLabel>
    <Input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
  </FormControl>
);

export default FormLabelInput;
