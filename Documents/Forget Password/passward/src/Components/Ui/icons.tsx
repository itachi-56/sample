import { BsFillExclamationCircleFill } from 'react-icons/bs';


interface ErrorIconProps {
  className?: string; // className should be optional
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ className }) => {
  return <BsFillExclamationCircleFill className={className} size={12} />;
};








// className=