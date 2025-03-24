'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSMTPPolicy } from '@/Services/Pages/AdminConsole/SmtpPolicy';
import ViewSMTP from './ViewSmtp';
import Loader from '@/Components/Ui/Loader';
import { SmtpDetailsInterface } from '@/Types/Pages/AdminConsole/SmtpPolicy';

const CheckSMTPPolicy = () => {
  const router = useRouter();
  const [smtpData, setSmtpData] = useState<SmtpDetailsInterface>(
      {} as SmtpDetailsInterface
    );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onGetSmtpPolicy = async () => {
    try {
      const response = await getSMTPPolicy(true);
      if (!response.data.isAvailability) {
        router.push('/smtp-policy/create');
      } else {
        setIsLoading(!response.data.isAvailability);
        setSmtpData(response.data.activeData);
    }} catch (error) {
      console.error('Error fetching smtp:', error);
    }
  };

  useEffect(() => {
    onGetSmtpPolicy();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative h-full row-span-2">
          <Loader />
        </div>
      ) : (
        <ViewSMTP  data={smtpData as SmtpDetailsInterface}/>
      )}
    </>
  );
};

export default CheckSMTPPolicy;
