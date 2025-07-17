import { useRef, useEffect, useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { SocialFeed } from "@/components/dashboard/social-feed";
import { PeerMatching } from "@/components/matching/peer-matching";
import { CommunitiesSection } from "@/components/communities/communities-section";
import { HelpSection } from "@/components/support/help-section";
import { WellnessPage } from "@/components/wellness/wellness-page";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Smile, BookOpen, Camera, Gamepad2, Users, Calendar, Clock, Video, MapPin } from "lucide-react";
import AvatarCustomization from "@/components/avatar-customization";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import chooseYourAvatarRiv from "../assets/choose_your_avatar.riv";

function ProfilePage() {
  const lottieRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Samarth");
  const [email, setEmail] = useState("youremail@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    if (lottieRef.current) {
      // Inject the script tag only once
      if (!document.querySelector('script[src*="dotlottie-wc"]')) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
        document.body.appendChild(script);
      }
      // Inject the dotlottie-wc element
      lottieRef.current.innerHTML = '';
      const lottie = document.createElement('dotlottie-wc');
      lottie.setAttribute('src', 'https://lottie.host/f96587cb-b1b3-4eed-82a4-366153612d0f/r64Iz3n8Df.lottie');
      lottie.setAttribute('style', 'width: 300px; height: 300px;');
      lottie.setAttribute('speed', '1');
      lottie.setAttribute('autoplay', '');
      lottie.setAttribute('loop', '');
      lottieRef.current.appendChild(lottie);
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-soft">
      <div className="flex flex-col items-center mb-4">
        <AvatarCustomization />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-primary">Profile</h2>
      <div className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
          {name ? name[0] : "U"}
        </div>
        <div>
          <div className="text-lg font-bold text-foreground">{name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">Theme:</span>
            <button
              className={`px-3 py-1 rounded-full border ${isDark ? 'bg-primary text-white' : 'bg-white text-primary'} transition`}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
            >
              {isDark ? 'Dark' : 'Light'}
            </button>
          </div>
        </div>
      </div>
      {/* Profile fields */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border border-primary/30 rounded px-3 py-2 focus:outline-none focus:border-primary"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={!editing}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-primary/30 rounded px-3 py-2 focus:outline-none focus:border-primary"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={!editing}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="tel"
          className="w-full border border-primary/30 rounded px-3 py-2 focus:outline-none focus:border-primary"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          disabled={!editing}
          placeholder="Enter your phone number"
        />
      </div>
      <div className="flex gap-2 pt-2">
        {editing ? (
          <button className="bg-primary text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        ) : (
          <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>
      {saved && <div className="text-green-600 text-sm pt-2">Profile updated!</div>}
    </div>
  );
}

function Chats() {
  // Mock chat data
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState([
    {
      id: "1",
      name: "Sarah",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "That's awesome! I had a relaxing morning with some yoga...",
      messages: [
        { sender: "Sarah", text: "Hey there! How's your day going?" },
        { sender: "Me", text: "Hi Sarah! It's been pretty good, just finished a workout. How about you?" },
        { sender: "Sarah", text: "That's awesome! I had a relaxing morning with some yoga. Feeling much better now." },
        { sender: "Me", text: "Yoga sounds perfect. I've been meaning to try it. Any recommendations for beginners?" },
        { sender: "Sarah", text: "Definitely! There are some great online classes. I can send you a link to one I like." },
        { sender: "Me", text: "That would be amazing, thanks! By the way, have you tried the scribble game on here? It's pretty fun." }
      ]
    },
    {
      id: "2",
      name: "Alex",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "Let's catch up later!",
      messages: [
        { sender: "Alex", text: "Hey! Are you joining the group call tonight?" },
        { sender: "Me", text: "Yes! Looking forward to it." },
        { sender: "Alex", text: "Let's catch up later!" }
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState("");

  const selected = chats.find(c => c.id === selectedChat) || chats[0];

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChats(prevChats => prevChats.map(chat =>
      chat.id === selected.id
        ? { ...chat, messages: [...chat.messages, { sender: "Me", text: chatInput }], lastMessage: chatInput }
        : chat
    ));
    setChatInput("");
  };

  return (
    <div className="flex h-[70vh] bg-white rounded-xl shadow-soft overflow-hidden">
      {/* Chat List */}
      <div className="w-72 border-r bg-muted/30 p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-primary">Chats</h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${selectedChat === chat.id ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-foreground">{chat.name}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[120px]">{chat.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="border-b px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-primary/10 to-white">
          <img src={selected.avatar} alt={selected.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="font-bold text-lg text-primary">{selected.name}</div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
          {selected.messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "Me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm shadow ${msg.sender === "Me" ? "bg-primary text-white" : "bg-muted/50 text-foreground"}`}>
                <div className="mb-1 font-medium text-xs opacity-70">{msg.sender === "Me" ? "Me" : selected.name}</div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2 bg-white">
          <input
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-primary"
            placeholder="Type a message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-full"
            onClick={handleSend}
          >Send</button>
        </div>
      </div>
    </div>
  );
}

function Activities() {
  const [activeTab, setActiveTab] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    category: "Wellness",
    description: "",
    date: "",
    time: "",
    tags: "",
    type: "virtual",
    slots: 10
  });
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Mindfulness Circle",
      category: "Wellness",
      description: "Join us for a guided meditation and mindfulness practice",
      date: "2025-07-08",
      time: "18:00",
      tags: ["beginner-friendly", "stress-relief"],
      type: "virtual",
      icon: Smile,
      slots: 8,
      maxSlots: 8
    },
    {
      id: 2,
      title: "Creative Writing Workshop",
      category: "Creative",
      description: "Express yourself through creative writing exercises",
      date: "2025-07-09",
      time: "19:30",
      tags: ["creative", "writing"],
      type: "virtual",
      icon: BookOpen,
      slots: 4,
      maxSlots: 12
    },
    {
      id: 3,
      title: "Nature Photography Walk",
      category: "Outdoor",
      description: "Explore nature while practicing photography",
      date: "2025-07-10",
      time: "10:00",
      tags: ["outdoor", "photography"],
      type: "local",
      icon: Camera,
      slots: 8,
      maxSlots: 15
    },
    {
      id: 4,
      title: "Virtual Game Night",
      category: "Social",
      description: "Play fun, mental health-friendly games together",
      date: "2025-07-11",
      time: "20:00",
      tags: ["social", "fun"],
      type: "virtual",
      icon: Gamepad2,
      slots: 12,
      maxSlots: 16
    },
    {
      id: 5,
      title: "Marathon",
      category: "Fitness",
      description: "Join our community marathon for all fitness levels.",
      date: "2025-07-15",
      time: "06:00",
      tags: ["fitness", "running"],
      type: "local",
      icon: Users,
      slots: 20,
      maxSlots: 50
    },
    {
      id: 6,
      title: "Visit to National Science Museum",
      category: "Educational",
      description: "Explore science and technology exhibits with fellow learners.",
      date: "2025-07-20",
      time: "11:00",
      tags: ["educational", "museum"],
      type: "local",
      icon: BookOpen,
      slots: 10,
      maxSlots: 30
    },
    // Add more activities as needed
  ]);
  const categories = ["All", "Wellness", "Creative", "Outdoor", "Social", "Fitness", "Educational"];

  const filtered = activeTab === "All" ? activities : activities.filter(a => a.category === activeTab);

  useEffect(() => {
    // Inject dotlottie-wc script only once
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Collective Activities</h2>
          <p className="text-muted-foreground">Join group activities and build meaningful connections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="w-4 h-4 mr-2" /> Filter</Button>
          <Button className="bg-primary text-white" onClick={() => setShowCreate(true)}>
            + Create Activity
          </Button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeTab === cat ? "default" : "outline"}
            className={activeTab === cat ? "bg-primary text-white" : ""}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="space-y-6">
        {filtered.map(activity => (
          <div key={activity.id} className="bg-white rounded-xl shadow-soft p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-center">
                <activity.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">{activity.title}</div>
                <div className="text-sm text-muted-foreground mb-1">{activity.category}</div>
                <div className="mb-2 text-foreground">{activity.description}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {activity.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {activity.time}</span>
                </div>
                <div className="flex gap-2 flex-wrap mb-2">
                  {activity.tags.map(tag => (
                    <span key={tag} className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Lottie Animations for specific activities */}
            <div className="flex flex-col items-center gap-2 min-w-[120px]">
              {activity.title === "Marathon" && (
                <div>
                  <dotlottie-wc src="https://lottie.host/331280b0-e0e0-4a7d-9253-53b2723d794a/HCsV5TRV3C.lottie" style={{width: '120px', height: '120px'}} speed="1" autoplay="" loop=""></dotlottie-wc>
                </div>
              )}
              {activity.title === "Mindfulness Circle" && (
                <div>
                  <dotlottie-wc src="https://lottie.host/f96587cb-b1b3-4eed-82a4-366153612d0f/r64Iz3n8Df.lottie" style={{width: '120px', height: '120px'}} speed="1" autoplay="" loop=""></dotlottie-wc>
                </div>
              )}
              {activity.title === "Creative Writing Workshop" && (
                <div>
                  <dotlottie-wc src="https://lottie.host/86aefb2e-2bae-454a-97b4-b32745e4c359/epFLB1Wqsd.lottie" style={{width: '120px', height: '120px'}} speed="1" autoplay="" loop=""></dotlottie-wc>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                {activity.type === "virtual" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                <span>{activity.type}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                <span>{activity.slots}/{activity.maxSlots}</span>
              </div>
              <Button className="bg-primary text-white w-full" onClick={() => alert('Joined activity!')}>Join Activity</Button>
            </div>
          </div>
        ))}
      </div>
      {/* Create Activity Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-muted-foreground" onClick={() => setShowCreate(false)} title="Close">
              <X className="w-6 h-6" />
            </button>
            <div className="mb-4 text-lg font-bold text-primary">Create Activity</div>
            <form
              onSubmit={e => {
                e.preventDefault();
                setActivities([
                  ...activities,
                  {
                    id: Date.now(),
                    title: newActivity.title,
                    category: newActivity.category,
                    description: newActivity.description,
                    date: newActivity.date,
                    time: newActivity.time,
                    tags: newActivity.tags.split(",").map(t => t.trim()),
                    type: newActivity.type,
                    icon: Smile,
                    slots: 1,
                    maxSlots: newActivity.slots
                  }
                ]);
                setShowCreate(false);
                setNewActivity({ title: "", category: "Wellness", description: "", date: "", time: "", tags: "", type: "virtual", slots: 10 });
              }}
              className="space-y-3"
            >
              <Input placeholder="Title" value={newActivity.title} onChange={e => setNewActivity({ ...newActivity, title: e.target.value })} required />
              <Input placeholder="Category" value={newActivity.category} onChange={e => setNewActivity({ ...newActivity, category: e.target.value })} required />
              <Input placeholder="Description" value={newActivity.description} onChange={e => setNewActivity({ ...newActivity, description: e.target.value })} required />
              <Input placeholder="Date (YYYY-MM-DD)" value={newActivity.date} onChange={e => setNewActivity({ ...newActivity, date: e.target.value })} required />
              <Input placeholder="Time (HH:MM)" value={newActivity.time} onChange={e => setNewActivity({ ...newActivity, time: e.target.value })} required />
              <Input placeholder="Tags (comma separated)" value={newActivity.tags} onChange={e => setNewActivity({ ...newActivity, tags: e.target.value })} />
              <select className="w-full border rounded px-3 py-2" value={newActivity.type} onChange={e => setNewActivity({ ...newActivity, type: e.target.value })} title="Select activity type">
                <option value="virtual">virtual</option>
                <option value="local">local</option>
              </select>
              <Input placeholder="Max Slots" type="number" value={newActivity.slots} onChange={e => setNewActivity({ ...newActivity, slots: Number(e.target.value) })} />
              <Button type="submit" className="w-full bg-primary text-white">Create</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [peerConnections, setPeerConnections] = useState(12);
  const handlePeerConnect = () => setPeerConnections((c) => c + 1);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <DashboardOverview peerConnections={peerConnections} />
            <div>
              <h3 className="text-xl font-semibold mb-4">Community Feed</h3>
              <SocialFeed />
            </div>
          </div>
        );
      case "matching":
        return <PeerMatching onConnect={handlePeerConnect} />;
      case "communities":
        return <CommunitiesSection />;
      case "activities":
        return <Activities />;
      case "wellness":
        return <WellnessPage />;
      case "help":
        return <HelpSection />;
      case "profile":
        return <ProfilePage />;
      case "chats":
        return <Chats />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;