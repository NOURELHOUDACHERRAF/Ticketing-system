
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardAgent from "./components/Agent/DashboardAgent";
/*import DashboardClient from "./components/DashboardClient";
import LoginPage from "./components/Authentification/LoginPage";
import VerificationCode from "./components/Authentification/codeverif";
import ResetPasswordPage from "./components/Authentification/resetPassword";*/

import Profile from "./components/Authentification/Profile";
import HistoryDashboard from "./components/Commun/Historique";
import { UserProvider } from "./components/Commun/UserContext";
//import SonelDeskTicket from "./components/Utilisateur/DescriptionTicket";
import DescriptionTicketAgent from "./components/Agent/DescriptionTicketAgent";

import Notifications from"./components/Commun/notifications";
import CreateTicketModal from"./components/Utilisateur/nvTicket";
//import DescriptionTicket from "./components/DescriptionTicketSuperviseur";
/*import Filtresup from "./components/Superviseur/FiltreSuperviseur";
import FiltreTransfere from "./components/Superviseur/TransfererTicket";*/
function App() {
  return (
    
    <Router>
      <UserProvider>
      <Routes>
        {}
        
        <Route path="/" element={<DashboardAgent/>} />
                <Route path="/ticket/:id" element={<DescriptionTicketAgent />} />

        <Route path="/ticket/1456" element={<DescriptionTicketAgent />} />
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
