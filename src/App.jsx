
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardAgent from "./components/DashboardAgent";
import DashboardClient from "./components/DashboardClient";
import LoginPage from "./components/LoginPage";
import VerificationCode from "./components/codeverif";
import ResetPasswordPage from "./components/resetPassword";

import Profile from "./components/Profile";
import HistoryDashboard from "./components/Historique";
import { UserProvider } from "./components/UserContext";
import SonelDeskTicket from "./components/DescriptionTicket";
import Notifications from"./components/notifications";
import CreateTicketModal from"./components/nvTicket";
import DescriptionTicket from "./components/DescriptionTicketSuperviseur";
import Filtresup from "./components/FiltreSuperviseur";
import FiltreTransfere from "./components/TransfererTicket";
function App() {
  return (
    
    <Router>
      <UserProvider>
      <Routes>
        {}
        
        <Route path="/" element={<DashboardClient/>} />
         <Route path="/ticket/:id" element={<SonelDeskTicket />} />
        <Route path="/nvTicket" element={<CreateTicketModal/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/notifications" element={<Notifications/>} />

        <Route path="/Historique" element={<HistoryDashboard/>} />


      </Routes>
      </UserProvider>
    </Router>
  );
}
export default App;
