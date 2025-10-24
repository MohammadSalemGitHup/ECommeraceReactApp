import "./payment.css";

import { MohsalShopContext } from "../../Context/shopContext";
import { useEffect, useContext } from "react";
import {useNavigate } from "react-router-dom";


///////// helper Function ///////////////
const money = (n) => `$${Number(n || 0).toFixed(2)}`; // this is to layout the price 




/* ------------ Page Component ------------ */
const Payment = () => {


////////////////////////
const {getTotalCartAmount, clearCart} = useContext(MohsalShopContext);
const totalBill = Number(getTotalCartAmount());
const navigate = useNavigate();
useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
//////////////////////

// Render your CartItem component to static HTML
  // const cartHTML = ReactDOMServer.renderToStaticMarkup(<CartItem />);

/////////////////

//////////// JSX /////////////////////
return (
  <div className="payment-page">
    {/* Right: Minimal Order Summary */}
    <aside className="panel summary" aria-label="Order Summary">
      <h2 className="panel-title">Order Summary</h2>

      <div className="summary-row">
        <span>Bill Total</span>
        <span>{money(totalBill)}</span>
      </div>

      <div className="summary-row">
        <span>Tax (0%)</span>
        <span>{money(totalBill)}</span>
      </div>

      <div className="divider" />

      <div className="summary-total">
        <span>Total</span>
        <span className="total-amount">{money(totalBill)}</span>
      </div>


      <button
        className="btn primary pay"
        onClick={() => { handlePaymentProcess(totalBill); clearCart();  }  }
      >
        Pay {money(totalBill)}
      </button>


      <button
        className="btn link"
        onClick={() => navigate(-1)}
      >
        ← Back to Cart
      </button>
    </aside>
  </div>
);

};

export default Payment;






/////////////////////////////////////////////////
/* ------------  Utils Functions ------------ */
////////////////////////////////////////////////

const handlePaymentProcess = (billTotal) => {
  let savedEmail = localStorage.getItem("userEmail");
  // let testEmail = "salmohammad683@gmail.com";
  // savedEmail = testEmail;
  // console.log(`billTotal is : ${billTotal}`);
  // console.log(`savedEmail : ${savedEmail}`);

  // send order at email 
  sendorder(billTotal, savedEmail);
  
  setTimeout(() => {
    alert("Order Sended, Check Youer Email .... ")
  },5000);
  



};

const sendorder = async (billTotal, savedEmail) => {
  // send to end point (http://localhost:6060/sendorderemail) at otp_server
  try {
    // 🧾 build the HTML message
    const htmlEmailPage = `
      <h1>🛍️ Order Confirmation</h1>
      <p>Thank you for your order.</p>
      <p><strong>Total:</strong> $${billTotal.toFixed(2)}</p>
    `;

    // 🌐 send the POST request to your backend
    const OTPSERVER_API =process.env.OTPSERVER_URL || "http://localhost:6060";
    const response = await fetch(`${OTPSERVER_API}/sendorderemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: savedEmail,
        htmlEmailPage: htmlEmailPage,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("❌ response.ok false");
      alert("❌ response Error");
    }

    if (response.ok && result.ok) {
      console.log("✅ Order email sent successfully!");
      alert("✅ Order email sent successfully!");
    } else {
      console.error("❌ Failed to send order email:", result.error || result);
    }
  } catch (err) {
    console.error("❌ Error sending order email:", err);
    alert("❌ Error sending order email:");
  }
};



///////////////////////////////




