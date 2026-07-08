import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';

export type ToggleButtonsOption<T> = {
  value: T;
  title: string;
};

interface Props<T = string> extends ToggleButtonGroupProps {
  value: T;
  onOptionChange: (value: T) => void;
  options: ToggleButtonsOption<T>[];
}

export const ToggleButtons = <T,>({
  value,
  onOptionChange,
  options,
  ...props
}: Props<T>) => {
  return (
    <ToggleButtonGroup
      {...props}
      value={value}
      onChange={(_, value: T | null) => {
        if (value) {
          onOptionChange(value);
        }
      }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value as string}
          value={option.value as string}
        >
          {option.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
