import { CloudArrowUpIcon } from '@heroicons/react/20/solid'
import { useFormContext } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect } from 'react'
import Image from 'next/image'

export function FileField({
  name,
  imageUrl,
}: {
  name: string
  imageUrl?: string
}) {
  const { register, setValue, unregister, watch } = useFormContext()

  const files = watch(name)

  const currentImageUrl =
    (files?.length && URL.createObjectURL(files[0])) || imageUrl

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, acceptedFiles, { shouldValidate: true })
    },
    [setValue, name],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    },
    maxFiles: 1,
    onDrop,
  })

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <div className="relative h-full w-full cursor-pointer" {...getRootProps()}>
      {currentImageUrl && (
        <Image
          src={currentImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          width={576}
          height={384}
        />
      )}
      <CloudArrowUpIcon
        className={`${
          isDragActive ? ' text-gray-600' : ' text-gray-300'
        } absolute inset-0 m-auto h-12 w-12 items-center justify-center`}
        aria-hidden="true"
      />
      <input
        type="file"
        className="sr-only"
        {...register(name)}
        {...getInputProps()}
      />
    </div>
  )
}
