import  Link  from "next/link";

const Page: React.FC = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <Link className="text-blue-600 border-4 bg-amber-500 p-4 mt-64 ml-96 " href="/auth/forgot">Forgot Password</Link>
    </div>
  );
};

export default Page;
