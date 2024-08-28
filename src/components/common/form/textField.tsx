import { Controller } from 'react-hook-form';

export const ControllerField = ({
  control,
  name,
  label,
  placeholder,
  errors,
  type = 'text',
}: any) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          id={name}
          placeholder={placeholder}
          className="rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75"
          type={type}
        />
      )}
    />
    {errors && <p className="text-xs italic text-red-500">{errors.message}</p>}
  </div>
);
