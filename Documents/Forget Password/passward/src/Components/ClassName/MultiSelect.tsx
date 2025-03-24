// icon parent include label icons
export function iconParentSelf(icon_position: any, icon: any) {
  return `grid cursor-pointer 
    ${
      icon_position === 'left'
        ? icon
          ? 'grid-cols-[auto,1fr,auto]'
          : 'grid-cols-[1fr,auto]'
        : icon
          ? 'grid-cols-[1fr,auto,auto]'
          : 'grid-cols-[1fr,auto]'
    }
    relative rounded-[4px]`;
}

export function iconsSelf(focus: boolean, isOpen: boolean) {
  return `grid bg-light-gray w-[45px]  justify-center items-center text-dark-gray rounded-l-[4px] bg-transparent duration-300 text-[24px] ${focus ? 'text-primary-color' : 'text-border-color'} ${isOpen ? 'rotate-0' : 'rotate-180'}`;
}

export function DropdownOptionsParent() {
  return `relative`;
}

export function DropdownOptionParent() {
  return `absolute top-[5px] z-10 bg-model-background-color bg-white rounded-[4px] w-full overflow-hidden transition-all duration-300 p-[8px]`;
}

export function DropdownOption(options_icon_position: string) {
  return `rounded-[3px] text-text-color hover:bg-option-hover hover:pl-[3px] text-[14px] duration-300 ease-in-out cursor-pointer grid ${options_icon_position == 'left' ? 'grid-cols-[auto,1fr]' : 'grid-cols-[1fr,auto]'}`;
}

export function DropdownIcon() {
  return `w-[33px] flex justify-center items-center`;
}

export function DropdownLabel() {
  return `py-[6px] px-2`;
}

export function MultiSelectOutlineLabel(
  focus: boolean,
  label_position: string,
  value: { label: string; value: string }[],
  error: boolean,
  validation: boolean
) {
  return `${focus === true ? 'text-primary-color' : error && validation ? 'text-red' : 'text-light-gray'} ${label_position === 'outline' ? `block absolute translate-y-[-50%] px-1 ${value.length === 0 && !focus ? 'top-[50%] duration-300' : 'top-[0%] scale-75 duration-300 bg-background-color'}` : 'hidden'}`;
}
