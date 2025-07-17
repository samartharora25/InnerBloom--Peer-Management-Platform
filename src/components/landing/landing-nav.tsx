import { Button } from "@/components/ui/button";
import { Flower, Stethoscope } from "lucide-react";
import innerbloomLogo from "@/assets/innerbloom-logo.png";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LandingNavProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const LandingNav = ({ onLogin, onSignup }: LandingNavProps) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctorForm, setDoctorForm] = useState({
    mode: "login", // or "register"
    name: "",
    degree: "",
    interest: "",
    email: "",
    phone: "",
    password: ""
  });
  const handleDoctorPortal = () => setShowDoctorModal(true);
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDoctorModal(false);
    window.open("/doctor-dashboard", "_blank");
  };
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      <div className="glass-nav rounded-full px-6 py-3 flex items-center justify-between shadow-glow">
        <div className="flex items-center space-x-2">
          <img
            src={innerbloomLogo}
            alt="Innerbloom Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-xl font-roboto font-bold text-foreground">
            InnerBloom
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun className={isDark ? "opacity-50" : "text-primary"} size={18} />
            <Switch
              checked={isDark}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Toggle dark mode"
            />
            <Moon className={!isDark ? "opacity-50" : "text-primary"} size={18} />
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/about")}
            className="hover:bg-primary/10 transition-all duration-300"
          >
            About Us
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleDoctorPortal}
            className="hover:bg-primary/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Doctor Portal</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={onLogin}
            className="hover:bg-primary/10 transition-all duration-300"
          >
            Log In
          </Button>
          <Button 
            onClick={onSignup}
            className="bg-primary hover:bg-primary/90 text-foreground rounded-full px-6 transition-all duration-300 hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </div>
      <Dialog open={showDoctorModal} onOpenChange={setShowDoctorModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{doctorForm.mode === "login" ? "Doctor Log In" : "Doctor Registration"}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 mb-4">
            <Button variant={doctorForm.mode === "login" ? "default" : "outline"} onClick={() => setDoctorForm(f => ({...f, mode: "login"}))}>Log In</Button>
            <Button variant={doctorForm.mode === "register" ? "default" : "outline"} onClick={() => setDoctorForm(f => ({...f, mode: "register"}))}>Create Account</Button>
          </div>
          <form className="space-y-3" onSubmit={handleDoctorSubmit}>
            {doctorForm.mode === "register" && (
              <>
                <Input placeholder="Full Name" value={doctorForm.name} onChange={e => setDoctorForm(f => ({...f, name: e.target.value}))} required />
                <Input placeholder="Degree (e.g. MBBS, MD)" value={doctorForm.degree} onChange={e => setDoctorForm(f => ({...f, degree: e.target.value}))} required />
                <Input placeholder="Preferred Interest (e.g. Psychology, Family Matters)" value={doctorForm.interest} onChange={e => setDoctorForm(f => ({...f, interest: e.target.value}))} required />
              </>
            )}
            <Input placeholder="Email or Phone" value={doctorForm.email} onChange={e => setDoctorForm(f => ({...f, email: e.target.value}))} required />
            <Input placeholder="Password" type="password" value={doctorForm.password} onChange={e => setDoctorForm(f => ({...f, password: e.target.value}))} required />
            <Button type="submit" className="w-full bg-primary text-white mt-2">{doctorForm.mode === "login" ? "Log In" : "Register & Continue"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};