import React, { useState } from "react";

function FarmVisitBooking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    notes: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if(!form.name || !form.phone || !form.date || !form.guests){
      setMessage("Please fill all required fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/book-visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Booking Confirmed! Thank you.");
        setForm({ name: "", phone: "", date: "", guests: 1, notes: "" });
      } else {
        setMessage(data.error || "Booking failed.");
      }
    } catch (err) {
      setMessage("Failed to submit booking. Try again later.");
    }
  };

  return (
    <div className="farm-booking" style={{maxWidth: 420, margin: "2rem auto", background: "rgba(255,255,255,0.98)", borderRadius: 12, padding: "2rem", boxShadow:"0 0 16px rgba(0,0,0,0.11)"}}>
      <h2 style={{color: "#20571E", marginBottom: "1.2rem"}}>Book a Farm Visit</h2>
      <form onSubmit={handleSubmit}>
        <label>Name*:<br/>
          <input type="text" name="name" value={form.name} onChange={handleChange} required style={{width:"100%",marginBottom:10}} />
        </label>
        <label>Phone*:<br/>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required style={{width:"100%",marginBottom:10}} />
        </label>
        <label>Date*:<br/>
          <input type="date" name="date" value={form.date} onChange={handleChange} required style={{width:"100%",marginBottom:10}} />
        </label>
        <label>Time*:<br/>
          <input type="time" name="time" value={form.time} onChange={handleChange} required style={{width:"100%",marginBottom:10}} />
        </label>
        <label>Guests*:<br/>
          <input type="number" name="guests" value={form.guests} onChange={handleChange} min="1" required style={{width:"100%",marginBottom:10}} />
        </label>
        <label>Notes:<br/>
          <textarea name="notes" value={form.notes} onChange={handleChange} style={{width:"100%",marginBottom:15}} />
        </label>
        <button type="submit" style={{background:"#4caf50",color:"#fff",padding:"0.7rem 2rem",border:"none",borderRadius:5,cursor:"pointer"}}>Book Visit</button>
        {message && <div style={{marginTop:15,color:"#215600",fontWeight:600}}>{message}</div>}
      </form>
    </div>
  );
}

export default FarmVisitBooking;

