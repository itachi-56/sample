'use client';
import { getPasswordPolicy } from '@/Services/Pages/AdminConsole/PasswordPolicy';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ViewPasswordPolicy from './ViewPasswordPolicy';
import { PasswordPolicyInterface } from '@/Types/Pages/AdminConsole/PasswordPolicy';
import Loader from '@/Components/Ui/Loader';

const CheckPasswordPolicy = () => {
  const router = useRouter();

  const [passwordPolicyData, setPasswordPolicyData] =
    useState<PasswordPolicyInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onGetPasswordPolicy = async () => {
    try {
      const response = await getPasswordPolicy(true);
      if (!response.data.isAvailability) {
        router.push('/password-policy/create');
      } else {
        router.push('/password-policy');
        setIsLoading(!response.data.isAvailability);
        setPasswordPolicyData(response.data.activeData);
      }
    } catch (error) {
      console.error('Error fetching password policy:', error);
    }
  };

  useEffect(() => {
    onGetPasswordPolicy();
  }, []);
  

  return (
    <>
      {isLoading ? (
        <div className="relative h-full row-span-2">
          <Loader />
        </div>
      ) : (
        <ViewPasswordPolicy data={passwordPolicyData as PasswordPolicyInterface}/>
      )}
    </>
  );
};

export default CheckPasswordPolicy;
