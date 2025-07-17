import { Users, MessageCircle, Heart, BookOpen, Briefcase, Home, Plus, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Community {
  id: string;
  name: string;
  description: string;
  category: "health" | "education" | "family" | "career";
  memberCount: number;
  activeDiscussions: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  recentActivity: string;
  isJoined: boolean;
}

const categoryLabels = {
  health: "Health & Wellness",
  education: "Education",
  family: "Family & Relationships",
  career: "Career & Work"
};

const initialCommunities: Community[] = [
  // Health & Wellness
  {
    id: "1",
    name: "Anxiety Support Circle",
    description: "A safe space for those dealing with anxiety disorders. Share coping strategies, celebrate wins, and find understanding.",
    category: "health",
    memberCount: 2847,
    activeDiscussions: 23,
    icon: Heart,
    color: "bg-gradient-wellness",
    recentActivity: "2 new posts today",
    isJoined: true
  },
  {
    id: "2",
    name: "Depression Support",
    description: "Support for those facing depression. Share your story and find hope.",
    category: "health",
    memberCount: 2100,
    activeDiscussions: 19,
    icon: Heart,
    color: "bg-gradient-wellness",
    recentActivity: "1 new post today",
    isJoined: false
  },
  // Education
  {
    id: "3",
    name: "School Buddies",
    description: "Connect with school students for study help and friendship.",
    category: "education",
    memberCount: 1200,
    activeDiscussions: 10,
    icon: BookOpen,
    color: "bg-gradient-primary",
    recentActivity: "2 new posts today",
    isJoined: false
  },
  {
    id: "4",
    name: "Study Buddies",
    description: "Find partners for group study and motivation.",
    category: "education",
    memberCount: 900,
    activeDiscussions: 8,
    icon: BookOpen,
    color: "bg-gradient-primary",
    recentActivity: "3 new posts today",
    isJoined: false
  },
  // Family & Relationships
  {
    id: "5",
    name: "Relationship Guidance",
    description: "Advice and support for healthy relationships.",
    category: "family",
    memberCount: 800,
    activeDiscussions: 7,
    icon: Home,
    color: "bg-accent",
    recentActivity: "1 new post today",
    isJoined: false
  },
  {
    id: "6",
    name: "Parenting Support",
    description: "A place for parents to share tips and get support.",
    category: "family",
    memberCount: 650,
    activeDiscussions: 5,
    icon: Home,
    color: "bg-accent",
    recentActivity: "2 new posts today",
    isJoined: false
  },
  {
    id: "7",
    name: "Family Therapy",
    description: "Resources and support for family therapy.",
    category: "family",
    memberCount: 400,
    activeDiscussions: 3,
    icon: Home,
    color: "bg-accent",
    recentActivity: "No new posts",
    isJoined: false
  },
  // Existing
  {
    id: "8",
    name: "College & University Students",
    description: "Connect with fellow students navigating academic stress, social challenges, and mental health on campus.",
    category: "education",
    memberCount: 1593,
    activeDiscussions: 18,
    icon: BookOpen,
    color: "bg-gradient-primary",
    recentActivity: "5 new posts today",
    isJoined: false
  },
  {
    id: "9",
    name: "New Parents Network",
    description: "Supporting parents through postpartum challenges, parenting stress, and finding balance in family life.",
    category: "family",
    memberCount: 892,
    activeDiscussions: 12,
    icon: Home,
    color: "bg-accent",
    recentActivity: "3 new posts today",
    isJoined: true
  },
  {
    id: "10",
    name: "Workplace Wellness",
    description: "Discussing work-related stress, burnout prevention, and maintaining mental health in professional settings.",
    category: "career",
    memberCount: 1247,
    activeDiscussions: 15,
    icon: Briefcase,
    color: "bg-warning",
    recentActivity: "4 new posts today",
    isJoined: false
  }
];

export function CommunitiesSection() {
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [showCreate, setShowCreate] = useState(false);
  const [newCommunity, setNewCommunity] = useState({ name: "", issue: "", category: "health" });
  const [search, setSearch] = useState("");
  const [discussionCommunity, setDiscussionCommunity] = useState<Community | null>(null);
  const [discussionMessages, setDiscussionMessages] = useState<{[id: string]: { sender: string, text: string }[]}>({});
  const [discussionInput, setDiscussionInput] = useState("");

  // Lottie animation for top of section
  const lottieRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!document.querySelector('script[src*="dotlottie-wc"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js";
      document.body.appendChild(script);
    }
    if (lottieRef.current) {
      lottieRef.current.innerHTML = '';
      const lottie = document.createElement('dotlottie-wc');
      lottie.setAttribute('src', 'https://lottie.host/b5f84b6f-a67c-4d68-9afa-198f817143bf/680y4IN5t0.lottie');
      lottie.setAttribute('style', 'width: 300px; height: 300px;');
      lottie.setAttribute('speed', '1');
      lottie.setAttribute('autoplay', '');
      lottie.setAttribute('loop', '');
      lottieRef.current.appendChild(lottie);
    }
  }, []);

  const handleJoin = (id: string) => {
    setCommunities(communities.map(c => c.id === id ? { ...c, isJoined: true } : c));
  };

  const handleSendDiscussion = (id: string) => {
    if (!discussionInput.trim()) return;
    setDiscussionMessages(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { sender: "You", text: discussionInput }]
    }));
    setDiscussionInput("");
  };

  const groupedCommunities = communities
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()))
    .reduce((acc, community) => {
      if (!acc[community.category]) {
        acc[community.category] = [];
      }
      acc[community.category].push(community);
      return acc;
    }, {} as Record<string, Community[]>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center mb-2 gap-2">
        <h2 className="text-3xl font-bold text-primary font-kalam">Communities</h2>
        <p className="text-muted-foreground text-lg mb-2">Join supportive groups that understand your journey</p>
        <div className="flex flex-col md:flex-row gap-2 items-center w-full justify-center">
          <Input
            placeholder="Find your Blooming circle"
            className="w-64"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button className="shadow-glow" onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Community
          </Button>
        </div>
        <div ref={lottieRef} className="flex justify-center mt-4" />
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create a New Community</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              setCommunities([
                ...communities,
                {
                  id: Date.now().toString(),
                  name: newCommunity.name,
                  description: newCommunity.issue,
                  category: newCommunity.category as Community["category"],
                  memberCount: 1,
                  activeDiscussions: 0,
                  icon: Heart,
                  color: "bg-gradient-wellness",
                  recentActivity: "Just created",
                  isJoined: true
                }
              ]);
              setShowCreate(false);
              setNewCommunity({ name: "", issue: "", category: "health" });
            }}
            className="space-y-4"
          >
            <Input
              placeholder="Community Name"
              value={newCommunity.name}
              onChange={e => setNewCommunity({ ...newCommunity, name: e.target.value })}
              required
            />
            <Input
              placeholder="What issue does this community address?"
              value={newCommunity.issue}
              onChange={e => setNewCommunity({ ...newCommunity, issue: e.target.value })}
              required
            />
            <select
              className="w-full border rounded px-3 py-2"
              value={newCommunity.category}
              onChange={e => setNewCommunity({ ...newCommunity, category: e.target.value })}
              title="Select community category"
            >
              <option value="health">Health & Wellness</option>
              <option value="education">Education</option>
              <option value="family">Family & Relationships</option>
              <option value="career">Career & Work</option>
            </select>
            <Button type="submit" className="w-full bg-primary text-white">Create</Button>
          </form>
        </DialogContent>
      </Dialog>

      {Object.entries(groupedCommunities).map(([category, communitiesInCategory]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {categoryLabels[category as keyof typeof categoryLabels]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communitiesInCategory.map((community) => (
              <Card key={community.id} className="shadow-soft hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${community.color}`}>
                        <community.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {community.memberCount.toLocaleString()} members
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {community.activeDiscussions} active
                          </span>
                        </div>
                      </div>
                    </div>
                    {community.isJoined && (
                      <Badge className="bg-success text-success-foreground">Joined</Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    {community.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {community.recentActivity}
                    </p>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="w-6 h-6 border-2 border-background">
                          <AvatarFallback className="text-xs bg-gradient-wellness text-wellness-foreground">
                            {String.fromCharCode(65 + i)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {community.isJoined ? (
                      <>
                        <Button size="sm" className="flex-1" onClick={() => setDiscussionCommunity(community)}>
                          <MessageCircle className="w-4 h-4 mr-1" />
                          View Discussions
                        </Button>
                        <Button size="sm" variant="outline">
                          Leave
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="w-full shadow-glow" onClick={() => handleJoin(community.id)}>
                        <Users className="w-4 h-4 mr-1" />
                        Join Community
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {/* Discussion Panel */}
      {discussionCommunity && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative flex flex-col h-[70vh]">
            <button className="absolute top-2 right-2 text-muted-foreground" onClick={() => setDiscussionCommunity(null)} title="Close discussion">
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${discussionCommunity.color}`}>
                <discussionCommunity.icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-primary">{discussionCommunity.name}</div>
                <div className="text-xs text-muted-foreground">Discussions</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 mb-3 bg-muted/20 rounded">
              {(discussionMessages[discussionCommunity.id] || []).length === 0 && (
                <div className="text-muted-foreground text-sm text-center mt-20">No messages yet. Start the conversation!</div>
              )}
              {(discussionMessages[discussionCommunity.id] || []).map((msg, idx) => (
                <div key={idx} className={`mb-2 flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-[70%] ${msg.sender === "You" ? "bg-primary text-white" : "bg-white border"}`}>
                    <span className="text-sm">{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Input
                value={discussionInput}
                onChange={e => setDiscussionInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={e => { if (e.key === 'Enter') handleSendDiscussion(discussionCommunity.id); }}
              />
              <Button onClick={() => handleSendDiscussion(discussionCommunity.id)} disabled={!discussionInput.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}