'use client';
import Button from '@/Components/Ui/Button';
import Select from '@/Components/Ui/Select';
import { TextInput } from '@/Components/Ui/TextInput';
import Toaster from '@/Components/Ui/Toaster';
import Toggle from '@/Components/Ui/Toggle';
import {
  createMFAPolicy,
  editMFAPolicy,
  getMFAPolicy,
} from '@/Services/Pages/AdminConsole/MFAPolicy';
import { MFAInterface } from '@/Types/Pages/AdminConsole/MFAPolicy';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import Loader from '@/Components/Ui/Loader';

const CreateEditMFAPolicy = () => {
  const router = useRouter();
  const [MFAPolicyData, setMFAPolicyData] = useState<MFAInterface>({
    mfa_applicability: false,
    mfa_phone: false,
    mfa_whatsapp: false,
    mfa_email: false,
  } as MFAInterface);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const pathname = usePathname();

  const pageAction = pathname
    ? pathname
        .split('/')
        .filter((data) => data !== '')
        .pop()
    : '';

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
    clearErrors,
    formState: { errors },
  } = useForm<MFAInterface>({
    defaultValues: MFAPolicyData,
  });

  const onGetMFAPolicy = async () => {
    const response = await getMFAPolicy(true);

    if (response.data.isAvailability) {
      if (pageAction === 'create') router.push('/mfa-policy');
      setMFAPolicyData(response.data.activeData);
      reset(response.data.activeData);
      setIsEditMode(true);
      setIsLoading(false);
    } else {
      if (pageAction === 'edit') router.push('/mfa-policy');
      setIsEditMode(false);
      setIsLoading(false);
      setMFAPolicyData({} as MFAInterface);
    }
  };

  useEffect(() => {
    onGetMFAPolicy();
    setIsLoading(true);
  }, []);

  const onSubmit: SubmitHandler<MFAInterface> = async (data) => {
    setIsSaving(true);
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
    const createAndEditMFAApi = async () => {
      if (isEditMode) {
        const response = await editMFAPolicy(
          `/mfa-settings/${MFAPolicyData?.mfa_id}`,
          resultObject as any
        );
        setIsSaving(false);

        setIsToaster({
          message: response.message,
          type: response.success ? 'success' : 'failure',
          open: true,
        });

        if (response.success) {
          setTimeout(() => {
            router.push('/mfa-policy');
          }, 2000);
        }
      } else {
        const response = await createMFAPolicy(
          `/mfa-settings`,
          resultObject as any
        );

        setIsToaster({
          message: response.message,
          type: response.success ? 'success' : 'failure',
          open: true,
        });

        if (response.success) {
          setTimeout(() => {
            router.push('/mfa-policy');
          }, 2000);
        }
      }
    };

    if (resultObject?.mfa_applicability) {
      if (
        resultObject?.mfa_email ||
        resultObject?.mfa_phone ||
        resultObject?.mfa_whatsapp
      ) {
        createAndEditMFAApi();
      } else {
        setIsToaster({
          message: "Please Select 'Yes' for at least One OTP Method",
          type: 'failure',
          open: true,
        });
      }
    } else {
      delete resultObject.mfa_email;
      delete resultObject.mfa_phone;
      delete resultObject.mfa_whatsapp;
      delete resultObject.mfa_condition;
      delete resultObject.retry_limit;
      delete resultObject.otp_expiry_seconds;
      createAndEditMFAApi();
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
            <div
              className={`w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-x-[4rem] gap-y-3 ${watch('mfa_applicability') ? 'grid-rows-7 md:grid-rows-4 xl:grid-rows-3' : 'grid-rows-1'} `}
            >
              <div className="">
                <Controller
                  name="mfa_applicability"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Toggle
                      id="mfa-applicability"
                      name={name}
                      label="MFA Applicability"
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

              <div className="hidden xl:block"></div>
              <div className="hidden md:block"></div>

              {watch('mfa_applicability') && (
                <>
                  <div className="">
                    <Controller
                      name="mfa_email"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Toggle
                          id="mfa-email"
                          name={name}
                          label="Email OTP"
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

                  <div className="">
                    <Controller
                      name="mfa_phone"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Toggle
                          id="mfa-phone"
                          name={name}
                          label="SMS OTP"
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
                  <div className="">
                    <Controller
                      name="mfa_whatsapp"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Toggle
                          id="mfa-whatsapp"
                          name={name}
                          label="WhatsApp OTP"
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

                  <div className="">
                    <div className="w-full">
                      <Controller
                        name="mfa_condition"
                        control={control}
                        rules={{
                          required: 'Please Enter the OTP Condition',
                          validate: (value) =>
                            value === 'Anyone' ||
                            value === 'All' ||
                            'Please Select the OTP Condition',
                        }}
                        render={({ field: { onChange, name, value } }) => {
                          const handleChange = (event: {
                            label: string;
                            value: string;
                          }) => {
                            const newValue = event.value && event.value ;
                            if (newValue !== '') {
                              onChange(newValue);
                              trigger('mfa_condition');
                            } else {
                              clearErrors('mfa_condition');
                            }
                          };

                          const handleBlur = () => {
                            trigger('mfa_condition');
                          };
                          return (
                            <Select
                              id={'otp_condition'}
                              name={name}
                              label={'OTP Condition'}
                              placeholder="Select Condition"
                              height="35px"
                              helperText={false}
                              required={true}
                              defaultValue={value}
                              labelPosition={'top'}
                              error={!!errors.mfa_condition}
                              errorText={errors.mfa_condition?.message}
                              options={[
                                { label: 'Anyone', value: 'Anyone' },
                                { label: 'All', value: 'All' },
                              ]}
                              onSelect={handleChange}
                              onBlur={handleBlur}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="w-full">
                      <Controller
                        name="retry_limit"
                        control={control}
                        rules={{
                          required: 'Please Enter the Number of Retry Allowed',
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
                              trigger('retry_limit');
                            } else {
                              onChange('');
                              clearErrors('retry_limit');
                            }
                          };

                          const handleBlur = (
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newValue = event.target.value;
                            onChange(newValue);
                            trigger('retry_limit');
                          };
                          return (
                            <TextInput
                              id={'retry-limit'}
                              name={name}
                              label={'Number of Retry Allowed'}
                              placeholder=""
                              height="35px"
                              helperText={false}
                              required={true}
                              defaultValue={value}
                              labelPosition={'top'}
                              error={!!errors.retry_limit}
                              errorText={errors.retry_limit?.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="w-full">
                      <Controller
                        name="otp_expiry_seconds"
                        control={control}
                        rules={{
                          required: 'Please Enter the OTP Expiry',
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
                              trigger('otp_expiry_seconds');
                            } else {
                              onChange('');
                              clearErrors('otp_expiry_seconds');
                            }
                          };

                          const handleBlur = (
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newValue = event.target.value;
                            onChange(newValue);
                            trigger('otp_expiry_seconds');
                          };
                          return (
                            <TextInput
                              id={'otp-expiry-seconds'}
                              name={name}
                              label={'OTP Expiry (In Secs)'}
                              placeholder=""
                              height="35px"
                              helperText={false}
                              required={true}
                              defaultValue={value}
                              labelPosition={'top'}
                              error={!!errors.otp_expiry_seconds}
                              errorText={errors.otp_expiry_seconds?.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div>
              <Toaster
                open={isToaster?.open}
                type={isToaster?.type}
                message={isToaster?.message}
              />
            </div>
            <div className="p-form-bottom-button-gap-size">
              <div className=" flex justify-start gap-5 ">
                <Button
                  varient="Primary"
                  name={'Save'}
                  type="submit"
                  loading={isSaving}
                />
                <Button
                  type="button"
                  varient="Secondary"
                  name={'Cancel'}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push('/mfa-policy');
                  }}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateEditMFAPolicy;
