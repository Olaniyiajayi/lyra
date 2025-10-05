import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

type UploadDialogVariant = "card" | "button";

interface Props {
  variant?: UploadDialogVariant;
  onUploadSuccess?: () => void;
}

export default function UploadDocumentDialog({ variant = "card", onUploadSuccess }: Props) {
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
      const { fetchAuthSession } = await import("aws-amplify/auth");
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      if (!idToken) throw new Error("No ID token found");

      setUploadProgress(20);

      const fileExtension = selectedFile.name.split(".").pop() || "";
      const contentType = selectedFile.type || "application/octet-stream";

      const payload = {
        title: title.trim(),
        department: department || "engineering",
        tags: tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        visibility: visibility,
        file_extension: fileExtension,
        content_type: contentType,
      };

      setUploadProgress(30);

      const response = await fetch("https://ddbvzu5y2m.execute-api.us-east-1.amazonaws.com/dev/upload/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      setUploadProgress(50);

      const result = await response.json();
      let uploadData: any;
      if (typeof result === "string") {
        uploadData = JSON.parse(result).upload_data;
      } else if ((result as any).body) {
        uploadData = JSON.parse((result as any).body).upload_data;
      } else {
        uploadData = (result as any).upload_data;
      }

      if (!uploadData || !uploadData.presigned_url) {
        throw new Error("Invalid response: missing presigned URL data");
      }

      const { presigned_url } = uploadData;
      setUploadProgress(60);

      const formData = new FormData();
      if (!presigned_url.fields) throw new Error("Invalid presigned URL: missing fields");

      const requiredFields = [
        "key",
        "x-amz-algorithm",
        "x-amz-credential",
        "x-amz-date",
        "policy",
        "x-amz-signature",
      ];
      const missingFields = requiredFields.filter((f) => !presigned_url.fields[f]);
      if (missingFields.length > 0) {
        throw new Error(`Invalid presigned URL: missing required fields: ${missingFields.join(", ")}`);
      }

      const fieldOrder = [
        "key",
        "Content-Type",
        "x-amz-algorithm",
        "x-amz-credential",
        "x-amz-date",
        "x-amz-security-token",
        "policy",
        "x-amz-signature",
      ];
      fieldOrder.forEach((name) => {
        const value = presigned_url.fields[name];
        if (value) formData.append(name, value);
      });
      Object.entries(presigned_url.fields).forEach(([k, v]) => {
        if (!fieldOrder.includes(k)) formData.append(k, v as string);
      });

      const targetContentType = presigned_url.fields["Content-Type"] as string | undefined;
      let fileToUpload = selectedFile;
      if (targetContentType && selectedFile.type !== targetContentType) {
        fileToUpload = new File([selectedFile], selectedFile.name, {
          type: targetContentType,
          lastModified: selectedFile.lastModified,
        });
      }
      formData.append("file", fileToUpload);

      let uploadResponse: Response | null = null;
      try {
        uploadResponse = await fetch(presigned_url.url, { method: "POST", body: formData });
        if (uploadResponse.status !== 204 && !uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          throw new Error(`File upload failed: ${uploadResponse.status} - ${errorText}`);
        }
      } catch (err: any) {
        if (err instanceof TypeError && err.message.includes("CORS")) {
          await fetch(presigned_url.url, { method: "POST", body: formData, mode: "no-cors" });
          uploadResponse = null;
        } else {
          throw err;
        }
      }

      setUploadProgress(100);
      toast({ title: "Success", description: "Document uploaded successfully" });

      setTitle("");
      setDepartment("");
      setTags("");
      setVisibility("team-only");
      setSelectedFile(null);
      setUploadProgress(0);
      setOpen(false);
      onUploadSuccess?.();
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message || "Failed to upload document", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "card" ? (
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Upload Documents</h3>
              <p className="text-sm text-muted-foreground">Expand Lyra's knowledge base with new files.</p>
            </CardContent>
          </Card>
        ) : (
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              id="file-upload-shared"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {selectedFile ? selectedFile.name : "Drag and drop files here"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Or click to browse</p>
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload-shared")?.click()}
              disabled={isUploading}
            >
              Browse Files
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter document title" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                <Input id="tags" placeholder="Add tags" value={tags} onChange={(e) => setTags(e.target.value)} />
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

          <div className="flex justify-end">
            <Button onClick={handleUpload} disabled={isUploading || !title.trim() || !selectedFile} className="px-8">
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}