import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/auth";

const ProfileCreator = () => {
  // const [name,setName] = useState("")
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const userId = auth.user._id;
  // console.log(userId)

  const navigate = useNavigate();

  // for profile creator
  const profileCretor = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:4500/api/v1/create",
        {
          userId,
          name,
          contact,
          address,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userID")).token,
          },
        }
      );
      if (data) {
        toast.success("Profile created successfully");
        setName("");
        setContact("");
        setAddress("");
        navigate("/myProfile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="auth">
      <form action="" onSubmit={profileCretor}>
        <h1>Profile creator page</h1>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          required
          type="number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter your number"
        />
        <input
          required
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreator;
