import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar.jsx";
import  { Footer } from "./Footer.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-[64px] min-h-screen bg-slate-900 text-slate-200">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export {Layout};
