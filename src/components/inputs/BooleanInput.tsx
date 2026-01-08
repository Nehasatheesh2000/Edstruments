// inputs/BooleanInput.tsx
import { FormControlLabel, Switch } from '@mui/material';

interface BooleanInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({ value, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={value ? 'True' : 'False'}
    />
  );
};
