export function iconParentSelf(
  icon_position: any,
  icon: any,
  show_eye_icon: any
) {
  return `grid 
    ${
      icon_position === 'left'
        ? icon
          ? show_eye_icon
            ? 'grid-cols-[auto,1fr,auto]'
            : 'grid-cols-[auto,1fr]'
          : show_eye_icon
            ? 'grid-cols-[1fr,auto]'
            : 'grid-cols-[1fr]'
        : icon
          ? show_eye_icon
            ? 'grid-cols-[1fr,auto,auto]'
            : 'grid-cols-[1fr,auto]'
          : show_eye_icon
            ? 'grid-cols-[1fr,auto]'
            : 'grid-cols-[1fr]'
    }
    relative rounded-[4px]`;
}

export function iconsSelf() {
  return `grid bg-light-gray w-[45px]  justify-center items-center text-password-icon-default-color hover:text-password-icon-hover-color rounded-l-[4px] bg-transparent text-password-icon-default-size hover:password-icon-hover-size`;
}
