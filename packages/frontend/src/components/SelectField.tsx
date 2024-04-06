import { SelectOption } from '@/types'
import { ControlledSelectField } from './ControlledSelectField'
import { Controller, useFormContext } from 'react-hook-form'

export function SelectField({
  className,
  name,
  options,
}: React.ComponentPropsWithoutRef<'select'> & {
  name: string
  options: SelectOption[]
}) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <ControlledSelectField
          className={className}
          value={value}
          onChange={onChange}
          options={options}
        />
      )}
    />
  )
}
