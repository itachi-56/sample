'use client';
import Button from '@/Components/Ui/Button';
import Loader from '@/Components/Ui/Loader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import { TextInput } from '@/Components/Ui/TextInput';
import Toaster from '@/Components/Ui/Toaster';
import Toggle from '@/Components/Ui/Toggle';
import {
  createSessionPolicy,
  editSessionPolicy,
  getSessionPolicy,
} from '@/Services/Pages/AdminConsole/SessionPolicy';
import { SessionPolicyInterface } from '@/Types/Pages/AdminConsole/SessionPolicy';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const CreateEditSessionPolicy = () => {
  const router = useRouter();
  const [sessionPolicyData, setSessionPolicyData] =
    useState<SessionPolicyInterface>({ policy_name: 'General Session Policy' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const pathname = usePathname();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isToaster, setIsToaster] = useState<{
    open: boolean;
    type: 'success' | 'failure';
    message: string;
  }>({
    open: false,
    type: 'success',
    message: '',
  });

  const pageAction = pathname
    ? pathname
        .split('/')
        .filter((data) => data !== '')
        .pop()
    : '';

  useEffect(() => {
    if (isToaster.open) {
      setTimeout(() => {
        setIsToaster({ message: '', open: false, type: 'success' });
      }, 3000);
    }
  }, [isToaster]);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<SessionPolicyInterface>({
    defaultValues: sessionPolicyData,
  });

  const onGetSessionPolicy = async () => {
    const response = await getSessionPolicy(true);
    if (response.data.isAvailability) {
      if (pageAction === 'create') router.push('/session-policy');
      setSessionPolicyData(response.data.activeData);
      reset(response.data.activeData);
      setIsEditMode(true);
      setIsLoading(false);
    } else {
      if (pageAction === 'edit') router.push('/session-policy');
      setIsEditMode(false);
      setIsLoading(false);
      setSessionPolicyData({} as SessionPolicyInterface);
    }
  };

  useEffect(() => {
    onGetSessionPolicy();
    setIsLoading(true);
  }, []);

  const onSubmit: SubmitHandler<SessionPolicyInterface> = async (data) => {
    setIsSaving(true);
    if (!data.session_extension_option) {
      delete data.max_session_duration_mins;
    }
    const convertStringNumbersToNumbers = (
      obj: Record<string, any>
    ): Record<string, any> => {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          const isNumberString =
            typeof value === 'string' && !isNaN(Number(value));
          return [key, isNumberString ? Number(value) : value];
        })
      );
    };

    const resultObject = convertStringNumbersToNumbers(data);
    const createAndEditSessionApi = async () => {
      if (isEditMode) {
        if (!resultObject.session_extension_option) {
          delete resultObject.max_session_duration_mins;
        }

        const response = await editSessionPolicy(
          `/session-policy/${sessionPolicyData?.policy_id}`,
          resultObject
        );
        setIsSaving(false);

        setIsToaster({
          message: response.message,
          type: response.success ? 'success' : 'failure',
          open: true,
        });
        if (response?.success) {
          setTimeout(() => {
            router.push(`/session-policy`);
          }, 2000);
        }
      } else {
        const response = await createSessionPolicy(
          '/session-policy',
          resultObject
        );
        setIsToaster({
          message: response.message,
          type: response.success ? 'success' : 'failure',
          open: true,
        });
        if (response?.success) {
          setTimeout(() => {
            router.push('/session-policy');
          }, 2000);
        }
      }
    };

    if (resultObject?.warning_minutes < resultObject?.session_timeout_minutes) {
      if (resultObject?.max_session_duration_mins) {
        if (
          resultObject?.session_timeout_minutes <
          resultObject?.max_session_duration_mins
        ) {
          createAndEditSessionApi();
        } else {
          setIsToaster({
            message:
              'Please Give the Max Session is Higher than the Session Timeout',
            type: 'failure',
            open: true,
          });
        }
      } else {
        createAndEditSessionApi();
      }
    } else {
      setIsToaster({
        message:
          'Please Give the Warning Time is Less than the Session Timeout',
        type: 'failure',
        open: true,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="relative h-full row-span-2">
          <Loader />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-x-[4rem] gap-y-3 xl:grid-cols-3  grid-rows-11 md:grid-rows-7 xl:grid-rows-3">
              <div className="">
                <div className="w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'Policy Name'}
                    height="35px"
                    value="General Password Policy"
                  />
                </div>
              </div>
              <div className="hidden md:block"></div>
              <div className="hidden xl:block"></div>
              <div className="">
                <div className="w-full ">
                  <Controller
                    name="session_timeout_minutes"
                    control={control}
                    rules={{
                      required: 'Please Enter the Session Timeout',
                      pattern: {
                        value: /^-?\d+$/,
                        message: 'Please Enter Numeric Only',
                      },
                      validate: (value) =>
                        (Number(value) >= 1 && Number(value) <= 99999) ||
                        'Please Enter Value Between 1 to 99999',
                    }}
                    render={({ field: { onChange, name, value } }) => {
                      const handleChange = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        if (newValue !== '') {
                          onChange(newValue);
                          trigger('session_timeout_minutes');
                        } else {
                          onChange('');
                          clearErrors('session_timeout_minutes');
                        }
                      };
                      const handleBlur = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        onChange(newValue);
                        trigger('session_timeout_minutes');
                      };
                      return (
                        <TextInput
                          id={'session-timeout-minutes'}
                          name={name}
                          label={'Session Timeout (In Min)'}
                          placeholder=""
                          height="35px"
                          helperText={false}
                          required={true}
                          labelPosition={'top'}
                          defaultValue={value}
                          error={!!errors.session_timeout_minutes}
                          errorText={errors.session_timeout_minutes?.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="">
                <Controller
                  name="auto_logout"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Toggle
                      id="upper-case-allowed"
                      name={name}
                      label="Auto Logout"
                      labelPosition="top"
                      required={true}
                      width="32px"
                      height="17px"
                      value={value}
                      onToggle={onChange}
                    />
                  )}
                />
              </div>
              <div className="">
                <div className="w-full ">
                  <Controller
                    name="warning_minutes"
                    control={control}
                    rules={{
                      required: 'Please Enter the Warning',
                      pattern: {
                        value: /^-?\d+$/,
                        message: 'Please Enter the Numeric Value',
                      },
                      validate: (value) =>
                        (Number(value) >= 1 && Number(value) <= 99999) ||
                        'Please Enter Value Between 1 to 99999',
                    }}
                    render={({ field: { onChange, name, value } }) => {
                      const handleChange = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        if (newValue !== '') {
                          onChange(newValue);
                          trigger('warning_minutes');
                        } else {
                          onChange('');
                          clearErrors('warning_minutes');
                        }
                      };

                      const handleBlur = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        onChange(newValue);
                        trigger('warning_minutes');
                      };
                      return (
                        <TextInput
                          id={'warning-minutes'}
                          name={name}
                          label={'Warning (In Min)'}
                          placeholder=""
                          height="35px"
                          helperText={false}
                          required={true}
                          labelPosition={'top'}
                          defaultValue={value}
                          error={!!errors.warning_minutes}
                          errorText={errors.warning_minutes?.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              <div className="">
                <Controller
                  name="session_extension_option"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Toggle
                      id={'session-extension-option'}
                      name={name}
                      label={'Session Extension Allowed'}
                      labelPosition={'top'}
                      required={true}
                      width="32px"
                      height="17px"
                      value={value}
                      onToggle={onChange}
                    />
                  )}
                />
              </div>
              {watch('session_extension_option') && (
                <div className="">
                  <div className="w-full ">
                    <Controller
                      name="max_session_duration_mins"
                      control={control}
                      rules={{
                        required: 'Please Enter the Max Session',
                        pattern: {
                          value: /^-?\d+$/,
                          message: 'Please Enter Numeric Only',
                        },
                        validate: (value) =>
                          (Number(value) >= 1 && Number(value) <= 99999) ||
                          'Please Enter Value Between 1 to 99999',
                      }}
                      render={({ field: { onChange, name, value } }) => {
                        const handleChange = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          if (newValue !== '') {
                            onChange(newValue);
                            trigger('max_session_duration_mins');
                          } else {
                            onChange('');
                            clearErrors('max_session_duration_mins');
                          }
                        };

                        const handleBlur = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          onChange(newValue);
                          trigger('max_session_duration_mins');
                        };
                        return (
                          <TextInput
                            id={'max-session-duration'}
                            name={name}
                            label={'Max Session (In Min)'}
                            placeholder=""
                            height="35px"
                            helperText={false}
                            required={true}
                            defaultValue={value}
                            labelPosition={'top'}
                            error={!!errors.max_session_duration_mins}
                            errorText={
                              errors.max_session_duration_mins?.message
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <Toaster
                open={isToaster?.open}
                type={isToaster?.type}
                message={isToaster?.message}
              />
            </div>
            <div className=" flex justify-start gap-5 p-form-bottom-button-gap-size">
              <Button
                varient="Primary"
                name={'Save'}
                type="submit"
                loading={isSaving}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};
export default CreateEditSessionPolicy;
