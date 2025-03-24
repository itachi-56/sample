export function inputComponent(labelPosition: string) {
  return `w-full pt-[6px] -translate-y-[3px] transform-none ${labelPosition === 'left' ? leftLabel : topLabel}`;
}

export function inputParent(
  focus: boolean,
  error: boolean,
  validation: boolean,
  border?: boolean,
  bg?: boolean
) {
  return `grid grid-rows-1 border bdr-input-border-default-color box-border ${bg ? 'bg-application-theme' : ''}  rounded-input-border-radius ${error && validation ? 'bdr-input-border-error-color duration-200' : focus === true ? 'bdr-input-border-focus-color duration-200' : ' duration-200'}`;
}

export function iconParent(iconPosition: string, icon: boolean): string {
  return `grid ${
    iconPosition === 'left'
      ? icon
        ? 'grid-cols-[auto,1fr]'
        : 'grid-cols-[1fr]'
      : icon
        ? 'grid-cols-[1fr,auto]'
        : 'grid-cols-[1fr]'
  } relative rounded-[4px]`;
}

export function icons(icon: boolean, iconPosition: string) {
  return `grid bg-light-gray justify-center items-center ${icon ? 'block' : 'hidden'} text-dark-gray ${iconPosition === 'left' ? 'rounded-l-[4px]' : 'rounded-r-[4px]'}`;
}

export function inputLabel(labelPosition: string) {
  return ` tracking-wide text-color-input-label-font-color font-input-label-font-weight text-input-label-font-size ${labelPosition === 'top' ? 'pb-1' : ''} ${labelPosition === 'outline' ? 'hidden' : 'block'}`;
}
export function requiredVisible(required: boolean) {
  return required
    ? `inline-block ${false ? 'text-color-input-required-focus-color' : 'text-color-input-required-color'}`
    : 'hidden';
}
export const leftLabel =
  'grid grid-cols-[100px,1fr] md:grid-cols-[150px,1fr] gap-2';
export const topLabel = 'grid grid-rows-[auto,auto]';
export function outlineLabel(
  focus: boolean,
  labelPosition: string,
  value: string | [],
  error: boolean,
  validation: boolean
) {
  return `${error && validation ? 'text-color-input-error-font-color' : focus === true ? 'text-color-input-outline-label-font-color' : 'text-color-input-label-font-color'} ${labelPosition === 'outline' ? `block absolute translate-y-[-50%] px-[4px] translate-x-2 ${value.length === 0 && !focus ? 'top-[50%] duration-300' : 'top-[0%] scale-75 duration-300 bg-application-theme'}` : 'hidden'}`;
}

export function input(icon: boolean, iconPosition: string, width?: number) {
  return `focus:outline-none h-full ${(width as number) < 100 ? 'pl-[6px] text-center' : 'px-3'} w-full text-color-input-value-font-color text-input-value-font-size font-input-value-font-weight tracking-wide	bg-application-theme ${icon ? (iconPosition === 'left' ? 'rounded-r-[5px]' : 'rounded-l-[5px]') : 'rounded-[5px]'}`;
}

export const helperTextEle = `flex gap-2 items-center text-input-helper-text-font-size text-color-input-helper-text-font-color pt-1 pt-[3px] absolute top-0 left-0 font-input-helper-text-font-weight`;

export const validationErrorEle = `flex items-center gap-2 text-color-input-error-font-color text-input-error-font-size font-input-error-font-weight pt-[3px] absolute top-0 left-0`;

export function mousePointer(type: string) {
  return `${type === 'pointer' ? 'flex gap-2 items-center text-[13px] text-red font-normal pt-[3px]' : ''}`;
}

export function shadow() {
  return 'options-shadow p-5 ';
}

export function selfInput(icon: boolean, iconPosition: string, width?: number) {
  return `focus:outline-none h-full ${(width as number) < 100 ? 'pl-[6px] text-center' : 'px-3'} w-full text-color-non-editable-input-font-color text-non-editable-input-label-size font-non-editable-input-label-weight bg-non-editable-input-bg-color ${icon ? (iconPosition === 'left' ? 'rounded-r-[5px]' : 'rounded-l-[5px]') : 'rounded-[5px]'}`;
}

export function selfInputLabel(labelPosition: string) {
  return `text-text-color-non-editable-input-label-color text-non-editable-input-label-weight font-non-editable-input-label-size ${labelPosition === 'top' ? 'pb-1' : ''} ${labelPosition === 'outline' ? 'hidden' : 'block'}`;
}
