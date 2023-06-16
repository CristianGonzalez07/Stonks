import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const CustomSelect = ({ label, items, value, handleChange, disabled }: { label: string, items: string[], value:string, handleChange:(event: SelectChangeEvent) => void, disabled: boolean }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                sx={{ width: "150px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={label}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            >
                {
                    items.map((item,index) => <MenuItem key={index} value={item}>{item}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
