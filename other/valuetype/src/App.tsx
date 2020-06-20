import * as React from "react";
import { useState } from "react";
import Select, { ValueType } from "react-select";

import "./styles.css";

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const MyComponent = () => {
  const [selectedOption, setSelectedOption] = useState<ValueType<OptionType>>();

  const handleChange = (option: ValueType<OptionType>) => {
    setSelectedOption(option);
  };

  return (
    <Select
      value={selectedOption as ValueType<OptionType>}
      onChange={(option: any) => handleChange(option)}
      options={options}
    />
  );
};

export default function App() {
  return (
    <div className="App">
      <MyComponent />
    </div>
  );
}
