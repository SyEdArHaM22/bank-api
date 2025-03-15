import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const { paymentId } = useParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/payments/payment/${paymentId}`);
        setStatus(response.data);
      } catch (error) {
        console.error("Error fetching payment details", error);
      }
    };
    fetchPaymentStatus();
  }, [paymentId]);

  return <div>Payment Status: {status ? JSON.stringify(status) : "Loading..."}</div>;
};

export default PaymentStatus;
