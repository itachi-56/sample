'use client';
import Button from '@/Components/Ui/Button';
import PageHeader from '@/Components/Ui/PageHeader';
import ReadOnlyField from '@/Components/Ui/ReadOnlyField';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SessionPolicyInterface } from '@/Types/Pages/AdminConsole/SessionPolicy';
import FormLayout from '@/Layouts/Pages/FormLayout';

const ViewSessionPolicy = ({ data }: { data: SessionPolicyInterface }) => {
  const router = useRouter();
  const [sessionPolicyData, setSessionPolicyData] =
    useState<SessionPolicyInterface>();

  const onGetSessionPolicy = async () => {
    if (data) {
      setSessionPolicyData(data);
    } else {
      router.push(`/session-policy/create`);
    }
  };

  useEffect(() => {
    onGetSessionPolicy();
  }, []);

  return (
    <>
      <div className="bg-page-title-bg-color flex flex-row items-center justify-between p-6">
        <div>
          <PageHeader header={'Session Policy'} />
        </div>
        <div className="">
          <div className="flex justify-center gap-5 items-center ">
            <Button
              varient="Primary"
              name={'Edit'}
              type="button"
              onClick={() => {
                router.push('/session-policy/edit');
              }}
            />
          </div>
        </div>
      </div>
      <FormLayout>
        <form className="">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3  gap-2 md:gap-x-[4rem]  gap-y-3 grid-rows-6 md:grid-rows-4  xl:grid-rows-3">
            <div className="">
              <div className=" w-full ">
                <ReadOnlyField
                  id={''}
                  label={'Policy Name'}
                  height="35px"
                  value={sessionPolicyData?.policy_name as string}
                />
              </div>
            </div>
            <div className="hidden md:block"></div>
            <div className="hidden xl:block"></div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Session Timeout (In Min)'}
                height="35px"
                value={sessionPolicyData?.session_timeout_minutes as number}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Auto Logout'}
                height="35px"
                value={sessionPolicyData?.auto_logout ? 'Yes' : 'No'}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Warning (In Min)'}
                height="35px"
                value={sessionPolicyData?.warning_minutes as number}
              />
            </div>
            <div className=" w-full ">
              <ReadOnlyField
                id={''}
                label={'Session Extension Allowed'}
                height="35px"
                value={
                  sessionPolicyData?.session_extension_option ? 'Yes' : 'No'
                }
              />
            </div>
            {sessionPolicyData?.session_extension_option && (
              <div className=" w-full ">
                <ReadOnlyField
                  id={''}
                  label={'Max Session (In Min)'}
                  height="35px"
                  value={sessionPolicyData?.max_session_duration_mins as number}
                />
              </div>
            )}
          </div>
        </form>
      </FormLayout>
    </>
  );
};

export default ViewSessionPolicy;
