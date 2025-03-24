'use client';
import Button from '@/Components/Ui/Button';
import Loader from '@/Components/Ui/Loader';
import PasswordInput from '@/Components/Ui/PasswordInput';
import RadioButton from '@/Components/Ui/RadioButton';
import { TextInput } from '@/Components/Ui/TextInput';
import Toaster from '@/Components/Ui/Toaster';
import Toggle from '@/Components/Ui/Toggle';
import { encryptionType } from '@/MockData/Pages/AdminConsole/Session';
import {
  createSMTPPolicy,
  editSMTPPolicy,
  getSMTPPolicy,
} from '@/Services/Pages/AdminConsole/SmtpPolicy';
import { SmtpDetailsInterface } from '@/Types/Pages/AdminConsole/SmtpPolicy';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const CreateEditSMTPPolicy = () => {
  const router = useRouter();
  const [smtpData, setSmtpData] = useState<SmtpDetailsInterface>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const pathname = usePathname();

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
    reset,
    trigger,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<SmtpDetailsInterface>({
    defaultValues: smtpData,
  });

  const [, setConditionalLoadInputs] = useState({
    auto_lock: false,
    reusing_history_password: false,
  });

  const pageAction = pathname ? pathname 
  .split('/')
  .filter((data) => data !== '')
  .pop() : ""

  const onGetSmtp = async () => {
    const response = await getSMTPPolicy(true);
    if (response.data.isAvailability) {
      if (pageAction === 'create') router.push('/smtp-policy');
      setSmtpData(response.data.activeData);
      reset(response.data.activeData);
      setIsEditMode(true);
      setIsLoading(false);
    } else {
      setIsEditMode(false);
      setIsLoading(false);
      setSmtpData({} as SmtpDetailsInterface);
    }
  };

  useEffect(() => {
    onGetSmtp();
    setIsLoading(true);
  }, []);

  const onSubmit: SubmitHandler<SmtpDetailsInterface> = async (data) => {
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

    if (isEditMode) {
      const response = await editSMTPPolicy(
        `/smtp-configuration/${smtpData?.smtp_config_id}`,
        resultObject as SmtpDetailsInterface
      );
      setIsSaving(false);

      setIsToaster({
        message: response.message,
        type: response.success ? 'success' : 'failure',
        open: true,
      });
      if (response.success) {
        setTimeout(() => {
          router.push('/smtp-policy');
        }, 2000);
      }
    } else {
      const response = await createSMTPPolicy('smtp-configuration', resultObject);
      setIsToaster({
        message: response.message,
        type: response.success ? 'success' : 'failure',
        open: true,
      });
      if (response?.success) {
        setTimeout(() => {
          router.push('/smtp-policy');
        }, 2000);
      }
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
<div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-x-[4rem] gap-y-3 grid-rows-7 md:grid-rows-4 xl:grid-rows-3">
  <div className="">
    <div className="w-full ">
      <Controller
        name="smtp_host"
        control={control}
        rules={{
          required: 'Please Enter the SMTP Host',
          validate: (value) =>
            (value.length  >= 4 && value.length <= 256) ||
            'Please Enter the Length Between 4 to 256',
        }}
        render={({ field: { name, onChange, value } }) => {
          const handleChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            console.log(typeof(newValue));
            
            onChange(newValue);
            if (newValue) {
              clearErrors('smtp_host');
              // onChange(newValue);
              // trigger('smtp_host');
            } else {
              // onChange('');
              // clearErrors('smtp_host');
            }
          };

          const handleBlur = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            onChange(newValue);
            trigger('smtp_host');
          };
          return (
            <TextInput
              id={'Host'}
              name={name}
              label={'SMTP Host'}
              placeholder=""
              height="35px"
              helperText={false}
              required={true}
              minLength={4}
              maxLength={256}
              defaultValue={value}
              labelPosition={'top'}
              error={!!errors.smtp_host}
              errorText={errors.smtp_host?.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        }}
      />
    </div>
  </div>
  <div className="hidden md:block"></div>
  <div className="hidden xl:block"></div>
  <div className="">
    <div className="w-full ">
      <Controller
        name="smtp_port"
        control={control}
        rules={{
          required: 'Please Enter the SMTP Port',
          pattern: {
            value: /^-?\d+$/,
            message: 'Please Enter Numeric Only',
          },
          validate: (value) =>
            (Number(value) >= 1 && Number(value) <= 65535) ||
            'Please Enter the Value Between 1 to 65535',
        }}
        render={({ field: { name, onChange, value } }) => {
          const handleChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            if (newValue !== '') {
              onChange(newValue.toString());
              trigger('smtp_port');
            } else {
              onChange('');
              clearErrors('smtp_port');
            }
          };

          const handleBlur = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            onChange(newValue);
            trigger('smtp_port');
          };
          return (
            <TextInput
              id={'Port'}
              name={name}
              label={'SMTP Port'}
              placeholder=""
              height="35px"
              helperText={false}
              required={true}
              minLength={1}
              maxLength={65535}
              defaultValue={value}
              labelPosition={'top'}
              error={!!errors.smtp_port}
              errorText={errors.smtp_port?.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        }}
      />
    </div>
  </div>
  <div className="">
    <div className="w-full ">
      <Controller
        name="user_name"
        control={control}
        rules={{
          required: 'Please Enter the Username',
          validate: (value) =>
            (value.length >= 1 && value.length <= 99) ||
            'Please Enter the Length Between 1 to 99',
        }}
        render={({ field: { name, onChange, value } }) => {
          const handleChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            if (newValue !== '') {
              onChange(newValue);
              trigger('user_name');
            } else {
              onChange('');
              clearErrors('user_name');
            }
          };

          const handleBlur = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            onChange(newValue);
            trigger('user_name');
          };
          return (
            <TextInput
              id={'Port'}
              name={name}
              label={'Username'}
              placeholder=""
              height="35px"
              helperText={false}
              required={true}
              minLength={1}
              maxLength={99}
              defaultValue={value}
              labelPosition={'top'}
              error={!!errors.user_name}
              errorText={errors.user_name?.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        }}
      />
    </div>
  </div>
  <div className="">
    <div className="w-full ">
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Please Enter the Password',
          validate: (value) =>
            (value.length >= 1 && value.length <= 99) ||
            'Please Enter the Length Between 1 to 99',
        }}
        render={({ field: { name, onChange, value } }) => {
          const handleChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            if (newValue !== '') {
              onChange(newValue);
              // trigger('password');
            } else {
              onChange('');
              clearErrors('password');
            }
          };

          const handleBlur = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            onChange(newValue);
            trigger('password');
          };
          return (
            <PasswordInput
              id={'Port'}
              name={name}
              label={'Password'}
              height="35px"
              helperText={false}
              required={true}
              min_length={1}
              max_length={99}
              defaultValue={value}
              labelPosition={'top'}
              error={!!errors.password}
              errorText={errors.password?.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          );
        }}
      />
    </div>
  </div>
  <div className="">
    <div className="w-full ">
      <Controller
        name="default_sender"
        control={control}
        rules={{
          required: 'Please Enter the Sender Email',
          validate: (value) =>
            (value.length >= 5 && value.length <= 254) ||
            'Please Enter the Length Between 5 to 254',
        }}
        render={({ field: { name, value, onChange } }) => {
          const handleChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            if (newValue !== '') {
              onChange(newValue);
              // trigger('default_sender');
            } else {
              onChange('');
              clearErrors('default_sender');
            }
          };

          const handleBlur = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue = event.target.value;
            onChange(newValue);
            trigger('default_sender');
          };
          return (
            <TextInput
              id={'Port'}
              name={name}
              label={'Sender Email'}
              placeholder=""
              height="35px"
              helperText={false}
              required={true}
              minLength={5}
              maxLength={254}
              defaultValue={value}
              labelPosition={'top'}
              error={!!errors.default_sender}
              errorText={errors.default_sender?.message}
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
      name="encryption"
      control={control}
      render={({ field: { onChange, name, value } }) => (
        <Toggle
          id={'history-password-reusability'}
          name={name}
          label={'Encryption'}
          labelPosition={'top'}
          required={true}
          falseName=""
          width="32px"
          height="17px"
          trueName=""
          value={value}
          onToggle={(value) => {
            onChange(value);
            setConditionalLoadInputs((prev) => ({
              ...prev,
              ['history_password_reusability']: value,
            }));
          }}
        />
      )}
    />
  </div>

  {getValues('encryption') && (
    <Controller
      name="encryption_type"
      control={control}
      rules={{
        required: 'Please Select the Encryption Type​',
      }}
      render={({ field: { name, value, onChange } }) => {
        const handleChange = (
          event: React.ChangeEvent<HTMLInputElement>
        ) => {
          const newValue = event.target.id;
          console.log(newValue);
          if (newValue !== '') {
            onChange(newValue);
            trigger('encryption_type');
          } else {
            onChange('');
            clearErrors('encryption_type');
          }
        };

        return (
          <RadioButton
            id={'encryption-type'}
            options_flow="horizontal"
            optionsPerRow={2}
            name={name}
            label={'Encryption Type'}
            isShadow={false}
            options={encryptionType}
            values={value}
            onChange={(e) => {
              handleChange(e as any);
              console.log(e);
            }}
            helper_text={false}
            error={!!errors.encryption_type}
            errorText={errors.encryption_type?.message}
          />
        );
      }}
    />
  )}
  <div className="hidden xl:block"></div>
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
  <Button varient="Primary" name={'Save'} type="submit" loading={isSaving} />
  <Button
    type="button"
    varient="Secondary"
    name={'Cancel'}
    onClick={(e) => {
      e.preventDefault();
      router.push('/smtp-policy');
    }}
  />
</div>
</form> 
</>
    )}
  </>
  );
};

export default CreateEditSMTPPolicy;


