import React from 'react';
import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from '@/Icons/selection.json';

const Icon = (props: IconProps) => <IcoMoon iconSet={iconSet} {...props} />;

export default Icon;
