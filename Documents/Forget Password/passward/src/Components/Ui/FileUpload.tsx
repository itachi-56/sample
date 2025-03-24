'use client';
import * as React from 'react';
import {
  helperTextEle,
  iconParent,
  icons,
  input,
  inputComponent,
  inputLabel,
  inputParent,
  requiredVisible,
  validationErrorEle,
} from '../ClassName/Input';
import { ErrorIcon, InformationIcon, UserWithCircleIcon } from '@/Icons/Icons';
import { outlineLabel } from '../ClassName/FileUpload';
import { IoCloseCircle } from 'react-icons/io5';
import { FileInputProps } from '@/Types/Ui';

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      type,
      id,
      name = 'TextInput',
      label,
      height = '46px',
      width = 'auto',
      labelPosition = 'outline',
      placeholder = 'Enter the text here',
      required = false,
      minLength = 1,
      maxLength = 20,
      disabled = false,
      readOnly = false,
      icon = true,
      iconSrc,
      iconPosition = 'left',
      helperText = true,
      helperTextMessage = 'This field is required',
      validation = false,
      onMouseEnter,
      onMouseLeave,
      onChange,
      onBlur,
      onFocus,
      onKeyUp,
      onKeyDown,
      onSelect,
      error = false,
      errorText = '',
      acceptFiles,
      fileSize,
    },
    ref
  ) => {
    const [focus, setFocus] = React.useState(false);
    const [value, setValue] = React.useState<File[]>([]);
    const [inputError, setInputError] = React.useState<{
      error: boolean;
      errorText: string;
    }>({ error, errorText });
    const divRef = React.useRef<HTMLDivElement | null>(null);
    const defaultUploadRef = React.useRef<HTMLInputElement>(null);
    const inputRef = ref || defaultUploadRef;
    const fileContainerRef = React.useRef<HTMLDivElement | null>(null);

    const handleOpenFileChoose = () => {
      inputRef &&
        (inputRef as React.RefObject<HTMLInputElement>).current?.click();
    };

    React.useEffect(() => {
      if (value) {
        onSelect(value);
      }
      if (value.length !== 0) {
        setFocus(true);
      } else {
        setFocus(false);
      }
    }, [value, onSelect]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files && fileSize) {
        let userFileSize: number;

        if (fileSize.toLowerCase().includes('gb')) {
          const sizeInt = Number(fileSize.toLowerCase().split('g')[0]);
          userFileSize = sizeInt * 1073741824;
        } else if (fileSize.toLowerCase().includes('mb')) {
          const sizeInt = Number(fileSize.toLowerCase().split('m')[0]);
          userFileSize = sizeInt * 1048576;
        } else if (fileSize.toLowerCase().includes('kb')) {
          const sizeInt = Number(fileSize.toLowerCase().split('k')[0]);
          userFileSize = sizeInt * 1024;
        } else {
          console.error("Invalid fileSize format. Use 'GB', 'MB', or 'KB'.");
          return;
        }

        // Check if all selected files meet the size requirement
        const allFilesAccepted = Array.from(files).every(
          (file: File) => file.size <= userFileSize
        );

        if (allFilesAccepted) {
          setValue(Array.from(files));
          setInputError({ error: false, errorText: '' });
        } else {
          setInputError({ error: true, errorText: 'File size is too large' });
          setFocus(false);
        }
      }
    };

    const handleRemoveFile = (index: number) => {
      setValue((previos: File[] | any) => {
        const copyValue = [...previos];
        copyValue.splice(index, 1);
        return copyValue;
      });
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setFocus(false);
      }
    };

    React.useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const fileListContainerHeight = () => {
      const divHeight = fileContainerRef.current
        ? fileContainerRef.current.offsetHeight
        : 0;
      return divHeight;
    };

    const fileContainer = () => {
      return (
        <div
          ref={fileContainerRef}
          className="h-full flex flex-wrap gap-1 items-center max-h-[54px] overflow-y-auto"
        >
          {value.map((file: File, index: number) => (
            <div
              className="bg-primary-color whitespace-nowrap flex text-primary-in-text-color px-2 py-[2px] rounded-[4px] text-[14px]"
              key={index}
            >
              <div className="flex gap-2 items-center">
                <div>{file.name}</div>
                <div
                  className="text-[16px]"
                  onClick={() => {
                    handleRemoveFile(index);
                  }}
                >
                  <IoCloseCircle />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className={`${inputComponent(labelPosition)}`}>
        <div className={`${inputLabel(labelPosition)}`}>
          {label}
          <span className={`${requiredVisible(required)}`}> *</span>
        </div>
        <div>
          <div
            style={{ width: width, minHeight: height }}
            className={` ${inputParent(focus, inputError.error, validation)}`}
          >
            <div className={`h-full ${iconParent(iconPosition, icon)}`}>
              {icon && iconPosition === 'left' && (
                <div
                  className={`${icons(icon, iconPosition)}`}
                  style={{
                    width: Number(height.split('p')[0]) < 46 ? height : '46px',
                  }}
                >
                  {iconSrc || <UserWithCircleIcon />}
                </div>
              )}
              <div
                ref={divRef}
                className="relative h-full bg-background-color transition-none rounded-r-[4px]"
                onClick={() => {
                  setFocus(true);
                }}
              >
                <input
                  id={id}
                  name={name}
                  multiple={true}
                  type={type}
                  placeholder={labelPosition !== 'outline' ? placeholder : ''}
                  minLength={minLength}
                  maxLength={maxLength}
                  disabled={disabled}
                  readOnly={readOnly}
                  ref={defaultUploadRef}
                  className={`${input(icon, iconPosition)} h-full hidden`}
                  autoComplete="off"
                  accept={acceptFiles?.join(',')}
                  onFocus={(e) => {
                    setFocus(true);
                    if (onFocus) {
                      onFocus(e);
                    }
                  }}
                  onBlur={(e) => {
                    setFocus(false);
                    if (onBlur) {
                      onBlur(e);
                    }
                  }}
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e);
                    }
                    handleFileChange(e);
                  }}
                  onKeyUp={onKeyUp}
                  onKeyDown={onKeyDown}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                />
                <div className="w-full h-full  grid grid-cols-[auto,100px]">
                  <div
                    className={`p-[9px]`}
                    onClick={() => {
                      value && value.length !== 0
                        ? null
                        : handleOpenFileChoose();
                    }}
                  >
                    <div className=" w-full h-full flex flex-wrap items-center">
                      {value && fileListContainerHeight() <= 32 ? (
                        fileContainer()
                      ) : value && fileListContainerHeight() > 32 && focus ? (
                        fileContainer()
                      ) : (
                        <div>{`${value?.length} files selected`}</div>
                      )}
                    </div>
                  </div>
                  <div className="rounded-r-xl overflow-hidden">
                    <div className="grid p-[3px] h-full">
                      <button
                        type="button"
                        className="bg-primary-color text-primary-in-text-color w-full rounded-[3px]"
                        onClick={handleOpenFileChoose}
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`${outlineLabel(focus, labelPosition, value, inputError.error, validation)}`}
                >
                  {label}
                  <span className={`${requiredVisible(required)}`}> *</span>
                </div>
              </div>
              {icon && iconPosition === 'right' && (
                <div
                  className={`${icons(icon, iconPosition)}`}
                  style={{
                    width: Number(height.split('p')[0]) < 46 ? height : '46px',
                  }}
                >
                  {iconSrc || <UserWithCircleIcon />}
                </div>
              )}
            </div>
          </div>
          {inputError.error ? (
            <div className={`${validationErrorEle}`}>
              <div>
                <ErrorIcon />
              </div>
              <div>{inputError.errorText}</div>
            </div>
          ) : (
            helperText &&
            value &&
            value.length === 0 && (
              <div className={`${helperTextEle}`}>
                <div>
                  <InformationIcon />
                </div>
                <div>{helperTextMessage}</div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
);
FileInput.displayName = 'Input';

export { FileInput };
