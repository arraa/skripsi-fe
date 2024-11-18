// import { Controller } from 'react-hook-form';

// export interface ControllerSelectFieldProps {
//   control: any;
//   name: string;
//   label: string;
//   id?: string;
//   value?: string | number;
//   options: { value?: string | number; label: string }[];
//   placeholder: string;
//   errors?: any;
//   noDefault?: boolean;
// }

// export const ControllerSelectField = ({
//   control,
//   name,
//   id,
//   label,
//   options,
//   placeholder,
//   errors,
//   value,
//   noDefault
// }: ControllerSelectFieldProps) => (
//   <div className='flex flex-col gap-2 '>
//     <label htmlFor={name}>{label}</label>
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <select
//           key={id}
//           {...field}
//           id={name}
//           className=' max-h-40 overflow-y-auto rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75 '
//         >
//           defaultValue={value || ''}
//           {noDefault ? null :

//           <option
//             key={name}
//             value=''
//           >
//             {placeholder}
//           </option>
//           }
//             {options.map((option) => (
//               <option
//                 key={option.value ? option.value : option.label}
//                 value={option.value ? option.value : option.label}
//                 className='align-bottom'
//               >
//                 {option.label}
//               </option>
//             ))}
//         </select>
//       )}
//     />
//     {errors && <p className='text-xs italic text-red-500'>{errors.message}</p>}
//   </div>
// );

import { Controller } from 'react-hook-form';

export interface ControllerSelectFieldProps {
  control: any;
  name: string;
  label: string;
  id?: string;
  value?: string | number;
  options: { value?: string | number; label: string }[];
  placeholder?: string;
  errors?: any;
  noDefault?: boolean;
  onChange?: (value: string) => void;
}

export const ControllerSelectField = ({
  control,
  name,
  id,
  label,
  options,
  placeholder,
  errors,
  value,
  noDefault,
  onChange,
}: ControllerSelectFieldProps) => (
  <div className='flex flex-col gap-2'>
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
        defaultValue={value || ''} // this will be handled by react-hook-form
          {...field}
          id={id || name}
          className='max-h-40 overflow-y-auto rounded-md bg-[#3F79B4]/10 p-4 focus:outline-[#2D2D2D]/75'
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (onChange) {
              onChange(selectedValue); // Trigger the onChange handler if provided
            }
            field.onChange(e); // Always call field.onChange to ensure react-hook-form is updated
          }}
        >
          {!noDefault && (
            <option key={name} value="">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value ? option.value : option.label}
              value={option.value ? option.value : option.label}
              className='align-bottom'
            >
              {option.label}
            </option>
          ))}
        </select>

      )}
    />
    {errors && <p className='text-xs italic text-red-500'>{errors.message}</p>}
  </div>
);
