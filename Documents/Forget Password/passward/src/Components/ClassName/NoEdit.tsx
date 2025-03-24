export function selfInputComponent(labelPosition: string) {
  return `w-full pt-[6px] -translate-y-[3px] transform-none ${labelPosition === 'left' ? leftLabel : topLabel}`;
}

export const leftLabel =
  'grid grid-cols-[100px,1fr] md:grid-cols-[150px,1fr] gap-2';
export const topLabel = 'grid grid-rows-[auto,auto]';

export function selfInputParent(
  focus: boolean,
  error: boolean,
  validation: boolean,
  border?: boolean,
  bg?: boolean
) {
  return `grid grid-rows-1 bdr-non-editable-border-weight bdr-non-editable-border-color box-border ${bg ? 'bg-non-editable-input-bg-color' : ''}  rounded-non-editable-border-radius ${error && validation ? 'bdr-input-border-error-color ' : focus === true ? 'bdr-input-border-focus-color ' : ''}`;
}

export function selfRequiredVisible(required: boolean) {
  return required
    ? `inline-block ${false ? 'text-color-input-required-focus-color' : 'text-color-input-required-color'}`
    : 'hidden';
}

export function iconParentSelf(
  icon_position: 'left' | 'right',
  icon: boolean,
  labelIcon: boolean,
  labelIconPosition: 'left' | 'right'
) {
  // Base grid layout
  const gridColumns = [];

  // Add `icon` on the left if provided
  if (icon && icon_position === 'left') {
    gridColumns.push('auto');
  }

  // Add `labelIcon` on the left if provided
  if (labelIcon && labelIconPosition === 'left') {
    gridColumns.push('auto');
  }

  // Always include the main input in the center
  gridColumns.push('1fr');

  // Add `labelIcon` on the right if provided
  if (labelIcon && labelIconPosition === 'right') {
    gridColumns.push('auto');
  }

  // Add `icon` on the right if provided
  if (icon && icon_position === 'right') {
    gridColumns.push('auto');
  }

  return `grid grid-cols-[${gridColumns.join(',')}] relative rounded-[4px]`;
}

export function selfInput(icon: boolean, iconPosition: string, width?: number) {
  return `flex justify-start items-center focus:outline-none h-full  ${(width as number) < 100 ? 'pl-[6px] text-center' : 'px-3'} w-full text-color-non-editable-input-font-color text-non-editable-input-font-size font-non-editable-input-font-weight tracking-wide	 bg-not-editable-box-bg ${icon ? (iconPosition === 'left' ? 'rounded-r-[5px]' : 'rounded-l-[5px]') : 'rounded-[5px]'}`;
}

export function selfInputLabel(labelPosition: string) {
  return `text-color-non-editable-input-label-color tracking-wide	 text-non-editable-input-label-size font-non-editable-input-label-weight ${labelPosition === 'top' ? 'pb-1' : ''} ${labelPosition === 'outline' ? 'hidden' : 'block'}`;
}

export function selfOutlineLabel(labelPosition: string) {
  return `${labelPosition === 'outline' ? 'text-light-gray block  absolute translate-y-[-50%] px-[4px] translate-x-2 top-[0%] scale-75 duration-300 bg-background-color' : 'hidden'}`;
}

export function selfIcons(icon: boolean, iconPosition: string) {
  return `grid bg-not-editable-box-bg justify-center items-center ${icon ? 'block' : 'hidden'} text-dark-gray ${iconPosition === 'left' ? 'rounded-l-[4px]' : 'rounded-r-[4px]'}`;
}
