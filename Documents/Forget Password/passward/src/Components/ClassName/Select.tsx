export function iconParentSelf(icon_position: any, icon: any) {
  return `grid ${
    icon_position === 'left'
      ? icon
        ? 'grid-cols-[auto,1fr,auto]'
        : 'grid-cols-[1fr,auto]'
      : icon
        ? 'grid-cols-[1fr,auto,auto]'
        : 'grid-cols-[1fr,auto]'
  } relative rounded-[4px]`;
}

export function iconsSelf(focus: boolean, isOpen: boolean) {
  return `grid bg-light-gray   justify-center items-center text-dark-gray rounded-l-[4px] bg-transparent duration-300 text-dd-arrow-icon-size ${focus ? 'text-primary-color' : 'text-border-color'} ${isOpen ? 'rotate-180' : 'rotate-0'}`;
}

export function DropdownOptionsParent() {
  return `relative`;
}

export function DropdownOptionParent(isOverflowing: boolean, isOpen: boolean) {
  return `absolute ${isOverflowing ? 'bottom-[5px]' : 'top-[5px]'} ${!isOpen ? 'bottom-[5px]' : ''}  z-[999] bg-dd-options-container-bg-color rounded-[4px] w-full overflow-hidden transition-all duration-300 p-[8px] `;
}

export function DropdownOverflow(optionsCount:number) {
  return ` ${optionsCount > 10 ? "h-[320px] overflow-y-scroll" : "" }`
}

export function DropdownOption(
  options_icon_position: string,
  selected: boolean
) {
  return `rounded-[3px]  hover:pl-[3px]  duration-300 ease-in-out cursor-pointer grid ${selected ? 'bg-dd-options-selected-bg-color text-dd-options-selected-font-size text-color-dd-options-selected-font-color font-dd-options-selected-font-weight' : 'bg-dd-options-bg-color hover:bg-dd-options-hover-bg-color text-dd-options-deafult-font-size hover:dd-options-hover-font-size text-color-dd-options-deafult-font-color hover:text-color-dd-options-hover-font-color font-dd-options-deafult-font-weight hover:font-dd-options-hover-font-weight'} ${options_icon_position == 'left' ? 'grid-cols-[auto,1fr]' : 'grid-cols-[1fr,auto]'}`;
}

export function DropdownIcon() {
  return `w-[33px] flex justify-center items-center text-hdd-selected-text-remove-icon-color`;
}

export function DropdownLabel(selected: boolean) {
  return `h-dd-option-to-option-height w-full flex items-center truncate px-2 ${selected ? '' : ''}`;
}
