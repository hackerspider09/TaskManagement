
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from "./components/Navbar";
// import SideBar from "./components/SideBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/HomePage";
import ChannelPage from "./pages/ChannelPage";
import CreateChannel from "./pages/CreateChannelPage";
import AuthPage from "./pages/AuthPage";
import SideBarLayout from "./pages/SideBarLayout";
import AcceptInvitation from "./pages/AcceptInvitation";

function App() {


  return (
    <div className="bg-bgColor6 ">
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div >

      <BrowserRouter >
          <Routes>
              <Route element={<SideBarLayout />}>
                  <Route index element={<HomePage/>} />
                  <Route path="/channel/create/" element={<CreateChannel/>} />
                  <Route path="/channel/:channelId" element={<ChannelPage/>} />
                  {/* <Route path="*" element={<Notfound/>} /> */}
              </Route>
             
              <Route path="/auth" element={<AuthPage/>} />
              <Route path="/invitation/:invitationId" element={<AcceptInvitation/>} />
          </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
