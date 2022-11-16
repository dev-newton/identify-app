import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Input from "../components/Input/Input";
import Navbar from "../components/Navbar/Navbar";
import profileImg from "../assets/images/me.jpeg";

const ProfileResult = (props) => {
  const [loading] = useState(false);

  return (
    <>
      <Navbar />
      <div className="wallets">
        {loading ? (
          <div className="loading-wrapper">
            <ClipLoader color="#182cd1" loading={loading} size={100} />
          </div>
        ) : (
          <>
            <h1 style={{ marginBottom: 20 }}>Profile Information</h1>
            <div className="profile-pic">
              <img src={profileImg} alt="profileImg" />
            </div>
            <div className="form-row">
              <Input label="Firstname" type="text" value="Newton" disabled />
              <Input label="Middlename" type="text" value="Odigie" disabled />
              <Input label="Lastname" type="text" value="Imonjirie" disabled />
              <Input label="Gender" type="text" value="MALE" disabled />
              <Input
                label="Email"
                type="text"
                value="newtonimonjirie@gmail.com"
                disabled
              />
              <Input
                label="Phone number"
                type="text"
                value="+2349051112222"
                disabled
              />
              <Input label="Watchlisted" type="text" value="NO" disabled />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileResult;
