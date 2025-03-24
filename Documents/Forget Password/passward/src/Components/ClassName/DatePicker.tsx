export const calendar = () => {
  return ' text-center';
};

export const calendarHeader = () => {
  return 'grid grid-cols-3 item-center mb-[10px]';
};

export const calendarDaysAndDates = () => {
  return 'grid grid-cols-7';
};

export const box = () => {
  return 'p-[10px] cursor-pointer';
};

export const todays = () => {
  return 'text-primary-in-text-color bg-primary-color selected-date-shadow';
};

export const onlyToday = () => {
  return 'today-date-shadow';
};

export const emptys = () => {
  return 'invisible';
};

export const selected = () => {
  return 'text-primary-in-text-color bg-primary-color today-date-shadow';
};

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

export function iconsSelf(focus: boolean, isOpen: boolean, error: boolean) {
  return `grid bg-light-gray   justify-center items-center text-dark-gray rounded-l-[4px] bg-transparent duration-300 text-[24px] ${error ? 'text-red' : focus ? 'text-primary-color' : 'text-border-color'} `;
}

export function DatePickerMainParent() {
  return `relative `;
}

export function DatePickerParent() {
  return `absolute top-[5px] z-20 bg-model-background-color bg-white rounded-[4px] w-full overflow-hidden transition-all duration-300 p-[8px] `;
}
