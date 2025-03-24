export const Button = (varient: 'Primary' | 'Secondary' | 'Thrid') => {
  return `flex font-bold justify-center items-center min-w-[112px]
  ${
    varient === 'Primary'
      ? 'bg-primary-btn-bg-default-color text-primary-btn-font-default-size hover-text-primary-btn-font-hover-size text-color-primary-btn-font-default-color hover:text-color-primary-btn-font-hover-color font-primary-btn-font-default-weight hover:font-primary-btn-font-hover-weight   text-white hover:bg-primary-btn-bg-hover-color  hover:text-primary-color border bdr-primary-btn-border-default-color bdr-primary-btn-border-hover-color bdr-primary-btn-border-default-weight bdr-primary-btn-border-hover-weight rounded-primary-btn-default-border-radius  hover:rounded-primary-btn-hover-border-radius hover:shadow-primary-btn-hover-shadow'
      : varient === 'Secondary'
        ? 'bg-secondary-btn-bg-default-color hover:bg-secondary-btn-bg-hover-color text-secondary-btn-font-default-size hover-text-secondary-btn-font-hover-size text-color-secondary-btn-font-default-color hover:text-color-secondary-btn-font-hover-color font-secondary-btn-font-default-weight hover:font-secondary-btn-font-hover-weight bdr-secondary-btn-border-default-color hover:bdr-secondary-btn-border-hover-color bdr-secondary-btn-border-default-weight hover:bdr-secondary-btn-border-hover-weight rounded-secondary-btn-default-border-radius  hover:rounded-secondary-btn-hover-border-radius hover:shadow-secondary-btn-hover-shadow'
        : varient === 'Thrid'
          ? 'hover:bg-primary-color hover:text-white shadow-[2px_2px_5px_0px_#1D57C747] bg-background-color text-primary-color'
          : ''
  } duration-500 px-8 `;
};

export const ButtonWithIcon = (icon: boolean, iconSrc: React.ReactNode) => {
  if (icon && iconSrc) {
    return 'grid-cols-[auto,auto] gap-2';
  } else {
    return 'grid-cols-1';
  }
};

export const ButtonSize = (iconSize: string) => {
  switch (iconSize) {
    case 'small':
      return 'text-[12px]';
    case 'medium':
      return 'text-[14px]';
    case 'large':
      return 'text-[16px]';
  }
};

export const ButtonIcon = () => {
  return 'flex justify-center items-center';
};

export const loader = (varient: 'Primary' | 'Secondary' | 'Thrid') => {
  return `${
    varient === 'Primary'
      ? 'bg-primary-btn-bg-default-color'
      : varient === 'Secondary'
        ? 'bg-secondary-btn-bg-default-color'
        : varient === 'Thrid'
          ? 'hover:bg-primary-color hover:text-white shadow-[2px_2px_5px_0px_#1D57C747] bg-background-color text-primary-color'
          : ''
  }`;
};
