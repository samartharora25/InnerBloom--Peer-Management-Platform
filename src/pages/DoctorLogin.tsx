import React, { useState } from "react";

const DoctorLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success
    if (form.email && form.password) {
      window.location.href = "/doctor-intern-dashboard";
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-xl shadow-soft">
      <h1 className="text-2xl font-bold text-primary mb-4">Doctor Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">Log In</button>
      </form>
    </div>
  );
};

export default DoctorLogin; 