import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  MessageCircle,
  Clock,
  Star,
  ArrowUpRight,
  Stethoscope,
  Settings,
  MoreHorizontal,
} from "lucide-react";

const mockGroups = [
  { id: 1, name: "Anxiety Support Circle" },
  { id: 2, name: "Depression Support" },
  { id: 3, name: "School Buddies" },
];

const DOCTOR_TABS = [
  { id: "overview", label: "Overview" },
  { id: "community", label: "Community Groups & Interns" },
  { id: "sessions", label: "Session Management" },
  { id: "mood", label: "Mood & Sentiment" },
  { id: "feedback", label: "Member Feedback" },
  { id: "resources", label: "Resource Management" },
  { id: "handoff", label: "Intern Handoff" },
  { id: "leaderboard", label: "Intern Leaderboard" },
  { id: "security", label: "Credential Security" },
  { id: "activity", label: "Intern Activity Log" },
];

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [interns, setInterns] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", duration: "3" });
  const [generated, setGenerated] = useState<any | null>(null);

  const handleAddIntern = (e: React.FormEvent) => {
    e.preventDefault();
    const username = `intern${Math.floor(Math.random() * 10000)}`;
    const password = Math.random().toString(36).slice(-8);
    setGenerated({ ...form, username, password, group: selectedGroup, expires: `${form.duration} weeks` });
    setInterns([...interns, { ...form, username, password, group: selectedGroup, expires: `${form.duration} weeks`, logs: [] }]);
    setForm({ name: "", email: "", duration: "3" });
  };

  const handleRotateIntern = (idx: number) => {
    const username = `intern${Math.floor(Math.random() * 10000)}`;
    const password = Math.random().toString(36).slice(-8);
    setInterns(interns.map((i, iidx) => iidx === idx ? { ...i, username, password } : i));
  };

  const stats = [
    {
      title: "Total Patients",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Today's Appointments",
      value: "8",
      change: "+2",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Consultations",
      value: "3",
      change: "ongoing",
      icon: MessageCircle,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Patient Satisfaction",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      condition: "Anxiety",
      lastVisit: "2 hours ago",
      status: "active",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b67e0b83?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 35,
      condition: "Depression",
      lastVisit: "Yesterday",
      status: "stable",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 24,
      condition: "Stress Management",
      lastVisit: "3 days ago",
      status: "improving",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Wilson",
      age: 42,
      condition: "PTSD",
      lastVisit: "1 week ago",
      status: "needs_attention",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      type: "Follow-up",
      status: "completed",
      duration: "45 min"
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:30 AM",
      type: "Consultation",
      status: "in_progress",
      duration: "60 min"
    },
    {
      id: 3,
      patient: "Emily Rodriguez",
      time: "2:00 PM",
      type: "Assessment",
      status: "upcoming",
      duration: "30 min"
    },
    {
      id: 4,
      patient: "David Wilson",
      time: "3:30 PM",
      type: "Therapy Session",
      status: "upcoming",
      duration: "50 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "stable":
        return "bg-green-100 text-green-800";
      case "improving":
        return "bg-blue-100 text-blue-800";
      case "needs_attention":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-primary/10 text-primary";
      case "upcoming":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="glass border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Patients & Today's Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Recent Patients</span>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(patient.status)} text-xs`}>
                    {patient.status.replace('_', ' ')}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{patient.lastVisit}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Today's Appointments</span>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                  <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                    {appointment.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="glass-nav border-b border-border/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dr. Sarah Wilson</h1>
              <p className="text-sm text-muted-foreground">Mental Health Specialist</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-nav border-b border-border/20 px-6 py-3">
        <div className="flex space-x-8">
          {DOCTOR_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "overview" && (
          <OverviewContent />
        )}
        {activeTab === "community" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Community Groups & Assigned Interns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockGroups.map(group => (
                <div key={group.id} className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-lg text-primary">{group.name}</div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="mb-2 text-sm text-muted-foreground">Members: 12 | Posts: 8 | Chats: 24 | Engagement: High</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Alex", "Sam", "Riya", "Maya"].map((nick, i) => (
                      <span key={i} className="bg-muted/30 px-2 py-1 rounded text-xs">{nick} <span className="ml-1 text-green-500">⬆️</span></span>
                    ))}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Active: 8</span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Flagged: 1</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Upcoming: 2</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Assign & Rotate Interns</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <select
                  className="border rounded px-3 py-2"
                  value={selectedGroup ?? ''}
                  onChange={e => setSelectedGroup(Number(e.target.value))}
                >
                  <option value="">Select Community Group</option>
                  {mockGroups.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                <form onSubmit={handleAddIntern} className="flex flex-col md:flex-row gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Intern Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Intern Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="border rounded px-3 py-2"
                    required
                  />
                  <select
                    value={form.duration}
                    onChange={e => setForm({ ...form, duration: e.target.value })}
                    className="border rounded px-3 py-2"
                  >
                    <option value="3">3 weeks</option>
                    <option value="4">4 weeks</option>
                  </select>
                  <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add Intern</button>
                </form>
              </div>
              {generated && (
                <div className="bg-muted/20 p-4 rounded mb-4">
                  <div className="font-semibold mb-1">Generated Credentials (visible only to you):</div>
                  <div className="mb-1">Username: <span className="font-mono">{generated.username}</span></div>
                  <div className="mb-1">Password: <span className="font-mono">{generated.password}</span></div>
                  <div className="mb-1">Expires in: {generated.expires}</div>
                  <button
                    className="mt-2 bg-primary text-white px-3 py-1 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(`Username: ${generated.username}\nPassword: ${generated.password}`);
                    }}
                  >Copy Credentials</button>
                </div>
              )}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Current Interns</h3>
                <table className="w-full text-left border">
                  <thead>
                    <tr className="bg-muted/10">
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Group</th>
                      <th className="p-2">Username</th>
                      <th className="p-2">Expires</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interns.map((i, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{i.name}</td>
                        <td className="p-2">{i.email}</td>
                        <td className="p-2">{mockGroups.find(g => g.id === i.group)?.name || "-"}</td>
                        <td className="p-2 font-mono">{i.username}</td>
                        <td className="p-2">{i.expires}</td>
                        <td className="p-2">
                          <button className="bg-warning text-white px-2 py-1 rounded mr-2" onClick={() => handleRotateIntern(idx)}>Rotate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* Add similar blocks for other tabs as needed */}
      </main>
    </div>
  );
};

export default DoctorDashboard;