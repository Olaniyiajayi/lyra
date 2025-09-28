import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LyraLogo } from "@/components/ui/lyra-logo";
import { Bell, User, Search, FileText, MessageSquare, Users, Settings as SettingsIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'aws-amplify/auth';
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const sidebarItems = [
    { id: "home", label: "Home", icon: LyraLogo },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "tasks", label: "Tasks", icon: Users },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome />;
      case "chat":
        return <ChatInterface />;
      case "documents":
        return <DocumentEditor />;
      case "tasks":
        return <KnowledgeHub />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <LyraLogo className="h-8 w-8" />
            <span className="text-xl font-bold">Lyra</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4 flex-1 max-w-2xl">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search Knowledge"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function DashboardHome() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Here's a look at your recent activity and pinned documents.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <Button variant="secondary" className="w-full">
              ✨ Ask Lyra
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Button variant="outline" className="w-full">
              📄 Generate Document
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Knowledge" className="pl-10" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interactions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Interactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Meeting Summary</h3>
                  <p className="text-sm text-muted-foreground mb-2">Summarize key points from the meeting</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Project Update</h3>
                  <p className="text-sm text-muted-foreground mb-2">Provide a summary of the project's progress</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pinned Documents */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Pinned Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Project Proposal</h3>
                  <p className="text-sm text-muted-foreground">Detailed proposal for the new project</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Marketing Strategy</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive marketing plan for the upcoming campaign</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChatInterface() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Lyra, your enterprise AI assistant. I can help with a variety of tasks. How can I assist you today?",
      sender: "lyra",
    },
    {
      id: 2,
      text: "Can you summarize the main points from the \"Project Alpha\" meeting notes?",
      sender: "user",
    },
    {
      id: 3,
      text: "Of course. Here are the main points from the \"Project Alpha\" meeting:\n\n• The project is on track and meeting all key deadlines.\n• Marketing has finalized the launch campaign strategy.\n• Engineering needs to address the performance issues flagged in QA testing by EOD Friday.",
      sender: "lyra",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages([...messages, { id: Date.now(), text: message, sender: "user" }]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I understand your request. Let me help you with that...",
        sender: "lyra"
      }]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "lyra" && (
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <LyraLogo className="h-4 w-4" />
              </div>
            )}
            <div
              className={`max-w-2xl p-4 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex gap-2 mb-4">
          <Button variant="outline" size="sm">Summarize</Button>
          <Button variant="outline" size="sm">Draft Proposal</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-6 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message or ask a question..."
            className="flex-1"
          />
          <Button type="submit" disabled={!message.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

function DocumentEditor() {
  return (
    <div className="h-full flex flex-col">
      {/* Document Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <nav className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="text-foreground font-medium">Documents</span>
            <Link to="/templates" className="text-muted-foreground hover:text-foreground">Templates</Link>
            <Link to="/help" className="text-muted-foreground hover:text-foreground">Help</Link>
          </nav>
          <Button>Export</Button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">B</Button>
          <Button variant="outline" size="sm">I</Button>
          <Button variant="outline" size="sm">U</Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="outline" size="sm">• List</Button>
          <Button variant="outline" size="sm">1. List</Button>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="min-h-96 p-8 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">
                Start writing or ask Lyra to generate content...
              </p>
            </div>
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="w-80 p-6 border-l border-border bg-accent/20">
          <h3 className="font-medium mb-4">Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Summarize</span>
              <Button size="sm">Run</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Rewrite</span>
              <Button size="sm">Run</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Translate</span>
              <Button size="sm">Run</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Improve writing</span>
              <Button size="sm">Run</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Continue writing</span>
              <Button size="sm">Run</Button>
            </div>
          </div>

          <h3 className="font-medium mt-8 mb-4">Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Tone</span>
              <span className="text-xs text-muted-foreground">Neutral</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Sentiment</span>
              <span className="text-xs text-muted-foreground">Positive</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <span className="text-sm">Clarity</span>
              <span className="text-xs text-muted-foreground">Clear</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeHub() {
  const documents = [
    {
      title: "Project Alpha Report",
      description: "Detailed report on Project Alpha's progress and key findings.",
      icon: FileText,
    },
    {
      title: "Marketing Strategy 2024",
      description: "Comprehensive marketing strategy for the year 2024.",
      icon: FileText,
    },
    {
      title: "HR Policy Updates",
      description: "Latest updates to HR policies and procedures.",
      icon: FileText,
    },
    {
      title: "Sales Training Manual",
      description: "Training manual for the sales team.",
      icon: FileText,
    },
    {
      title: "Customer Feedback Analysis",
      description: "Analysis of customer feedback from the past quarter.",
      icon: FileText,
    },
    {
      title: "Product Roadmap Q3",
      description: "Product roadmap for the third quarter.",
      icon: FileText,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Knowledge Hub</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive knowledge base to find answers, insights, and resources to support your work and enhance productivity.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search documents, reports, and more..."
          className="pl-12 h-12"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <Button variant="outline">Date</Button>
        <Button variant="outline">Department</Button>
        <Button variant="outline">Tags</Button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <doc.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">{doc.title}</h3>
              <p className="text-sm text-muted-foreground">{doc.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-8">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Tone</h4>
                <p className="text-sm text-muted-foreground">Adjust the tone of the AI assistant</p>
              </div>
              <Button variant="outline">Neutral</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Language</h4>
                <p className="text-sm text-muted-foreground">Choose the language for the AI assistant</p>
              </div>
              <Button variant="outline">English</Button>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">Connect your email account for seamless integration</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Calendar</h4>
                <p className="text-sm text-muted-foreground">Integrate with your calendar for scheduling assistance</p>
              </div>
              <div className="w-12 h-6 bg-muted rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">File Storage</h4>
                <p className="text-sm text-muted-foreground">Connect your file storage for document access</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications for important updates and reminders</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">In-App Notifications</h4>
                <p className="text-sm text-muted-foreground">Get in-app notifications for immediate alerts</p>
              </div>
              <div className="w-12 h-6 bg-muted rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Theme</h4>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <div className="flex bg-muted rounded-lg p-1">
                <Button variant="default" size="sm">Light</Button>
                <Button variant="ghost" size="sm">Dark</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Account Settings</h4>
                <p className="text-sm text-muted-foreground">Manage your account details and preferences</p>
              </div>
              <Button variant="outline">
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}