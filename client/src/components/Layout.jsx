import { Outlet } from 'react-router-dom';

const Layout = () => {
   return (
      <>
         <div className="flex justify-center font-poppins w-full py-5 sm:py-10 px-3 sm:px-5 min-h-screen bg-semiDark">
            <div className="w-full max-w-3xl">
               <Outlet />
            </div>
         </div>
      </>
   );
};

export default Layout;
