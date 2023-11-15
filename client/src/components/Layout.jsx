import { Outlet } from 'react-router-dom';

const Layout = () => {
   return (
      <>
         <div className="font-poppins w-full p-10 min-h-screen bg-semiDark">
            <Outlet />
         </div>
      </>
   );
};

export default Layout;
