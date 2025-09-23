import{ useState, useEffect } from "react";

const VerificationCode = () => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      
      if (value && index < code.length - 1) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  const handleSubmit = () => {
    alert("Code soumis automatiquement : " + code.join(""));
  };

  return (
    
   
    <div className="w-screen h-screen flex items-center justify-center bg-[#e6eeff] font-poppins p-4">
      {}
      <div className="absolute top-3 left-3 flex items-center gap-1">
        <div className="flex items-center justify-center w-12 h-12  rounded-xl ">
          <img
            src="./src/assets/LOGO.svg"
            alt="S logo"
            className="w-15 h-15"
          />
        </div>
        <b className="font-poppins text-xl sm:text-2xl font-bold text-blue-600 tracking-wide">
          SONELDESK
        </b>
      </div>
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 text-center">
        
        {}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          Entrez le code de vérification
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
          Nous avons envoyé un code à{" "}
          <span className="font-medium">test@test.com</span>
        </p>

        {}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border border-gray-300 rounded-lg text-center text-lg sm:text-xl md:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {}
        <p className="text-gray-500 text-xs sm:text-sm mb-8">
          Vous n’avez pas reçu de code ?{" "}
          <span className="text-blue-600 cursor-pointer font-medium hover:underline">
            Cliquez pour renvoyer
          </span>
        </p>

        {}
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 rounded-full border text-gray-700 shadow hover:bg-gray-100 text-sm sm:text-base">
            Annuler
          </button>
          <button
  onClick={handleSubmit}
  className="px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-white rounded-lg shadow text-sm sm:text-base"
  style={{ backgroundColor: "#2f6bff" }}
>
  Vérifier
</button>

        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
