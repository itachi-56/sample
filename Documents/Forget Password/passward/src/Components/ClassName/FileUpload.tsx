export function outlineLabel(
  focus: boolean,
  label_position: string,
  value: File[] | undefined,
  error: boolean,
  validation: boolean
) {
  return `${focus === true ? 'text-primary-color' : error && validation ? 'text-red' : 'text-light-gray'} ${label_position === 'outline' ? `block absolute translate-y-[-50%] px-1 ${(value?.length || 0) === 0 && !focus ? 'top-[50%] duration-300' : 'top-[-1px] scale-75 duration-300 bg-background-color'}` : 'hidden'}`;
}
