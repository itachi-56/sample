'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMFAPolicy } from '@/Services/Pages/AdminConsole/MFAPolicy';
import ViewMFAPolicy from './ViewMFAPolicy';
import { MFAInterface } from '@/Types/Pages/AdminConsole/MFAPolicy';
import Loader from '@/Components/Ui/Loader';

const CheckMFAPolicy = () => {
  const router = useRouter();
  const [MFAPolicyData, setMFAPolicyData] = useState<MFAInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onGetMFAPolicy = async () => {
    try {
      const response = await getMFAPolicy(true);
      if (!response.data.isAvailability) {
        router.push('/mfa-policy/create');
      } else {
        router.push('/mfa-policy');
        setIsLoading(!response.data.isAvailability);
        setMFAPolicyData(response.data.activeData);
      }
    } catch (error) {
      console.error('Error fetching password policy:', error);
    }
  };

  useEffect(() => {
    onGetMFAPolicy();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative h-full row-span-2">
          <Loader />
        </div>
      ) : (
        <ViewMFAPolicy data={MFAPolicyData as MFAInterface} />
      )}
    </>
  );
};

export default CheckMFAPolicy;
