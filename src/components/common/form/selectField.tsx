import { Controller } from 'react-hook-form';

export const ControllerSelectField = ({ control, name, label, options, placeholder, errors }: any) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} id={name} className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75">
            <option value="">{placeholder}</option>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
      {errors && <p className="text-xs italic text-red-500">{errors.message}</p>}
    </div>
  )