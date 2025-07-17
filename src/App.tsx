import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorInternDashboard from "./pages/DoctorInternDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import InternLogin from "./pages/InternLogin";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/doctor-register" element={<DoctorRegister />} />
            <Route path="/doctor-login" element={<DoctorLogin />} />
            <Route path="/doctor-intern-dashboard" element={<DoctorInternDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/intern-login" element={<InternLogin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
