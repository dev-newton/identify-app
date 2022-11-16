import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";

import { getWalletTranx } from "../store/actions/getWallet";
import Pagination from "../components/Pagination/Pagination";
import Modal from "../components/Modal/Modal";
import InvoiceRow from "../components/InvoiceRow";
import Navbar from "../components/Navbar/Navbar";

const Transactions = (props) => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [walletTranx, setWalletTranx] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = props.location.state;

  const dispatch = useDispatch();
  const _wallet_tranx = useSelector((state) => state.getWallet.wallet_tranx);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    getWalletTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (_wallet_tranx) {
      setWalletTranx(_wallet_tranx.data);
    }
  }, [_wallet_tranx]);

  const getWalletTransactions = async () => {
    setLoading(true);
    try {
      await dispatch(getWalletTranx(id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Request failed, Try again after some time!" || error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        progress: undefined,
      });
    }
  };

  // Logic for displaying current wallets
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = walletTranx
    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = (event) => {
    setCurrentPage(Number(event.target.id) + 1);
  };

  const handlePrev = (event) => {
    setCurrentPage(Number(event.target.id) - 1);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loading-wrapper">
          <ClipLoader color="#182cd1" loading={loading} size={100} />
        </div>
      ) : (
        <>
          <div className="transactions">
            <h2>Wallet ID: {id}</h2>
            <table>
              <tr>
                <th>Status</th>
                <th>Type</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Previous Balance</th>
                <th>Funding Method</th>
                <th>Date Created</th>
                <th>Actions</th>
              </tr>
              <tbody>
                {currentData?.map((wallet, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div className="active-wallet">{wallet.status}</div>
                      </td>
                      <td>
                        <div className="capitalize">{wallet.drcr}</div>
                      </td>
                      <td>
                        <div className="capitalize">{wallet.currency}</div>
                      </td>
                      <td>
                        {`${
                          wallet.currency
                        } ${wallet.amount?.toLocaleString()}`}
                      </td>
                      <td>
                        {`${wallet.currency} ${
                          wallet.previous_wallet_balance?.toLocaleString() || 0
                        }`}
                      </td>
                      <td className="capitalize">{wallet.funding_method}</td>
                      <td>{moment(wallet.created_at).format("LLL")}</td>
                      <td>
                        <button className="btn-fund" onClick={onOpenModal}>
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Modal
              open={open}
              onOpenModal={onOpenModal}
              onCloseModal={onCloseModal}
              modalTitle="Invoice"
            >
              <InvoiceRow left="Status" right="Successful" />
              <InvoiceRow left="Currency" right="NGN" />
              <InvoiceRow left="Amount" right="20,000" />
              <InvoiceRow left="Previous Balance" right="10,000" />
              <InvoiceRow left="Funding Method" right="Manual" />
              <div className="btn-wrapper">
                <button
                  type="submit"
                  className="text-primary button"
                  onClick={onCloseModal}
                >
                  Done
                </button>
              </div>
            </Modal>
            <Pagination
              dataArray={walletTranx}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />

            <ToastContainer
              className="toast-container"
              bodyClassName="toast-class"
              style={{ marginTop: 100, color: "dark" }}
              autoClose={true}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Transactions;
