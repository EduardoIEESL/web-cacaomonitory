import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

const DashboardPage = () => {
  const { user } = useAuthContext();
  const auth = getAuth();

  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  //   add logout button
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/signin");
  };

  return (
    <div className='dashboard__container'>
      <div className='dashboard__card'>
        <h2 className='text-2xl font-semibold'>
          {user && user.email.charAt(0).toUpperCase() + user.email.slice(1)} is
          logged in!
        </h2>
        <button onClick={handleLogout} className=''>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
