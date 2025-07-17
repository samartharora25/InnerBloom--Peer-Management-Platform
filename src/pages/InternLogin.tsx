import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const InternLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login: accept any non-empty username/password
    if (username && password) {
      setError("");
      navigate("/doctor-intern-dashboard");
    } else {
      setError("Please enter your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="bg-white rounded-xl shadow-soft p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">Intern Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="w-full bg-primary text-white">Log In</Button>
        </form>
      </div>
    </div>
  );
};

export default InternLogin; 