import { Link } from "react-router-dom";
import { useEcommerce } from "../context/EcommerceContext";
import { toast } from "react-hot-toast";
import { useState } from "react";
import {ThreeDots} from "react-loader-spinner"

const UserAddress = () => {
  const [loading, setLoading] = useState(false);
  const { address, handleRemoveAddress, handleSelectDefaultAddress } =
    useEcommerce();

  const removeAddress = async (id) => {
    const toastId = toast.loading("Address remove...");
    setLoading(true);
    try {
      const response = await fetch(`http://localhost/api/address/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong, Please try again later.");
      }

      const data = await response.json();

      toast.success("Address removed successfully.", { id: toastId });
    } catch (error) {
      toast.error("Failed to remove address.", { id: toastId });
    }
    setLoading(false);
    handleRemoveAddress(id);
  };

  return (
    <main className="container py-4">
      <h1 className="mb-4">User Address</h1>

      {address && address.length > 0 ? (
        address.map((userAdd) => (
          <div className="card mb-4 shadow-sm" key={userAdd.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">{userAdd.name}</h4>

                <button
                  onClick={() => handleSelectDefaultAddress(userAdd)}
                  className="btn "
                  style={{
                    backgroundColor: userAdd.isDefault ? "green" : "white",
                  }}
                >
                  Set as Default
                </button>
              </div>

              <p className="mt-3 mb-1">📞 {userAdd.phoneNumber}</p>

              <div className="row mb-2">
                <div className="col-md-4">
                  <p className="mb-1">
                    <strong>Zip:</strong> {userAdd.zipCode}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-1">
                    <strong>City:</strong> {userAdd.city}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-1">
                    <strong>State:</strong> {userAdd.state}
                  </p>
                </div>
              </div>

              <p className="mb-3">
                <strong>Full Address:</strong> {userAdd.fullAddress}
              </p>

              <div className="row g-2">
                <div className="col-6">
                  <Link
                    to={`/address/${userAdd.id}`}
                    className="btn btn-primary w-100"
                  >
                    Update
                  </Link>
                </div>

                <div className="col-6">
                  <button
                    onClick={() => removeAddress(userAdd.id)}
                    disabled={loading}
                    className="btn btn-danger w-100"
                  >
                    {loading ? <ThreeDots height={20}/>: "Remove"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Address Found.</p>
      )}
    </main>
  );
};

export default UserAddress;
