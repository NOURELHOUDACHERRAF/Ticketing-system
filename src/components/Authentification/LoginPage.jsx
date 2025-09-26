import { useState } from "react";
import { Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
    {}
<div className="flex items-center justify-center gap-1 mb-8">
  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white-500 rounded-xl">
    <img
      src="./src/assets/LOGO.svg"
      alt="S logo"
      className="w-10 h-10 sm:w-15 sm:h-15"
    />
  </div>
  <b className=" font-poppins text-2xl sm:text-2xl font-bold text-blue-600 tracking-wide"
  style={{ Color: "#2f6bff" }}>
    SONELDESK
  </b>
</div>



        {}
        <h2 className="font-poppins text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6">
          Connectez-vous
        </h2>

        {}
        <div className="space-y-4">
          {}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" font-poppins w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
            />
          </div>

          {}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-poppins w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base"
            />
          </div>
        </div>
        {}
        <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="relative w-40 h-12 sm:h-14 mt-6 text-base sm:text-lg font-poppins text-white "
        >
          {}
          <div className="absolute inset-0 rounded-full bg-[#2f6bff] shadow-md hover:bg-blue-600 transition"></div>

          {}
          <span className="absolute inset-0 flex items-center justify-center capitalize font-medium" >
            Se connecter
          </span>
        </button>
        </div>
        {}
        <div className=" font-poppins text-xs sm:text-sm text-gray-500 hover:text-blue-500 text-center mt-4 cursor-pointer">
          Mot de passe oublié?
        </div>

       
      </div>
    </div>
  );
};

export default LoginPage;
