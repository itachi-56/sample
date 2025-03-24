'use client';
import Button from '@/Components/Ui/Button';
import PageHeader from '@/Components/Ui/PageHeader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordPolicyInterface } from '@/Types/Pages/AdminConsole/PasswordPolicy';
import FormLayout from '@/Layouts/Pages/FormLayout';

const ViewPasswordPolicy = ({ data }: { data: PasswordPolicyInterface }) => {
  const router = useRouter();
  const [passwordPolicyData, setPasswordPolicyData] =
    useState<PasswordPolicyInterface>();

  const onGetPasswordPolicy = async () => {
    if (data) {
      setPasswordPolicyData(data);
    } else {
      router.push(`/password-policy/create`);
    }
  };

  useEffect(() => {
    onGetPasswordPolicy();
  }, []);

  return (
    <>
      <div className="bg-page-title-bg-color flex  flex-row items-center justify-between px-6">
        <div>
          <PageHeader header={'Password Policy'} />
        </div>
        <div className="">
          <div className="flex justify-center gap-5 items-center ">
            <Button
              varient="Primary"
              name={'Edit'}
              type="button"
              onClick={() => {
                router.push('/password-policy/edit');
              }}
            />
          </div>
        </div>
      </div>
      <FormLayout >
            <form className="">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-3 md:gap-x-[4rem] gap-y-3 grid-rows-11 md:grid-rows-7 xl:grid-rows-5">
                <div className="">
                  <div className=" w-full lg:w-full 2xl:w-full">
                    <ReadOnlyField
                      id={''}
                      label={'Policy Name'}
                      height="35px"
                      value={passwordPolicyData?.policy_name as string}
                    />
                  </div>
                </div>
                <div className="hidden xl:block"></div>
                <div className="hidden md:block"></div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Min Length'}
                    height="35px"
                    value={passwordPolicyData?.min_length as number}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Max Length'}
                    height="35px"
                    value={passwordPolicyData?.max_length as number}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Uppercase Allowed'}
                    height="35px"
                    value={passwordPolicyData?.require_uppercase ? 'Yes' : 'No'}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Lowercase Allowed'}
                    height="35px"
                    value={passwordPolicyData?.require_lowercase ? 'Yes' : 'No'}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Numbers Allowed'}
                    height="35px"
                    value={passwordPolicyData?.require_numbers ? 'Yes' : 'No'}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Special Characters Allowed'}
                    height="35px"
                    value={
                      passwordPolicyData?.require_special_chars ? 'Yes' : 'No'
                    }
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Password Expiry (In Days)'}
                    height="35px"
                    value={passwordPolicyData?.password_expiry_days as number}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Failed Attempts Allowed'}
                    height="35px"
                    value={passwordPolicyData?.max_failed_attempts as number}
                  />
                </div>
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Auto Unlock'}
                    height="35px"
                    value={
                      passwordPolicyData?.auto_lockout_applicability
                        ? 'Yes'
                        : 'No'
                    }
                  />
                </div>
                {passwordPolicyData?.auto_lockout_applicability && (
                  <div className=" w-full lg:w-full 2xl:w-full">
                    <ReadOnlyField
                      id={''}
                      label={'Auto Unlock Duration (In Min)'}
                      height="35px"
                      value={
                        passwordPolicyData?.lockout_duration_mins as number
                      }
                    />
                  </div>
                )}
                <div className=" w-full lg:w-full 2xl:w-full">
                  <ReadOnlyField
                    id={''}
                    label={'Reusing History Password'}
                    height="35px"
                    value={
                      passwordPolicyData?.history_password_reusability
                        ? 'Yes'
                        : 'No'
                    }
                  />
                </div>
                {passwordPolicyData?.history_password_reusability && (
                  <div className=" w-full lg:w-full 2xl:w-full">
                    <ReadOnlyField
                      id={''}
                      label={'Restricted History Count'}
                      height="35px"
                      value={
                        passwordPolicyData?.password_history_count as number
                      }
                    />
                  </div>
                )}
              </div>
            </form>
      </FormLayout>
    </>
  );
};

export default ViewPasswordPolicy;
