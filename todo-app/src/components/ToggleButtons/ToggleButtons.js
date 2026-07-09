import { ToggleButton, ToggleButtonGroup, } from '@mui/material';
export const ToggleButtons = ({ value, onOptionChange, options, ...props }) => {
    return (<ToggleButtonGroup {...props} value={value} onChange={(_, value) => {
            if (value) {
                onOptionChange(value);
            }
        }}>
      {options.map((option) => (<ToggleButton key={option.value} value={option.value}>
          {option.title}
        </ToggleButton>))}
    </ToggleButtonGroup>);
};
