import React from "react";
import { FormLabel, Select, FormControl } from "@chakra-ui/react";

interface FormLabelSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

const FormLabelSelect: React.FC<FormLabelSelectProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormLabelSelect;
