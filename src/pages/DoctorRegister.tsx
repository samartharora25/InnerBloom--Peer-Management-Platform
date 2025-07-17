import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const DoctorRegister = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    otp: "",
    regNumber: "",
    linkedin: "",
    letter: null as File | null,
    password: ""
  });
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (form.email) {
      setOtpSent(true);
      setError("");
    } else {
      setError("Enter your email to receive OTP.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, letter: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: accept any non-empty fields
    if (form.name && form.email && form.otp && form.regNumber && form.password) {
      setError("");
      navigate("/doctor-dashboard");
    } else {
      setError("Please fill all required fields and verify OTP.");
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="bg-white rounded-xl shadow-soft p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-primary mb-4 text-center">Register as a Doctor</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="Full Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <div className="flex gap-2">
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <Button type="button" onClick={handleSendOtp} className="bg-primary text-white">Send OTP</Button>
            </div>
            {otpSent && (
              <Input
                placeholder="Enter OTP"
                value={form.otp}
                onChange={e => setForm(f => ({ ...f, otp: e.target.value }))}
                required
              />
            )}
            <Input
              placeholder="Medical Registration Number / Institution ID"
              value={form.regNumber}
              onChange={e => setForm(f => ({ ...f, regNumber: e.target.value }))}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
            <Input
              placeholder="LinkedIn Profile (optional)"
              value={form.linkedin}
              onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
            />
            <div>
              <label className="block text-sm mb-1" htmlFor="institution-letter">Institution Letter (optional, PDF or image):</label>
              <input id="institution-letter" type="file" accept=".pdf,image/*" onChange={handleFileChange} title="Upload institution letter (optional)" placeholder="Upload institution letter (optional)" />
              {form.letter && <span className="ml-2 text-xs text-muted-foreground">{form.letter.name}</span>}
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full bg-primary text-white mt-2">Register & Go to Dashboard</Button>
          </form>
        </div>
      </div>
    );
  }

  // Doctor dashboard after registration
  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-soft">
      <h1 className="text-2xl font-bold text-primary mb-6">Doctor Dashboard</h1>
      <div className="mb-8 p-4 rounded-lg bg-green-50 border border-green-200">
        <h2 className="text-lg font-semibold text-green-800 mb-2">👤 Verified Profile Panel</h2>
        <ul className="list-disc pl-6 text-green-900">
          <li>Registered professional account</li>
          <li>Credentials verification: <span className="font-medium">{form.regNumber}</span></li>
          <li>Areas of interest: <span className="font-medium">N/A</span></li>
        </ul>
      </div>
      <div className="mb-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">🕹 Facilitation & Moderation Tools</h2>
        <ul className="list-disc pl-6 text-blue-900">
          <li>Join peer groups as a silent observer or facilitator</li>
          <li>Weekly group session calendar (e.g., “Mood Check Mondays”)</li>
          <li>Mute/unmute discussions, flag crisis conversations, initiate ice-breaker activities</li>
        </ul>
      </div>
      <div className="mb-8 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">📈 User Reports & Alerts</h2>
        <ul className="list-disc pl-6 text-yellow-900">
          <li>Dashboard to monitor group health: mood trends, flagged messages, crisis triggers</li>
          <li>Receive alerts for panic button, severe distress detection</li>
        </ul>
      </div>
      <div className="mb-8 p-4 rounded-lg bg-purple-50 border border-purple-200">
        <h2 className="text-lg font-semibold text-purple-800 mb-2">🧠 Professional Sessions</h2>
        <ul className="list-disc pl-6 text-purple-900">
          <li>Host weekly Q&A “Ask the Expert” hours</li>
          <li>Join topic-specific sessions (e.g., “Coping with academic stress”)</li>
          <li>Accept private connection requests (with user consent)</li>
        </ul>
      </div>
      <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
        <h2 className="text-lg font-semibold text-pink-800 mb-2">📝 Feedback & Training Logs</h2>
        <ul className="list-disc pl-6 text-pink-900">
          <li>Give feedback to platform team about group dynamics and app features</li>
          <li>Log facilitation sessions (for interns, helpful for academic credit)</li>
          <li>Attend platform-provided workshops on trauma-informed care, etc.</li>
        </ul>
      </div>
    </div>
  );
};

export default DoctorRegister; 