import { TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';


interface ReusableTextFieldProps<T extends FieldValues> {
    className?:string;
    name: Path<T>;
    control: Control<T>;
    label?: string;
    type?: string;
    rules?: object;
    width?: number;
    placeholder?:string;
    marginleft?: number;
    [x: string]: any;
  }
function ReusableTextField<T extends FieldValues>({
    className,
    name,
    control,
    label,
    type='text',
    rules,
    width,
    placeholder,
    marginleft,
    ...rest
}:ReusableTextFieldProps<T>){
    return(
        <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field,fieldState:{error}})=>(
            <TextField
            sx={{width:width,marginLeft:marginleft}}
            className={className}
            {...field}
            label={label}
            type={type}
            error={!!error}
            helperText={error?error.message:""}
            placeholder={placeholder}
            fullWidth
            // margin="normal"
            {...rest}
            />
        )}
        />
    )
}
export default ReusableTextField;