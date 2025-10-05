import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LyraLogo } from "@/components/ui/lyra-logo";
import { Search, HelpCircle, User, FileText, Upload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Document {
  document_id: string;
  title: string;
  tags: string[];
  department: string;
  visibility: string;
  status: string;
  created_at: string;
  updated_at: string;
  object_key: string;
}

interface UserDetails {
  user_id?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

function UploadDocumentDialog({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("team-only");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and enter a title",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Get the idToken from AWS Amplify
      const { fetchAuthSession } = await import('aws-amplify/auth');
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (!idToken) {
        throw new Error("No ID token found");
      }

      console.log('Using ID Token for authentication');

      setUploadProgress(20);

      // Get file extension and content type
      const fileExtension = selectedFile.name.split('.').pop() || '';
      const contentType = selectedFile.type || 'application/octet-stream';

      // Prepare the payload
      const payload = {
        title: title.trim(),
        department: department || "engineering",
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        visibility: visibility,
        file_extension: fileExtension,
        content_type: contentType
      };

      setUploadProgress(30);

      // Call the API to get presigned URL
      const response = await fetch('https://ddbvzu5y2m.execute-api.us-east-1.amazonaws.com/dev/upload/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      setUploadProgress(50);

      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle the response structure - check if it's already parsed or needs parsing
      let uploadData;
      if (typeof result === 'string') {
        uploadData = JSON.parse(result).upload_data;
      } else if (result.body) {
        uploadData = JSON.parse(result.body).upload_data;
      } else {
        uploadData = result.upload_data;
      }
      
      console.log('Upload Data:', uploadData);
      
      if (!uploadData || !uploadData.presigned_url) {
        throw new Error('Invalid response: missing presigned URL data');
      }
      
      const { presigned_url } = uploadData;
      console.log('Presigned URL:', presigned_url);

      setUploadProgress(60);

      // Upload file using presigned URL
      const formData = new FormData();
      
      // Validate presigned URL fields
      if (!presigned_url.fields) {
        throw new Error('Invalid presigned URL: missing fields');
      }
      
      // Validate required fields for S3 POST upload
      const requiredFields = ['key', 'x-amz-algorithm', 'x-amz-credential', 'x-amz-date', 'policy', 'x-amz-signature'];
      const missingFields = requiredFields.filter(field => !presigned_url.fields[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Invalid presigned URL: missing required fields: ${missingFields.join(', ')}`);
      }
      
      console.log('Presigned URL fields:', presigned_url.fields);
      
      // Build FormData in the exact order S3 expects for POST uploads
      const fieldOrder = [
        'key',
        'Content-Type', 
        'x-amz-algorithm',
        'x-amz-credential',
        'x-amz-date',
        'x-amz-security-token',
        'policy',
        'x-amz-signature'
      ];

      // Add fields in the correct order
      fieldOrder.forEach(fieldName => {
        const value = presigned_url.fields[fieldName];
        if (value) {
          formData.append(fieldName, value);
        }
      });

      // Add any additional fields that might exist
      Object.entries(presigned_url.fields).forEach(([key, value]) => {
        if (!fieldOrder.includes(key)) {
          formData.append(key, value as string);
        }
      });

      // Create a new File object with the correct MIME type if needed
      const targetContentType = presigned_url.fields['Content-Type'] as string | undefined;
      let fileToUpload = selectedFile;
      
      if (targetContentType && selectedFile.type !== targetContentType) {
        fileToUpload = new File([selectedFile], selectedFile.name, { 
          type: targetContentType,
          lastModified: selectedFile.lastModified 
        });
      }

      console.log('Upload file diagnostics:', {
        originalType: selectedFile.type,
        targetContentType: targetContentType || null,
        finalType: fileToUpload.type,
        size: fileToUpload.size,
        fileName: fileToUpload.name
      });

      // Add the file last - this is critical for S3!
      formData.append('file', fileToUpload);

      setUploadProgress(70);

      // Debug: Log the FormData contents
      console.log('FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let uploadResponse: Response | null = null;
      try {
        console.log('Attempting S3 upload to:', presigned_url.url);
        uploadResponse = await fetch(presigned_url.url, {
          method: 'POST',
          body: formData,
        });

        console.log('S3 upload response status:', uploadResponse.status);
        console.log('S3 upload response headers:', Object.fromEntries(uploadResponse.headers.entries()));

        // 204 No Content is the correct success response from S3
        if (uploadResponse.status !== 204 && !uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error('S3 Upload Error Response:', errorText);
          throw new Error(`File upload failed: ${uploadResponse.status} - ${errorText}`);
        }
        
        console.log('S3 upload successful with status:', uploadResponse.status);

      } catch (err) {
        console.error('S3 upload error:', err);
        
        // If it's a CORS error, try with no-cors mode as fallback
        if (err instanceof TypeError && err.message.includes('CORS')) {
          console.warn('CORS error detected, retrying with no-cors mode...');
          try {
            await fetch(presigned_url.url, {
              method: 'POST',
              body: formData,
              mode: 'no-cors',
            });
            console.log('No-cors upload completed (response not readable)');
            uploadResponse = null;
          } catch (noCorsErr) {
            console.error('No-cors upload also failed:', noCorsErr);
            throw new Error(`File upload failed due to CORS issues: ${err.message}`);
          }
        } else {
          throw err;
        }
      }

      setUploadProgress(100);

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      // Reset form
      setTitle("");
      setDepartment("");
      setTags("");
      setVisibility("team-only");
      setSelectedFile(null);
      setOpen(false);
      
      // Trigger refresh if callback provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }

    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment} disabled={isUploading}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. report, Q4, strategy"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>
            <RadioGroup value={visibility} onValueChange={setVisibility} disabled={isUploading}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="team-only" id="team-only" />
                <Label htmlFor="team-only" className="font-normal cursor-pointer">
                  Team Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company-wide" id="company-wide" />
                <Label htmlFor="company-wide" className="font-normal cursor-pointer">
                  Company Wide
                </Label>
              </div>
            </RadioGroup>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isUploading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile || !title.trim()}
              className="flex-1"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function KnowledgeHub() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserDetails | null>(null);
  const { toast } = useToast();

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return {} as Record<string, unknown>;
    }
  };

  const fetchUserAndDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get the idToken from AWS Amplify
      const { fetchAuthSession } = await import('aws-amplify/auth');
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (!idToken) {
        throw new Error("No ID token found");
      }

      // Derive user_id from token claims
      const claims = parseJwt(idToken) as Record<string, any>;
      const userId: string =
        claims["custom:user_id"] || claims["user_id"] || claims["sub"];

      // Fetch user details
      try {
        const userResp = await fetch(
          `https://x7kvimqwgl.execute-api.us-east-1.amazonaws.com/dev/?user_id=${encodeURIComponent(
            userId
          )}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${idToken}`,
            },
          }
        );
        if (userResp.ok) {
          const userData = await userResp.json();
          setUser(userData as UserDetails);
        } else {
          console.warn('Failed to fetch user details', userResp.status);
        }
      } catch (userErr) {
        console.warn('Error fetching user details', userErr);
      }

      // Fetch documents list
      const docsResp = await fetch(
        'https://ddbvzu5y2m.execute-api.us-east-1.amazonaws.com/dev/list/document',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        }
      );

      if (!docsResp.ok) {
        throw new Error(`Failed to fetch documents: ${docsResp.status}`);
      }

      const docsData = await docsResp.json();
      console.log('Documents fetched:', docsData);

      // Handle possible wrapped response shapes
      const docs = Array.isArray(docsData)
        ? docsData
        : Array.isArray(docsData?.documents)
          ? docsData.documents
          : Array.isArray(docsData?.body)
            ? docsData.body
            : Array.isArray(docsData?.items)
              ? docsData.items
              : [];
      setDocuments(docs);
    } catch (err: any) {
      console.error("Error fetching documents:", err);
      setError(err.message || "Failed to load documents");
      toast({
        title: "Error",
        description: err.message || "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndDocuments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
                <LyraLogo className="h-8 w-8" />
                <span className="text-xl font-bold">Lyra</span>
              </div>
              <nav className="flex items-center space-x-6">
                <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
                <Button variant="ghost" className="font-semibold">Knowledge Hub</Button>
                <Button variant="ghost">People</Button>
                <Button variant="ghost">Apps</Button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="pl-10"
                />
              </div>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Knowledge Hub</h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive knowledge base to find answers, insights, and resources.
            </p>
          </div>
          <UploadDocumentDialog onUploadSuccess={fetchUserAndDocuments} />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by keyword, tag, owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
          <Select defaultValue="date">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Modified" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Modified</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="department">Department</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="me">Me</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-10 w-10 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && documents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="p-4 rounded-full bg-muted mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Get started by uploading your first document to the knowledge hub.
            </p>
            <UploadDocumentDialog onUploadSuccess={fetchUserAndDocuments} />
          </div>
        )}

        {/* Document Grid */}
        {!isLoading && documents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {documents.map((doc) => (
              <Card key={doc.document_id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    {doc.status === "UPLOAD_SUCCEEDED" && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Ready
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-3 text-base line-clamp-2">{doc.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doc.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-1 capitalize">{doc.department}</p>
                    <p>{formatDate(doc.updated_at)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background mt-12">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-6">
              <span>© 2024 Lyra</span>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
            </div>
            <div>
              Powered by AI
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
