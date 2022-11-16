import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { BsShieldFillX } from "react-icons/bs";
import { toast } from "react-toastify";

import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";
import Navbar from "../components/Navbar/Navbar";
import Input from "../components/Input/Input";

const CodeValidation = (props) => {
  const [loading] = useState(false);
  const [loadingGen, setLoadingGen] = useState(false);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const data = [
    {
      code: "NBKJABNnN324591hfnq",
      date_generated: "27/10/2022: 10:30 AM",
      date_used: "N/A",
      status: "processing",
      used_by: "N/A",
    },
    {
      code: "MMMDDDKNDKDDDDD",
      date_generated: "29/10/2022: 04:15 PM",
      date_used: "N/A",
      status: "invalid",
      used_by: "N/A",
    },
    {
      code: "UIWOEEUBNKNKNX143",
      date_generated: "30/10/2022: 10:30 AM",
      date_used: "30/10/2022: 10:32 AM",
      status: "completed",
      used_by: "Zenith Bank",
    },
    {
      code: "NBKJABNnN324591hfnq",
      date_generated: "04/11/2022: 10:32 AM",
      date_used: "N/A",
      status: "expired",
      used_by: "N/A",
    },
    {
      code: "NBKJABNnN324591hfnq",
      date_generated: "11/11/2022: 14:03 PM",
      date_used: "11/11/2022: 14:09 PM",
      status: "completed",
      used_by: "Olabampe Olamigoke",
    },
  ];

  const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleValidateCode = async () => {
    setLoadingGen(true);
    await timeout(2000);

    setLoadingGen(false);
    if (code === "123456789") {
      onOpenModal();
      return;
    }
    toast.success("Validation Succcessful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      progress: undefined,
    });

    props.history.push("/profile-result");
  };

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
            <div className="btn-wrapper flex">
              <Input
                label=""
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
                type="password"
              />
              <Button
                label={loadingGen ? "Loading..." : "Validate Code"}
                onClick={handleValidateCode}
              />
            </div>
            <table>
              <tr>
                <th>Code</th>
                <th>Date Generated</th>
                <th>Date Used</th>
                <th>Status</th>
                <th>Generated by</th>
              </tr>
              <tbody>
                {data?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.code}</td>
                      <td>{item.date_generated}</td>
                      <td>{item.date_used}</td>
                      <td>
                        <div className={`active-wallet ${item.status}`}>
                          {item.status}
                        </div>
                      </td>
                      <td>{item.used_by}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Modal
              open={open}
              onOpenModal={onOpenModal}
              onCloseModal={onCloseModal}
              modalTitle=""
            >
              <div className="modal-container">
                <BsShieldFillX fontSize={102} color="#db0012" />

                <h1>Validation Failed!</h1>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default CodeValidation;