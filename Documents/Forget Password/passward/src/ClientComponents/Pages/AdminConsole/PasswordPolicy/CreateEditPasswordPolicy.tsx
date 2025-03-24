'use client';
import Button from '@/Components/Ui/Button';
import Loader from '@/Components/Ui/Loader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import { TextInput } from '@/Components/Ui/TextInput';
import Toaster from '@/Components/Ui/Toaster';
import Toggle from '@/Components/Ui/Toggle';

import {
  createPasswordPolicy,
  editPasswordPolicy,
  getPasswordPolicy,
} from '@/Services/Pages/AdminConsole/PasswordPolicy';
import { PasswordPolicyInterface } from '@/Types/Pages/AdminConsole/PasswordPolicy';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const CreateEditPasswordPolicy = () => {
  const router = useRouter();
  const [passwordPolicyData, setPasswordPolicyData] =
    useState<PasswordPolicyInterface>({
      policy_name: 'General Password Policy',
      auto_lockout_applicability: false,
      history_password_reusability: false,
    } as PasswordPolicyInterface);
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
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PasswordPolicyInterface>({
    defaultValues: passwordPolicyData,
  });

  const pageAction = pathname
    ? pathname
        .split('/')
        .filter((data) => data !== '')
        .pop()
    : '';

  const onGetPasswordPolicy = async () => {
    const response = await getPasswordPolicy(true);
    if (response.data.isAvailability) {
      if (pageAction === 'create') router.push('/password-policy');
      setPasswordPolicyData(response.data.activeData);
      reset(response.data.activeData);
      setIsEditMode(true);
      setIsLoading(false);
    } else {
      if (pageAction === 'edit') router.push('/password-policy');
      setIsEditMode(false);
      setIsLoading(false);
      setPasswordPolicyData({} as PasswordPolicyInterface);
    }
  };

  useEffect(() => {
    onGetPasswordPolicy();
    setIsLoading(true);
  }, []);

  const onSubmit: SubmitHandler<PasswordPolicyInterface> = async (data) => {
    setIsSaving(true);
    if (!data.auto_lockout_applicability) {
      delete data.lockout_duration_mins;
    }
    if (!data.history_password_reusability) {
      delete data.password_history_count;
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
    if (data.min_length < data.max_length) {
      if (isEditMode) {
        const response = await editPasswordPolicy(
          `/password-policies/${passwordPolicyData?.policy_id}`,
          resultObject as PasswordPolicyInterface
        );
        setIsSaving(false);

        setIsToaster({
          message: response.message,
          type: response.success ? 'success' : 'failure',
          open: true,
        });

        if (response.success) {
          setTimeout(() => {
            router.push('/password-policy');
          }, 2000);
        }
      } else {
        const response = await createPasswordPolicy(
          '/password-policies',
          resultObject
        );
        setIsToaster({
          message: response.message,
          type: response.success ? 'success' : 'failure',
          open: true,
        });
        if (response.success) {
          setTimeout(() => {
            router.push('/password-policy');
          }, 2000);
        }
      }
    } else {
      setError('max_length', {
        type: 'manual',
        message: 'Please note, Max Length should higher than the Min Length.',
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
            <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-3 md:gap-x-[4rem] gap-y-3 grid-rows-11 md:grid-rows-7 xl:grid-rows-5">
              <div className="">
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Policy Name'}
                    height="35px"
                    value="General Password Policy"
                  />
                </div>
              </div>

              <div className="hidden md:block"></div>
              <div className="hidden xl:block"></div>
              <div className=" w-full lg:w-full 2xl:w-full">
                {isEditMode ? (
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Min Length'}
                    height="35px"
                    value={passwordPolicyData?.min_length as number}
                  />
                ) : (
                  <Controller
                    name="min_length"
                    control={control}
                    rules={{
                      required: 'Please Enter the Min Length',
                      pattern: {
                        value: /^-?\d+$/,
                        message: 'Please Enter the Numeric Value',
                      },
                      validate: (value) =>
                        (Number(value) >= 1 && Number(value) <= 80) ||
                        'Please Enter the Value Between 1 to 80',
                    }}
                    render={({ field: { onChange, name } }) => {
                      const handleChange = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        if (newValue !== '') {
                          onChange(newValue);
                          trigger('min_length');
                        } else {
                          onChange('');
                          clearErrors('min_length');
                        }
                      };
                      const handleBlur = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        onChange(newValue);
                        trigger('min_length');
                      };
                      return (
                        <TextInput
                          id={'min-length'}
                          name={name}
                          label={'Min Length'}
                          placeholder=""
                          height="35px"
                          helperText={false}
                          required={true}
                          labelPosition={'top'}
                          error={!!errors.min_length}
                          errorText={errors.min_length?.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      );
                    }}
                  />
                )}
              </div>

              <div className=" w-full lg:w-lg:w-fullw-full">
                {isEditMode ? (
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Max Length'}
                    height="35px"
                    value={passwordPolicyData?.max_length as number}
                  />
                ) : (
                  <Controller
                    name="max_length"
                    control={control}
                    rules={{
                      required: 'Please Enter the Max Length',
                      pattern: {
                        value: /^-?\d+$/,
                        message: 'Please Enter the Numeric Value',
                      },
                      validate: (value) =>
                        (Number(value) >= 1 && Number(value) <= 80) ||
                        'Please Enter the Value Between 1 to 80. ​',
                    }}
                    render={({ field: { onChange, name } }) => {
                      const handleChange = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        if (newValue !== '') {
                          onChange(newValue);
                          trigger('max_length');
                        } else {
                          onChange('');
                          clearErrors('max_length');
                        }
                      };

                      const handleBlur = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        onChange(newValue);
                        trigger('max_length');
                      };
                      return (
                        <TextInput
                          id={'max-length'}
                          name={name}
                          label={'Max Length'}
                          placeholder=""
                          height="35px"
                          helperText={false}
                          required={true}
                          labelPosition={'top'}
                          error={!!errors.max_length}
                          errorText={errors.max_length?.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      );
                    }}
                  />
                )}
              </div>

              <div className=" w-full lg:w-lg:w-fullw-full">
                {isEditMode ? (
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Uppercase Allowed'}
                    height="35px"
                    value={passwordPolicyData?.require_uppercase ? 'Yes' : 'No'}
                  />
                ) : (
                  <Controller
                    name="require_uppercase"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Toggle
                        id="upper-case-allowed"
                        name={name}
                        label="Uppercase Allowed"
                        labelPosition="top"
                        required={true}
                        width="32px"
                        height="17px"
                        value={value}
                        onToggle={onChange}
                      />
                    )}
                  />
                )}
              </div>

              <div className=" w-full lg:w-lg:w-fullw-full">
                {isEditMode ? (
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Lowercase Allowed'}
                    height="35px"
                    value={passwordPolicyData?.require_lowercase ? 'Yes' : 'No'}
                  />
                ) : (
                  <Controller
                    name="require_lowercase"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Toggle
                        id={'lower-case-allowed'}
                        name={name}
                        label={'Lowercase Allowed'}
                        labelPosition={'top'}
                        required={true}
                        width="32px"
                        height="17px"
                        value={value}
                        onToggle={onChange}
                      />
                    )}
                  />
                )}
              </div>

              <div className=" w-full lg:w-lg:w-fullw-full">
                {isEditMode ? (
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Numbers Allowed'}
                    height="35px"
                    value={passwordPolicyData?.require_numbers ? 'Yes' : 'No'}
                  />
                ) : (
                  <Controller
                    name="require_numbers"
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                      <Toggle
                        id={'number-allowed'}
                        name={name}
                        label={'Numbers Allowed'}
                        labelPosition={'top'}
                        required={true}
                        width="32px"
                        height="17px"
                        value={value}
                        onToggle={onChange}
                      />
                    )}
                  />
                )}
              </div>

              <div className=" w-full lg:w-lg:w-fullw-full">
                {isEditMode ? (
                  <ReadOnlyField
                    icon={false}
                    id={''}
                    required={true}
                    label={'Special Char Allowed'}
                    height="35px"
                    value={
                      passwordPolicyData?.require_special_chars ? 'Yes' : 'No'
                    }
                  />
                ) : (
                  <Controller
                    name="require_special_chars"
                    control={control}
                    render={({ field: { onChange, name, value } }) => (
                      <Toggle
                        id={'special-char-allowed'}
                        name={name}
                        label={'Special Characters Allowed'}
                        labelPosition={'top'}
                        required={true}
                        width="32px"
                        height="17px"
                        value={value}
                        onToggle={onChange}
                      />
                    )}
                  />
                )}
              </div>

              <div className="">
                <div className="w-full lg:w-lg:w-fullw-full">
                  <Controller
                    name="password_expiry_days"
                    control={control}
                    rules={{
                      required: 'Please Enter the Password Expiry',
                      pattern: {
                        value: /^-?\d+$/,
                        message: 'Please Enter the Numeric Only',
                      },
                      validate: (value) =>
                        (Number(value) >= 0 && Number(value) <= 99999) ||
                        'Please Enter the Value Between 0 to 99999',
                    }}
                    render={({ field: { onChange, name, value } }) => {
                      const handleChange = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        if (newValue !== '') {
                          onChange(newValue);
                          trigger('password_expiry_days');
                        } else {
                          onChange('');
                          clearErrors('password_expiry_days');
                        }
                      };

                      const handleBlur = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        onChange(newValue);
                        trigger('password_expiry_days');
                      };
                      return (
                        <TextInput
                          id={'password-expiry-days'}
                          name={name}
                          label={'Password Expiry (In Days)'}
                          placeholder=""
                          height="35px"
                          helperText={false}
                          required={true}
                          defaultValue={value}
                          labelPosition={'top'}
                          error={!!errors.password_expiry_days}
                          errorText={errors.password_expiry_days?.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              <div className="">
                <div className="w-full lg:w-lg:w-fullw-full">
                  <Controller
                    name="max_failed_attempts"
                    control={control}
                    rules={{
                      required: 'Please Enter the Failed Attempts Allowed',
                      pattern: {
                        value: /^-?\d+$/,
                        message: 'Please Enter the Numeric Only',
                      },
                      validate: (value) =>
                        (Number(value) >= 1 && Number(value) <= 99999) ||
                        'Please Enter the Value Between 1 to 99999',
                    }}
                    render={({ field: { onChange, name, value } }) => {
                      const handleChange = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        if (newValue !== '') {
                          onChange(newValue);
                          trigger('max_failed_attempts');
                        } else {
                          onChange('');
                          clearErrors('max_failed_attempts');
                        }
                      };

                      const handleBlur = (
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const newValue = event.target.value;
                        onChange(newValue);
                        trigger('max_failed_attempts');
                      };
                      return (
                        <TextInput
                          id={'max-failed-attempts'}
                          name={name}
                          label={'Failed Attempts Allowed'}
                          placeholder=""
                          height="35px"
                          helperText={false}
                          required={true}
                          defaultValue={value}
                          labelPosition={'top'}
                          error={!!errors.max_failed_attempts}
                          errorText={errors.max_failed_attempts?.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      );
                    }}
                  />
                </div>
              </div>

              <div className="hidden xl:block"></div>
              <div className="">
                <Controller
                  name="auto_lockout_applicability"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Toggle
                      id="auto-lock"
                      name={name}
                      label="Auto Unlock"
                      labelPosition="top"
                      required={true}
                      defaultValue={value}
                      width="32px"
                      height="17px"
                      value={value}
                      onToggle={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                />
              </div>

              <div
                className={`${watch('auto_lockout_applicability') ? '' : 'hidden md:block'}`}
              >
                {watch('auto_lockout_applicability') && (
                  <div className="w-full lg:w-lg:w-fullw-full">
                    <Controller
                      name="lockout_duration_mins"
                      control={control}
                      rules={{
                        required: 'Please Enter the Auto Unlock Duration',
                        pattern: {
                          value: /^-?\d+$/,
                          message: 'Please Enter the Numeric Only',
                        },
                        validate: (value) =>
                          (Number(value) >= 1 && Number(value) <= 99999) ||
                          'Please Enter the Value Between 1 to 99999',
                      }}
                      render={({ field: { onChange, name, value } }) => {
                        const handleChange = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          if (newValue !== '') {
                            onChange(newValue);
                            trigger('lockout_duration_mins');
                          } else {
                            onChange('');
                            clearErrors('lockout_duration_mins');
                          }
                        };

                        const handleBlur = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          onChange(newValue);
                          trigger('lockout_duration_mins');
                        };
                        return (
                          <TextInput
                            id={'lockout-duration-mins'}
                            name={name}
                            label={'Auto Unlock Duration(In Min)'}
                            placeholder=""
                            height="35px"
                            helperText={false}
                            required={true}
                            defaultValue={value}
                            labelPosition={'top'}
                            error={!!errors.lockout_duration_mins}
                            errorText={errors.lockout_duration_mins?.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        );
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="hidden xl:block"></div>

              <div className="">
                <Controller
                  name="history_password_reusability"
                  control={control}
                  render={({ field: { onChange, name, value } }) => (
                    <Toggle
                      id={'history-password-reusability'}
                      name={name}
                      label={'Reusing History Password'}
                      labelPosition={'top'}
                      required={true}
                      defaultValue={value}
                      falseName=""
                      width="32px"
                      height="17px"
                      trueName=""
                      value={value}
                      onToggle={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                />
              </div>

              <div
                className={`${watch('history_password_reusability') ? '' : 'hidden'}`}
              >
                {watch('history_password_reusability') && (
                  <div className="w-full lg:w-lg:w-fullw-full">
                    <Controller
                      name="password_history_count"
                      control={control}
                      rules={{
                        required: 'Please Enter the Restricted History Count',
                        pattern: {
                          value: /^-?\d+$/,
                          message: 'Please Enter the Numeric Only',
                        },
                        validate: (value) =>
                          (Number(value) >= 0 && Number(value) <= 99999) ||
                          'Please Enter the Value Between 0 to 99999',
                      }}
                      render={({ field: { onChange, value, name } }) => {
                        const handleChange = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          if (newValue !== '') {
                            onChange(newValue);
                            trigger('password_history_count');
                          } else {
                            onChange('');
                            clearErrors('password_history_count');
                          }
                        };
                        const handleBlur = (
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const newValue = event.target.value;
                          onChange(newValue);
                          trigger('password_history_count');
                        };
                        return (
                          <TextInput
                            id={'password-history-count'}
                            name={name}
                            label={'Restricted History Count'}
                            placeholder=""
                            height="35px"
                            helperText={false}
                            required={true}
                            defaultValue={value}
                            labelPosition={'top'}
                            error={!!errors.password_history_count}
                            errorText={errors.password_history_count?.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        );
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="hidden"></div>
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

              <Button
                type="button"
                varient="Secondary"
                loading={false}
                name={'Cancel'}
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/password-policy');
                }}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateEditPasswordPolicy;
