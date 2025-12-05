import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function UserProfile() {
  const user = {
    name: "Rahul Kumar",
    email: "rahulk@example.com",
    phone: "+91 9876543210",
    address: "Jaipur, Rajasthan, India",
    profileImage:
      "https://images.unsplash.com/photo-1603415526960-f7e0328f0a3d?auto=format&fit=crop&w=500&q=60",
    totalOrders: 12,
    wishlistCount: 8,
  };

  return (
    <div className="min-h-screen bg-gray-100 container flex justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6">
        <div className="flex flex-col items-center">
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaPhone className="text-indigo-600" />
            <span>{user.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-indigo-600" />
            <span>{user.address}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-indigo-600" />
            <span>{user.email}</span>
          </div>
        </div>
        <div className="py-3">
          <Link to={"/addAddress"} className="btn btn-primary">
            Add new Address
          </Link>
        </div>
        <div className="py-3">
          <Link to={"/orders"} className="btn btn-primary">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
