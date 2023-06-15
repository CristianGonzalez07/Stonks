import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface Props {
  selectedDate:Dayjs | null;
  label: string;
  format: string;
  minDate: Dayjs | null;
  handleChange: (date: any) => void;
  handleError: (newError: string | null) => void;
  errorMessage: string;
  disabled: boolean;
}

const CustomDateTimePicker: React.FC<Props> = ({ selectedDate, label, format, minDate, handleChange, handleError, errorMessage, disabled }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        disabled={disabled}
        label={label}
        format={format}
        value={selectedDate}
        onChange={handleChange}
        onError={handleError}
        slotProps={{
          textField: {
            helperText: errorMessage,
          },
        }}
        minDate={minDate}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
