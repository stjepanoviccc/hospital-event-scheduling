import { Outlet, useLocation } from "react-router-dom";
import Header from "../../header";

const RootLayout: React.FC = () => {
  const location = useLocation();
  const shouldDisplayHeader = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {shouldDisplayHeader && <Header />}
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
