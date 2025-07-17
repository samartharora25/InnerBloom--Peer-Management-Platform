import { Phone, MessageCircle, Video, Clock, Shield, Heart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const emergencyContacts = [
  {
    name: "National Mental Health Helpline",
    contact: "14416",
    description: "24/7 crisis support via phone (India)",
    icon: Phone,
    type: "emergency"
  },
  {
    name: "Toll-Free Crisis Helpline",
    contact: "18008914416",
    description: "24/7 toll-free mental health support (India)",
    icon: Phone,
    type: "emergency"
  }
];

const professionalSupport = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Clinical Psychologist",
    focus: "Anxiety & Depression",
    availability: "Mon-Fri 9AM-5PM",
    rating: 4.9,
    status: "Available"
  },
  {
    name: "Dr. James Rodriguez",
    specialty: "Psychiatrist",
    focus: "Trauma & PTSD",
    availability: "Tue-Thu 10AM-6PM",
    rating: 4.8,
    status: "Busy"
  },
  {
    name: "Dr. Emily Chen",
    specialty: "Licensed Therapist",
    focus: "Relationship & Family",
    availability: "Mon-Sat 8AM-7PM",
    rating: 4.9,
    status: "Available"
  }
];

export function HelpSection() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Support & Resources</h2>
        <p className="text-muted-foreground">Professional help and crisis support when you need it most</p>
      </div>

      {/* Emergency Support */}
      <Card className="border-destructive/20 shadow-soft">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <CardTitle className="text-destructive">Emergency Support</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-destructive mb-2">
              If you're having thoughts of self-harm or suicide, please reach out immediately:
            </p>
            <Button className="bg-destructive hover:bg-destructive/90 shadow-glow">
              <Phone className="w-4 h-4 mr-2" />
              Call 14416 or 18008914416 - Crisis Lifeline
            </Button>
          </div>
          
          <div className="grid gap-3">
            {emergencyContacts.map((contact) => (
              <div key={contact.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <contact.icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-medium">{contact.contact}</p>
                  <Badge variant={contact.type === "emergency" ? "destructive" : "secondary"} className="text-xs">
                    {contact.type === "emergency" ? "Emergency" : "Support"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Professional Support */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Professional Mental Health Support</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              View All Providers
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {professionalSupport.map((provider, index) => (
            <div key={provider.name}>
              <div className="flex items-start justify-between p-4 rounded-lg hover:bg-muted/50 transition-smooth">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{provider.name}</h3>
                    <Badge 
                      variant={provider.status === "Available" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {provider.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{provider.specialty}</p>
                  <p className="text-sm font-medium text-primary mb-2">{provider.focus}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {provider.availability}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {provider.rating}/5.0
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button size="sm" disabled={provider.status === "Busy"}>
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" disabled={provider.status === "Busy"}>
                    <Video className="w-4 h-4 mr-1" />
                    Video Call
                  </Button>
                </div>
              </div>
              {index < professionalSupport.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Peer Support */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-wellness" />
            <span>Peer Support Options</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-wellness text-wellness-foreground">
              <h4 className="font-semibold mb-2">Trained Peer Counselors</h4>
              <p className="text-sm mb-3 opacity-90">
                Connect with peers who have lived experience and specialized training
              </p>
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Find Peer Counselor
              </Button>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-primary text-primary-foreground">
              <h4 className="font-semibold mb-2">Support Groups</h4>
              <p className="text-sm mb-3 opacity-90">
                Join moderated group sessions with peers facing similar challenges
              </p>
              <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Join Support Group
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}