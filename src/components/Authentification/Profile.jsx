import { useState } from "react";
import { Edit, X } from "lucide-react";
import Sidebar from "../Commun/sidebar";
import { useUser } from "../Commun/UserContext";
import Header from "../Commun/Header";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: "Ali.Bouali@sonalgaz.dz",
    phone: "0551234567",
    unit: "Tlemcen (DTLM)",
    login: "Ali.b",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Updated Profile:", formData);
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-poppins bg-blue-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header setSidebarOpen={setSidebarOpen} title="Profil" />

        {}//section profil
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto">
          <section className="relative bg-white rounded-lg shadow-md max-w-2xl w-full p-6 sm:p-8">
            {}//boutan modifier
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 bg-blue-100 text-blue-600 p-2 rounded-full shadow hover:bg-blue-200"
            >
              <Edit size={18} className="text-blue-500" />
            </button>

            {}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="avatar"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100"
                />
              </div>
            </div>

            {}
            <div className="grid md:grid-cols-3 gap-6 text-gray-700 mb-8">
              <div>
                <p className="text-sm text-gray-500">Nom</p>
                <p className="font-semibold">{formData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prénom</p>
                <p className="font-semibold">{formData.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Identifiant</p>
                <p className="font-semibold">{formData.login}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Unité</p>
                <p className="font-semibold">{formData.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E-mail</p>
                <p className="font-semibold text-blue-600">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Numéro de téléphone</p>
                <p className="font-semibold">{formData.phone}</p>
              </div>
            </div>

            {}//la table des ticket
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full text-sm text-center">
                <thead className="bg-gray-50 text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3">Tickets totaux</th>
                    <th className="px-6 py-3">Résolus</th>
                    <th className="px-6 py-3">En attente</th>
                    <th className="px-6 py-3">En cours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 font-semibold text-gray-700">11</td>
                    <td className="px-6 py-3 font-semibold text-green-600">8</td>
                    <td className="px-6 py-3 font-semibold text-black-600">22</td>
                    <td className="px-6 py-3 font-semibold text-orange-600">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
<div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-4 relative border border-gray-200 max-h-[650px] ">
            {}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-4">Modifier Profil</h2>

            <div className="space-y-2">
              <div>
                <label className="block text-sm text-gray-600">Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Unité</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Identifiant</label>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>

            {}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                    style={{ backgroundColor: "#2f6bff", color: "white" }}

              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
