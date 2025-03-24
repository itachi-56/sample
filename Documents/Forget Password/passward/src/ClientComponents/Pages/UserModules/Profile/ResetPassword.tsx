'use client'
// import Button from '@/Components/Ui/Button';
// import PasswordInput from '@/Components/Ui/PasswordInput';
// import Toaster from '@/Components/Ui/Toaster';
// import { useRouter } from 'next/router'
import React from 'react';
// import { Controller, SubmitHandler, useForm } from 'react-hook-form';

// interface ResetPasswordInterface {
//   current_password: string;
//   new_password: string;
//   confirm_password: string;
//   otp: number;
// }

const ResetPassword = () => {
  //   const router = useRouter();
//   const [resetPasswordData] = useState<ResetPasswordInterface>();

  //   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isSaving, setIsSaving] = useState<boolean>(false);
  //   const pathname = usePathname();

//   const [isEditMode, setIsEditMode] = useState<boolean>(false);
//   setIsEditMode(false);
//   const [isToaster, setIsToaster] = useState<{
//     open: boolean;
//     type: 'success' | 'failure';
//     message: string;
//   }>({
//     open: false,
//     type: 'success',
//     message: '',
//   });
//   const {
//     control,
//     handleSubmit,
//     trigger,
//     // reset,
//     // watch,
//     // setError,
//     clearErrors,
//     formState: { errors },
//   } = useForm<ResetPasswordInterface>({
//     defaultValues: resetPasswordData,
//   });

//   const onSubmit: SubmitHandler<ResetPasswordInterface> = async (data) => {
//     setIsSaving(true);
//     const convertStringNumbersToNumbers = (
//       obj: Record<string, any>
//     ): Record<string, any> => {
//       return Object.fromEntries(
//         Object.entries(obj).map(([key, value]) => {
//           const isNumberString =
//             typeof value === 'string' && !isNaN(Number(value));
//           return [key, isNumberString ? Number(value) : value];
//         })
//       );
//     };

//     const resultObject = convertStringNumbersToNumbers(data);
//     const createAndEditMFAApi = async () => {
//       if (isEditMode) {
//         const response = await editMFAPolicy(
//           `/mfa-settings/${MFAPolicyData?.mfa_id}`,
//           resultObject as any
//         );
//         setIsSaving(false);

//         setIsToaster({
//           message: response.message,
//           type: response.success ? 'success' : 'failure',
//           open: true,
//         });

//         if (response.success) {
//           setTimeout(() => {
//             //   router.push('/mfa-policy');
//           }, 2000);
//         }
//       } else {
//         const response = await createMFAPolicy(
//           `/mfa-settings`,
//           resultObject as any
//         );

//         setIsToaster({
//           message: response.message,
//           type: response.success ? 'success' : 'failure',
//           open: true,
//         });

//         if (response.success) {
//           setTimeout(() => {
//             //   router.push('/mfa-policy');
//           }, 2000);
//         }
//       }
//     };

//     if (resultObject?.mfa_applicability) {
//       if (
//         resultObject?.mfa_email ||
//         resultObject?.mfa_phone ||
//         resultObject?.mfa_whatsapp
//       ) {
//         createAndEditMFAApi();
//       } else {
//         setIsToaster({
//           message: "Please Select 'Yes' for at least One OTP Method",
//           type: 'failure',
//           open: true,
//         });
//       }
//     } else {
//       delete resultObject.mfa_email;
//       delete resultObject.mfa_phone;
//       delete resultObject.mfa_whatsapp;
//       delete resultObject.mfa_condition;
//       delete resultObject.retry_limit;
//       delete resultObject.otp_expiry_seconds;
//       createAndEditMFAApi();
//     }
//   };

  return (
    <div>
        ddfdfd
    </div>
    // <form
    //   action=""
    //   onSubmit={handleSubmit(onSubmit)}
    //   className="flex flex-col duration-150 h-full pt-[calc(2rem+3px)] gap-[calc(1rem-0px)] "
    // >
    //   <div className="">
    //     <div className="w-full lg:w-[80%] 2xl:w-[347px]">
    //       <Controller
    //         name="current_password"
    //         control={control}
    //         rules={{
    //           required: 'Please Enter the Password',
    //           validate: (value) =>
    //             (value.length >= 1 && value.length <= 99) ||
    //             'Please Enter the Length Between 1 to 99',
    //         }}
    //         render={({ field: { name, onChange, value } }) => {
    //           const handleChange = (
    //             event: React.ChangeEvent<HTMLInputElement>
    //           ) => {
    //             const newValue = event.target.value;
    //             if (newValue !== '') {
    //               onChange(newValue);
    //               // trigger('password');
    //             } else {
    //               onChange('');
    //               clearErrors('current_password');
    //             }
    //           };

    //           const handleBlur = (
    //             event: React.ChangeEvent<HTMLInputElement>
    //           ) => {
    //             const newValue = event.target.value;
    //             onChange(newValue);
    //             trigger('current_password');
    //           };
    //           return (
    //             <PasswordInput
    //               id={'current_password'}
    //               name={name}
    //               label={'Current Password'}
    //               height="35px"
    //               helperText={false}
    //               required={true}
    //               min_length={1}
    //               max_length={99}
    //               defaultValue={value}
    //               labelPosition={'top'}
    //               error={!!errors.current_password}
    //               errorText={errors.current_password?.message}
    //               onChange={handleChange}
    //               onBlur={handleBlur}
    //             />
    //           );
    //         }}
    //       />
    //     </div>
    //   </div>
    //   <div className="">
    //     <div className="w-full lg:w-[80%] 2xl:w-[347px]">
    //       <Controller
    //         name="new_password"
    //         control={control}
    //         rules={{
    //           required: 'Please Enter the Password',
    //           validate: (value) =>
    //             (value.length >= 1 && value.length <= 99) ||
    //             'Please Enter the Length Between 1 to 99',
    //         }}
    //         render={({ field: { name, onChange, value } }) => {
    //           const handleChange = (
    //             event: React.ChangeEvent<HTMLInputElement>
    //           ) => {
    //             const newValue = event.target.value;
    //             if (newValue !== '') {
    //               onChange(newValue);
    //               // trigger('password');
    //             } else {
    //               onChange('');
    //               clearErrors('new_password');
    //             }
    //           };

    //           const handleBlur = (
    //             event: React.ChangeEvent<HTMLInputElement>
    //           ) => {
    //             const newValue = event.target.value;
    //             onChange(newValue);
    //             trigger('new_password');
    //           };
    //           return (
    //             <PasswordInput
    //               id={'new_password'}
    //               name={name}
    //               label={'New Password'}
    //               height="35px"
    //               helperText={false}
    //               required={true}
    //               min_length={1}
    //               max_length={99}
    //               defaultValue={value}
    //               labelPosition={'top'}
    //               error={!!errors.new_password}
    //               errorText={errors.new_password?.message}
    //               onChange={handleChange}
    //               onBlur={handleBlur}
    //             />
    //           );
    //         }}
    //       />
    //     </div>
    //   </div>
    //   <div className="">
    //     <div className="w-full lg:w-[80%] 2xl:w-[347px]">
    //       <Controller
    //         name="confirm_password"
    //         control={control}
    //         rules={{
    //           required: 'Please Enter the Password',
    //           validate: (value) =>
    //             (value.length >= 1 && value.length <= 99) ||
    //             'Please Enter the Length Between 1 to 99',
    //         }}
    //         render={({ field: { name, onChange, value } }) => {
    //           const handleChange = (
    //             event: React.ChangeEvent<HTMLInputElement>
    //           ) => {
    //             const newValue = event.target.value;
    //             if (newValue !== '') {
    //               onChange(newValue);
    //               // trigger('password');
    //             } else {
    //               onChange('');
    //               clearErrors('confirm_password');
    //             }
    //           };

    //           const handleBlur = (
    //             event: React.ChangeEvent<HTMLInputElement>
    //           ) => {
    //             const newValue = event.target.value;
    //             onChange(newValue);
    //             trigger('confirm_password');
    //           };
    //           return (
    //             <PasswordInput
    //               id={'confirm_password'}
    //               name={name}
    //               label={'Confirm Password'}
    //               height="35px"
    //               helperText={false}
    //               required={true}
    //               min_length={1}
    //               max_length={99}
    //               defaultValue={value}
    //               labelPosition={'top'}
    //               error={!!errors.new_password}
    //               errorText={errors.new_password?.message}
    //               onChange={handleChange}
    //               onBlur={handleBlur}
    //             />
    //           );
    //         }}
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <Toaster
    //       open={isToaster?.open}
    //       type={isToaster?.type}
    //       message={isToaster?.message}
    //     />
    //   </div>
    //   <div className="p-form-bottom-button-gap-size">
    //     <div className=" flex justify-start gap-5 ">
    //       <Button
    //         varient="Primary"
    //         name={true ? 'Send OTP' : 'Save'}
    //         type="submit"
    //         loading={isSaving}
    //       />
    //     </div>
    //   </div>
    // </form>
  );
};

export default React.memo(ResetPassword);





