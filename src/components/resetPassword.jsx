import React, { useState } from "react";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.newPassword)
      newErrors.newPassword = "Le nouveau mot de passe est requis";
    else if (formData.newPassword.length < 6)
      newErrors.newPassword =
        "Le mot de passe doit contenir au moins 6 caractères";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "La confirmation est requise";
    else if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Password reset submitted:", formData);
      alert("Mot de passe réinitialisé avec succès !");
    }
  };

  return (
    <div className="w-screen h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
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

      {}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h2 className="font-poppins text-lg sm:text-xl font-semibold text-gray-800 text-center mb-6">
          Réinitialisez votre mot de passe
        </h2>

        <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
          Entrez et confirmez votre nouveau mot de passe
        </p>

        <div className="space-y-4">
          {}
          <div>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base ${
                errors.newPassword ? "border-red-500" : ""
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>

          {}
          <div>
            <input
              type="password"
              placeholder="Confirmez mot de passe"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm sm:text-base ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="relative w-full h-12 sm:h-14 mt-6 text-base sm:text-lg font-poppins text-white"
          >
            <div className="absolute inset-0 rounded-full bg-[#2f6bff] shadow-md hover:bg-blue-600 transition"></div>
            <span className="absolute inset-0 flex items-center justify-center capitalize font-medium">
              Enregistrer Mot De Passe
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
