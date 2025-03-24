'use client';
import { useEffect, useState } from 'react';
import ViewSessionPolicy from './ViewSessionPolicy';
import { getSessionPolicy } from '@/Services/Pages/AdminConsole/SessionPolicy';
import { useRouter } from 'next/navigation';
import Loader from '@/Components/Ui/Loader';
import { SessionPolicyInterface } from '@/Types/Pages/AdminConsole/SessionPolicy';

const CheckSessionPolicy = () => {
  const router = useRouter();
  const [sessionPolicyData, setSessionPolicyData] =
    useState<SessionPolicyInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onGetSessionPolicy = async () => {
    try {
      const response = await getSessionPolicy(true);
      if (!response.data.isAvailability) {
        router.push('/session-policy/create');
      } else {
        router.push('/session-policy');
        setIsLoading(!response.data.isAvailability);
        setSessionPolicyData(response.data.activeData);
      }
    } catch (error) {
      console.error('Error fetching password policy:', error);
    }
  };

  useEffect(() => {
    onGetSessionPolicy();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative h-full row-span-2">
          <Loader />
        </div>
      ) : (
        <ViewSessionPolicy data={sessionPolicyData as SessionPolicyInterface} />
      )}
    </>
  );
};

export default CheckSessionPolicy;
