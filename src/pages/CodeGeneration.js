import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import Button from "../components/Button/Button";
import Navbar from "../components/Navbar/Navbar";

const CodeGeneration = (props) => {
  const [loading] = useState(false);
  const [loadingGen, setLoadingGen] = useState(false);
  const [code, setCode] = useState(false);

  const data = [
    {
      code: "NBKJABNnN324591hfnq",
      date_generated: "27/10/2022: 10:30 AM",
      date_used: "N/A",
      status: "processing",
      used_by: "N/A",
    },
    {
      code: "KBKSDBSFKCJN7396823",
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

  const generateCode = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleGenerateCode = async () => {
    setLoadingGen(true);
    setCode(false);
    await timeout(2000);

    setCode(generateCode(18));
    setLoadingGen(false);
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
            <div className="btn-wrapper">
              <Button
                label={loadingGen ? "Loading..." : "Generate Code"}
                onClick={handleGenerateCode}
              />
              <p>{code}</p>
              {code && (
                <small style={{ color: "red" }}>
                  Code expires in 10 minutes
                </small>
              )}
            </div>
            <table>
              <tr>
                <th>Code</th>
                <th>Date Generated</th>
                <th>Date Used</th>
                <th>Status</th>
                <th>Used by</th>
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
          </>
        )}
      </div>
    </>
  );
};

export default CodeGeneration;
