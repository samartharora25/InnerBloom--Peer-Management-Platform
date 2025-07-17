import React, { useState } from "react";

const mockGroups = [
  { id: 1, name: "Anxiety Support Circle" },
  { id: 2, name: "Depression Support" },
  { id: 3, name: "School Buddies" },
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "interns", label: "Assign & Rotate Interns" },
  { id: "security", label: "Credential Security" },
  { id: "activity", label: "Intern Activity Log" },
];

const INTERN_TABS = [
  { id: "community", label: "Community Dashboard" },
  { id: "sessions", label: "Session Management" },
  { id: "mood", label: "Mood & Sentiment" },
  { id: "feedback", label: "Member Feedback" },
  { id: "resources", label: "Resource Management" },
  { id: "handoff", label: "Intern Handoff" },
  { id: "leaderboard", label: "Leaderboard" },
  ...TABS // keep doctor/intern management tabs at the end
];

const DoctorInternDashboard = () => {
  const [activeTab, setActiveTab] = useState("community");
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

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[#004030] font-roboto">InnerBloom Doctor</span>
          </div>
          <div className="flex items-center gap-2">
            {INTERN_TABS.map(tab => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-glow' : 'bg-white text-primary border border-primary/30 hover:bg-primary/10'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {INTERN_TABS.map(tab => (
            activeTab === tab.id && (
              <React.Fragment key={tab.id}>
                {tab.id === "community" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Assigned Groups Overview</h2>
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
                  </div>
                )}
                {tab.id === "sessions" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Session Management Tools</h2>
                    <div className="mb-4">(Mock) Calendar/Scheduler with session list, attendance, resource upload, and note editor here.</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-4 shadow-soft">
                        <div className="font-semibold mb-2">Upcoming Sessions</div>
                        <ul className="text-sm space-y-1">
                          <li>Mon 10am: Anxiety Group (Video, Topic: Coping Skills)</li>
                          <li>Wed 5pm: School Buddies (Chat, Topic: Exam Stress)</li>
                        </ul>
                        <button className="mt-2 bg-primary text-white px-3 py-1 rounded">Schedule New</button>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-soft">
                        <div className="font-semibold mb-2">Session Notes</div>
                        <textarea className="w-full border rounded p-2 mb-2" rows={4} placeholder="Add notes, insights, or handoff info..." />
                        <button className="bg-primary text-white px-3 py-1 rounded">Save Note</button>
                      </div>
                    </div>
                  </div>
                )}
                {tab.id === "mood" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Mood & Sentiment Monitoring</h2>
                    <div className="mb-4">(Mock) Mood/sentiment graph, color-coded flags, and intervention prompts here.</div>
                    <div className="bg-white rounded-xl p-6 shadow-soft">
                      <div className="font-semibold mb-2">Group Mood Trend</div>
                      <div className="h-32 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded mb-2 flex items-center justify-center">[Mood Graph]</div>
                      <div className="flex gap-2">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Most members: Positive</span>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">2 flagged for check-in</span>
                      </div>
                    </div>
                  </div>
                )}
                {tab.id === "feedback" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Member Feedback & Pulse Check</h2>
                    <div className="mb-4">(Mock) Weekly pulse check survey and analytics here.</div>
                    <div className="bg-white rounded-xl p-6 shadow-soft">
                      <div className="font-semibold mb-2">Pulse Check Results</div>
                      <ul className="text-sm">
                        <li>"Felt heard": 92%</li>
                        <li>"Safe in group": 88%</li>
                        <li>"Want more sessions": 34%</li>
                      </ul>
                    </div>
                  </div>
                )}
                {tab.id === "resources" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Resource Management</h2>
                    <div className="mb-4">(Mock) Resource library, tagging, and share-to-group here.</div>
                    <div className="bg-white rounded-xl p-6 shadow-soft">
                      <div className="font-semibold mb-2">Resource Library</div>
                      <ul className="text-sm">
                        <li>Guide: Coping with Anxiety <button className="ml-2 text-primary underline">Share</button></li>
                        <li>PDF: Study Skills <button className="ml-2 text-primary underline">Share</button></li>
                      </ul>
                      <button className="mt-2 bg-primary text-white px-3 py-1 rounded">Upload Resource</button>
                    </div>
                  </div>
                )}
                {tab.id === "handoff" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Intern Rotation Handoff</h2>
                    <div className="mb-4">(Mock) Handoff doc editor, templates, and mark ready here.</div>
                    <div className="bg-white rounded-xl p-6 shadow-soft">
                      <div className="font-semibold mb-2">Handoff Notes</div>
                      <textarea className="w-full border rounded p-2 mb-2" rows={4} placeholder="Summarize mood, key events, ongoing initiatives..." />
                      <button className="bg-primary text-white px-3 py-1 rounded">Save Handoff</button>
                      <button className="ml-2 bg-success text-white px-3 py-1 rounded">Ready for next intern</button>
                    </div>
                  </div>
                )}
                {tab.id === "leaderboard" && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Intern Leaderboard</h2>
                    <div className="mb-4">(Mock) Non-competitive metrics dashboard here.</div>
                    <div className="bg-white rounded-xl p-6 shadow-soft">
                      <ul className="text-sm">
                        <li>Sessions facilitated: 12</li>
                        <li>Crisis flags handled: 3</li>
                        <li>User satisfaction: 4.7/5</li>
                      </ul>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorInternDashboard; 