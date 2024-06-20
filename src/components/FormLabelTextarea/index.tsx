import React from "react";
import { FormLabel, Textarea, FormControl } from "@chakra-ui/react";

interface FormLabelTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  height?: string;
}

const FormLabelTextarea: React.FC<FormLabelTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  height = "150px",
}) => (
  <FormControl>
    <FormLabel>{label}</FormLabel>
    <Textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      resize="none"
      height={height}
    />
  </FormControl>
);

export default FormLabelTextarea;
