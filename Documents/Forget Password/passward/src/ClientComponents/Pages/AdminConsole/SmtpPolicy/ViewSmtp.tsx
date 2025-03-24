'use client';
import Button from '@/Components/Ui/Button';
import PageHeader from '@/Components/Ui/PageHeader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SmtpDetailsInterface } from '@/Types/Pages/AdminConsole/SmtpPolicy';
import FormLayout from '@/Layouts/Pages/FormLayout';

const ViewSMTPPolicy = ({ data }: { data: SmtpDetailsInterface }) => {
  const router = useRouter();
  const [smtpData, setSmtpData] = useState<SmtpDetailsInterface>(
    {} as SmtpDetailsInterface
  );

  const onGetSMTPDetails = async () => {
    if (data) {
      setSmtpData(data);
    } else {
      router.push(`/smtp-policy/create`);
    }
  };

  useEffect(() => {
    onGetSMTPDetails();
  }, []);

  return (
    <>
      <div className="bg-page-title-bg-color flex flex-row items-center justify-between p-6">
        <div>
          <PageHeader header={'SMTP Configuration'} />
        </div>
        <div className="">
          <div className="flex justify-center gap-5 items-center ">
            <Button
              varient="Primary"
              name={'Edit'}
              type="button"
              onClick={() => {
                router.push(`/smtp-policy/edit`);
              }}
            />
          </div>
        </div>
      </div>
      <FormLayout>
        <form className="">
          <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3  gap-2 md:gap-x-[4rem] gap-y-3 grid-rows-7 md:grid-rows-4 xl:grid-rows-3">
            <div className="">
              <div className=" w-full ">
                <ReadOnlyField
                  id={''}
                  label={'SMTP Host'}
                  height="35px"
                  value={smtpData.smtp_host}
                />
              </div>
            </div>
            <div className="hidden md:block"></div>
            <div className="hidden xl:block"></div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'SMTP Port'}
                height="35px"
                value={smtpData?.smtp_port as number}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Username'}
                height="35px"
                value={smtpData?.user_name as string}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Password'}
                height="35px"
                value={smtpData?.password as string}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Sender Email'}
                height="35px"
                value={smtpData?.default_sender as string}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Encryption'}
                height="35px"
                value={smtpData?.encryption ? 'Yes' : 'No'}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Encryption Type'}
                height="35px"
                value={smtpData?.encryption_type as string}
              />
            </div>
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default ViewSMTPPolicy;
