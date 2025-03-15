import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentForm from "./components/PaymentForm";
import PaymentStatus from "./components/PaymentStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentForm />} />
        <Route path="/payment-status/:paymentId" element={<PaymentStatus />} />
      </Routes>
    </Router>
  );
}

export default App;

