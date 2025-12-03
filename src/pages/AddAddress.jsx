import { toast } from "react-hot-toast";
import { useState } from "react";
import { indianStates } from "../data/products";
import { useEcommerce } from "../context/EcommerceContext";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const AddAddress = () => {
  const initialValue = {
    name: "",
    phoneNumber: "",
    zipCode: "",
    area: "",
    city: "",
    fullAddress: "",
    state: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleAddAddress } = useEcommerce();

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({ ...prevStat, [e.target.id]: e.target.value }));
  };

  const submitAddress = async (e) => {
    e.preventDefault();
    const tostId = toast.loading("Adding Addresses...");
    handleAddAddress(formData);

    setLoading(true);
    try {
      const res = await fetch(`https://major-project-backend-nine.vercel.app/api/address/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to add new address.");
      }

      const data = await res.json();
      toast.success("Address added successfully.", { id: tostId });
    } catch (error) {
      toast.error("Something went wrong while add new address", { id: tostId });
    }

    setFormData(initialValue)
    setLoading(false);
    navigate("/userAddress");
  };
  return (
    <main className="container">
      <h1>Address </h1>
      {loading && (
        <div className="overlay">
          <RotatingLines strokeColor="#000000ff" />
        </div>
      )}
      <form onSubmit={submitAddress}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="form-labe "
            onChange={handleOnChange}
          >
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            className="form-control"
            onChange={handleOnChange}
            // required
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <label htmlFor="phoneNumber" className="form-labe ">
                Phone number:
              </label>
              <input
                type="number"
                id="phoneNumber"
                onChange={handleOnChange}
                value={formData.phoneNumber}
                // required
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="zipCode" className="form-labe ">
                Zip Code:
              </label>
              <input
                type="number"
                id="zipCode"
                onChange={handleOnChange}
                value={formData.zipCode}
                // required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <label htmlFor="area" className="form-labe ">
                Area:
              </label>
              <input
                type="text"
                id="area"
                onChange={handleOnChange}
                value={formData.area}
                // required
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="city" className="form-labe ">
                City:
              </label>
              <input
                type="text"
                id="city"
                onChange={handleOnChange}
                value={formData.city}
                // required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="fullAddress" className="form-labe ">
            Write your full address:
          </label>
          <textarea
            id="fullAddress"
            onChange={handleOnChange}
            value={formData.fullAddress}
            // required
            className="form-control"
            placeholder="Enter you full address with House number, Street, Near landmark"
          ></textarea>
        </div>

        <div className="mb-2">
          <label htmlFor="state">Select State: </label>
          <select
            id="state"
            onChange={handleOnChange}
            // required
            className="form-select"
          >
            <option value={""} disabled>
              Select Your State{" "}
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary my-3"
        >
          Add Address
        </button>
      </form>
    </main>
  );
};

export default AddAddress;
