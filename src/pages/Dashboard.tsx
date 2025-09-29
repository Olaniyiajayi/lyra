import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LyraLogo } from "@/components/ui/lyra-logo";
import { Bell, Search, FileText, Sparkles, Upload, MessageSquare, FolderOpen, Network, Settings as SettingsIcon, Clock, File } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut, getCurrentUser } from 'aws-amplify/auth';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
      } catch {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Sign out error:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background p-6 flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <LyraLogo className="h-8 w-8" />
          <span className="text-xl font-bold">Lyra</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Button
            variant={currentView === "dashboard" ? "secondary" : "ghost"}
            className={cn("w-full justify-start", currentView === "dashboard" && "bg-secondary")}
            onClick={() => setCurrentView("dashboard")}
          >
            <FileText className="h-4 w-4 mr-3" />
            Dashboard
          </Button>
          <Button
            variant={currentView === "chat" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setCurrentView("chat")}
          >
            <MessageSquare className="h-4 w-4 mr-3" />
            Chat Interface
          </Button>
          <Button
            variant={currentView === "documents" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setCurrentView("documents")}
          >
            <FolderOpen className="h-4 w-4 mr-3" />
            Document Workspa...
          </Button>
          <Button
            variant={currentView === "knowledge" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setCurrentView("knowledge")}
          >
            <Network className="h-4 w-4 mr-3" />
            Knowledge Hub
          </Button>
        </nav>

        <div className="mt-auto space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCurrentView("settings")}
          >
            <SettingsIcon className="h-4 w-4 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b border-border bg-background px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Ask Lyra anything..." 
                className="pl-12 h-12 bg-muted/30 border-0"
              />
            </div>
            <div className="flex items-center space-x-4 ml-6">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">S</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {currentView === "dashboard" && <DashboardHome />}
          {currentView === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}

function DashboardHome() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Good morning, Sarah</h1>
        <p className="text-muted-foreground text-lg">Lyra is ready to assist you. Here are some suggestions to get started.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card className="hover:shadow-md transition-shadow cursor-pointer bg-primary/5">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Ask Lyra</h3>
            <p className="text-sm text-muted-foreground">Get instant answers from your knowledge base.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Generate Document</h3>
            <p className="text-sm text-muted-foreground">Create a new document based on a template or prompt.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <File className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Summarize Content</h3>
            <p className="text-sm text-muted-foreground">Condense long documents or conversations.</p>
          </CardContent>
        </Card>

        <UploadDocumentDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Interactions */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Recent Interactions</h2>
          <div className="space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Meeting Summary</h3>
                      <p className="text-sm text-muted-foreground">Summarize key points from the Q2 planning meeting...</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">Today</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Project Update</h3>
                      <p className="text-sm text-muted-foreground">Provide a progress summary for the 'Phoenix' project...</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">Yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Competitor Analysis</h3>
                      <p className="text-sm text-muted-foreground">Analyze the latest market report from Competitor X...</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">2 days ago</span>
                </div>
              </CardContent>
            </Card>

            <Button variant="link" className="w-full">View all interactions</Button>
          </div>
        </div>

        {/* Pinned Documents */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Pinned Documents</h2>
          <div className="space-y-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Project Proposal</h3>
                    <p className="text-sm text-muted-foreground">Updated: 3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Marketing Strategy</h3>
                    <p className="text-sm text-muted-foreground">Updated: 1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button variant="link" className="w-full">View all documents</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadDocumentDialog() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("team-only");

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Documents</h3>
            <p className="text-sm text-muted-foreground">Expand Lyra's knowledge base with new files.</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Upload Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
            <p className="text-sm text-muted-foreground mb-4">Or click to browse</p>
            <Button variant="outline">Browse Files</Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Add tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Visibility</Label>
              <RadioGroup value={visibility} onValueChange={setVisibility} className="flex space-x-6 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="team-only" id="team-only" />
                  <Label htmlFor="team-only">Team-only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleUpload} 
              disabled={isUploading || !title.trim()}
              className="px-8"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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