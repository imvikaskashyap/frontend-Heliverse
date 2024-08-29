import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"; 
import { toast } from "react-toastify";

const CreateUser = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [domain, setDomain] = useState("");
  const [available, setAvailable] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("domain", domain);
    formData.append("available", available.toString()); 
  
    if (avatar) {
      formData.append("avatar", avatar); 
    }
  
    try {
      await axios.post("http://localhost:8080/api/users/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("User created successfully!");
      navigate('/'); 
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.");
    }
  };
  

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-gray-100 mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 font-medium">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="block w-full px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="block w-full px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="block w-full px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Domain:</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Domain"
            className="block w-full px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Available:</label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="block w-full px-3 py-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-medium">Avatar:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full mt-2 text-gray-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
