import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contextApi/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Myprofile = () => {
  const [auth,setAuth] = useAuth();
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [proData, setProData] = useState([]);
  // console.log(proData)


  const navigate = useNavigate();


//   logout button

const logoutButton = async() =>{
    await setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("userID");
      toast.success("Logout");
      navigate("/login");
}

  // filter user details
  const filterUserProdileData = proData.filter(
    (pro) => pro.userId === auth.user._id
  );
  // console.log(filterUserProdileData.length)

  // for opending modal

  const openModal = (_id) => {
    setId(_id);
    setModal(true);
  };

  // for updating profile data

  const updateProfileData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4500/api/v1/edit/${id}`,
        {
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
        toast.success(data.message);
        getAllProfileDetails();
        setModal(false);
        setName("");
        setContact("");
        setAddress("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for getting all profile data
  const getAllProfileDetails = async () => {
    const { data } = await axios.get(
      "http://localhost:4500/api/v1/getProfile",
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      }
    );

    setProData(data.profileData);
  };

  useEffect(() => {
    getAllProfileDetails();
  }, []);

  // for deleting all profile data

  const deleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/api/v1/delete/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      });
      toast.success("Deleted successfully");
      getAllProfileDetails();
    } catch (error) {}
  };

  return (
    <div className="profile">
      <h2>All profile details</h2>

      <button  style={{
                    backgroundColor: "rgba(246, 51, 51, 0.627)",
                    outline: "none",
                    border: "1px solid grey",
                    borderRadius: "10px",
                    width:"100px",
                    height:"30px",
                    marginLeft:"10px"
                  }} 
                  onClick={logoutButton}
                  >Logout</button> 
                  <Link to={"/Profilecreator"} style={{
                    
                    outline: "none",
                    borderBottom: "1px solid grey",
                    padding:"0 0 5px 0",
                    width:"fit-content",
                  
                    marginLeft:"10px"
                  }} >Go to profile page creator</Link>


      {filterUserProdileData.length > 0 ? (
        <table>
          <thead>
          <tr>
            
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                {filterUserProdileData.map((pro) => {
                  return (
                    <tr key={pro._id}>
                      <td>{pro.name}</td>

                      <td>{pro.contact}</td>
                      <td>{pro.address}</td>
                      <td className="btn">
           <button className="edit" onClick={() => openModal(pro._id)}>
             Edit{" "}
           </button>
           {modal === true && (
            <form
              className="updateDetails"
              action=""
              onSubmit={updateProfileData}
            >
              <h1>Update Profile page</h1>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
              <input
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter your number"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
              <div className="btn">
                <button
                  style={{
                    backgroundColor: "rgba(225, 255, 0, 0.686)",
                    outline: "none",
                    border: "1px solid grey",
                    borderRadius: "10px",
                  }}
                  type="submit"
                >
                  Update
                </button>

                <button
                  style={{
                    backgroundColor: "rgba(246, 51, 51, 0.627)",
                    outline: "none",
                    border: "1px solid grey",
                    borderRadius: "10px",
                  }}
                  onClick={() => setModal(false)}
                >
                  Cancle
                </button>
              </div>
            </form>
          )}
          <button
            className="delete"
            onClick={() => deleteProfile(pro._id)}
          >
            Delete
          </button>
        </td>
                    </tr>
                  );
                })}
              </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "black" }}>
          No data added yet!!{" "}
          
        </p>
      )}
     
    </div>
  );
};

export default Myprofile;




