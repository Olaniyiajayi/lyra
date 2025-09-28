import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LyraLogo } from "@/components/ui/lyra-logo";
import { Bell, User, Search, FileText, Sparkles, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signOut } from 'aws-amplify/auth';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <LyraLogo className="h-8 w-8" />
            <span className="text-xl font-bold">Lyra</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">S</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        <DashboardHome />
      </main>
    </div>
  );
}

function DashboardHome() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Here's a look at your recent activity and pinned documents.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button className="h-16 bg-primary text-primary-foreground hover:bg-primary/90">
          <Sparkles className="h-5 w-5 mr-2" />
          Ask Lyra
        </Button>
        <Button variant="outline" className="h-16">
          <FileText className="h-5 w-5 mr-2" />
          Generate Document
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Knowledge" className="pl-10 h-16" />
        </div>
      </div>

      {/* Knowledge Base */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Knowledge Base</h2>
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-12 text-center">
            <UploadDocumentDialog />
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
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-200 dark:bg-orange-800 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Meeting Summary</h3>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Summarize key points from the meeting</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-200 dark:bg-orange-800 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Project Update</h3>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Provide a summary of the project's progress</p>
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
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
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
        <div className="cursor-pointer hover:bg-accent/50 transition-colors rounded-lg p-8">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
          <p className="text-sm text-muted-foreground">
            Add new files to your knowledge base to expand Lyra's expertise.
          </p>
        </div>
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