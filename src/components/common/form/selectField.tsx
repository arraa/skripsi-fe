import { Controller, FieldErrors } from 'react-hook-form';

export interface ControllerSelectFieldProps {
  control: any; 
  name: string;
  label: string;
  id?: string;
  value?: string | number;
  options: { value?: string | number; label: string }[];
  placeholder: string;
  errors?: any;
}


export const ControllerSelectField = ({ control, name, id, label, options, placeholder, errors }: ControllerSelectFieldProps) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} id={name} className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75">
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value ? option.value : option.label}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors && <p className="text-xs italic text-red-500">{errors.message}</p>}
    </div>
  )