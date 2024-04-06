import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'

export function TextField({
  className,
  id,
  name,
  placeholder,
  type = 'text',
}: React.ComponentPropsWithoutRef<'input'> & {
  name: string
}) {
  const { register } = useFormContext()

  return (
    <div className={className}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={formClasses}
      />
    </div>
  )
}

export function TextareaField({
  className,
  name,
  ...props
}: React.ComponentPropsWithoutRef<'textarea'> & {
  name: string
}) {
  const { register } = useFormContext()

  return (
    <div className={className}>
      <textarea
        {...props}
        {...register(name)}
        className={clsx(formClasses, 'resize-none')}
      />
    </div>
  )
}

export function SelectField({
  className,
  name,
  ...props
}: React.ComponentPropsWithoutRef<'select'> & { name: string }) {
  const { register } = useFormContext()

  return (
    <div className={className}>
      <select
        {...props}
        {...register(name)}
        className={clsx(formClasses, 'pr-8')}
      />
    </div>
  )
}
