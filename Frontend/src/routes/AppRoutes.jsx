import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Layout and Pages
import { Layout } from "../components/Layout.jsx"
import { Home } from "../pages/Home.jsx";
import { About } from "../pages/About.jsx";
import { Contact } from "../pages/Contact.jsx";
import { SignIn } from "../pages/SignIn.jsx";
import { SignUp } from "../pages/SignUp.jsx";
import NarrativeHub from "../pages/NarrativeHub.jsx";
// import Register from "./pages/Register.jsx";
// import NotFound from "./pages/NotFound.jsx"; // optional

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="register" element={<Register />} /> */}
        {/* <Route path="*" element={<NotFound />} /> Optional 404 */}
      </Route>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/hub" element={<NarrativeHub/>}/>
    </>
  )
);

export default router;