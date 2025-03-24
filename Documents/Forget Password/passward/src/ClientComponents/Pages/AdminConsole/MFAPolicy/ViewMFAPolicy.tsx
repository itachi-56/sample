'use client';
import Button from '@/Components/Ui/Button';
import PageHeader from '@/Components/Ui/PageHeader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import { useRouter } from 'next/navigation';
import { MFAInterface } from '@/Types/Pages/AdminConsole/MFAPolicy';
import { useEffect, useState } from 'react';
import FormLayout from '@/Layouts/Pages/FormLayout';

const ViewMFAPolicy = ({ data }: { data: MFAInterface }) => {
  const router = useRouter();
  const [MFAPolicyData, setMFAPolicyData] = useState<MFAInterface>();

  const onGetMFAPolicy = async () => {
    if (data) {
      setMFAPolicyData(data);
    } else {
      router.push(`/mfa-policy/create`);
    }
  };

  useEffect(() => {
    onGetMFAPolicy();
  }, []);

  return (
    <>
      <div className="bg-page-title-bg-color flex flex-row items-center justify-between p-6">
        <div>
          <PageHeader header={'MFA Policy'} />
        </div>
        <div className="">
          <div className="flex justify-center gap-5 items-center ">
            <Button
              varient="Primary"
              name={'Edit'}
              type="button"
              onClick={() => {
                router.push('/mfa-policy/edit');
              }}
            />
          </div>
        </div>
      </div>
      <FormLayout>
        <form className="">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-3 md:gap-x-[4rem] gap-y-3 grid-rows-7 md:grid-rows-4 xl:grid-rows-3">

        <div className="">
              <div className=" w-full ">
                <ReadOnlyField
                  id={''}
                  label={'MFA Applicability'}
                  height="35px"
                  value={MFAPolicyData?.mfa_applicability ? 'Yes' : 'No'}
                />
              </div>
            </div>
            <div className="hidden xl:block"></div>
            <div className="hidden md:block"></div>
            {MFAPolicyData?.mfa_applicability && (
              <>
                <div className=" w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'Email OTP'}
                    height="35px"
                    value={MFAPolicyData?.mfa_email ? 'Yes' : 'No'}
                  />
                </div>
                <div className=" w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'SMS OTP'}
                    height="35px"
                    value={MFAPolicyData?.mfa_phone ? 'Yes' : 'No'}
                  />
                </div>
                <div className=" w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'WhatsApp OTP'}
                    height="35px"
                    value={MFAPolicyData?.mfa_whatsapp ? 'Yes' : 'No'}
                  />
                </div>
                <div className=" w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'OTP Condition'}
                    height="35px"
                    value={MFAPolicyData?.mfa_condition as string}
                  />
                </div>
                <div className=" w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'Number of Retry Allowed'}
                    height="35px"
                    value={MFAPolicyData?.retry_limit as number}
                  />
                </div>
                <div className=" w-full ">
                  <ReadOnlyField
                    id={''}
                    label={'OTP Expiry (In Secs)'}
                    height="35px"
                    value={MFAPolicyData?.otp_expiry_seconds as number}
                  />
                </div>
              </>
            )}
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default ViewMFAPolicy;
