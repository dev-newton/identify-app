import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ImageCapture from "react-image-data-capture";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input/Input";
import api from "../assets/api";

const Register = (props) => {
  const [bvn, setBvn] = useState("");
  const [camera, setCamera] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCapture = (imageData) => {
    setImgSrc(imageData.webP);
    setImgFile(imageData.file);
  };

  // Use useCallback to avoid unexpected behaviour while rerendering
  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  // Use useMemo to avoid unexpected behaviour while rerendering
  const config = useMemo(() => ({ video: true }), []);
  const formData = new FormData();
  formData.append("file", imgFile);

  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const successToastNotification = () => {
    toast.success("Verification Succcessful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      progress: undefined,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      number: bvn,
      image: imgSrc,
    };

    const user_data = {
      username,
      password,
    };

    setLoading(true);

    try {
      const res_1 = await api.verifyBvnWithFace(data);
      const res_2 = await api.livenessCheck(data.image);
      console.log("verifyBvnWithFace:", res_1.data);
      console.log("livenessCheck: ", res_2.data);
      console.log("userData:", user_data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    successToastNotification();
    await timeout(1000);
    props.history.push("/profile");
  };

  return (
    <div className="login-bg">
      <div className="login-wrapper">
        <h1 className="header-nav lg">Identify</h1>
        <div className="form-wrapper">
          <h3 className="header-nav">Register</h3>
          <form onSubmit={handleSubmit}>
            <Input
              label="BVN"
              type="number"
              onChange={(e) => setBvn(e.target.value)}
              required
            />
            <label className="label">Image:</label>
            <br />
            {!camera && (
              <button
                type="submit"
                className="login-button"
                onClick={() => setCamera(true)}
              >
                Click to take picture
              </button>
            )}
            {camera && !imgSrc && (
              <ImageCapture
                onCapture={onCapture}
                onError={onError}
                width={300}
                userMediaConfig={config}
              />
            )}
            {imgSrc && (
              <div>
                <img src={imgSrc} alt="captured-img" />
              </div>
            )}
            {imgSrc && (
              <button
                type="submit"
                className="login-button"
                onClick={() => {
                  setCamera(true);
                  setImgSrc(null);
                }}
              >
                Take another picture
              </button>
            )}
            <br /> <br />
            <Input
              label="Username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="btn-wrapper">
              <button type="submit" className="login-button">
                {!loading ? "Register" : "Loading..."}
              </button>
            </div>
            <p>
              Already have an account? <Link to="/">Login </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
