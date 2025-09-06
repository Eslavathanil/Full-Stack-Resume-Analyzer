import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, FileText, Calendar, Star, Database, User, Mail } from "lucide-react";
import { ResumeAnalysis } from "@/types/resume";
import ResumeResults from "./ResumeResults";

const HistoricalViewer = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<ResumeAnalysis | null>(null);

  // Mock historical data
  const mockHistoricalData: ResumeAnalysis[] = [
    {
      id: "1",
      fileName: "john_doe_resume_v2.pdf",
      personalDetails: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        linkedin: "linkedin.com/in/johndoe"
      },
      summary: "Senior Software Developer with expertise in React and Node.js",
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      skills: { technical: ["React", "Node.js"], soft: ["Leadership"] },
      aiFeedback: {
        rating: 8.5,
        summary: "Strong technical background",
        improvementAreas: ["Add more metrics"],
        suggestedSkills: ["TypeScript"]
      },
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "2",
      fileName: "jane_smith_resume.pdf",
      personalDetails: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1 (555) 987-6543",
        portfolio: "janesmith.dev"
      },
      summary: "Full-stack developer specializing in modern web technologies",
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      skills: { technical: ["Vue.js", "Python"], soft: ["Communication"] },
      aiFeedback: {
        rating: 7.2,
        summary: "Good foundation with room for improvement",
        improvementAreas: ["Expand experience section"],
        suggestedSkills: ["Docker", "AWS"]
      },
      createdAt: "2024-01-10T14:20:00Z"
    },
    {
      id: "3",
      fileName: "mike_johnson_cv.pdf",
      personalDetails: {
        name: "Mike Johnson",
        email: "mike.j@email.com",
        phone: "+1 (555) 456-7890",
        linkedin: "linkedin.com/in/mikejohnson"
      },
      summary: "DevOps Engineer with cloud infrastructure expertise",
      workExperience: [],
      education: [],
      projects: [],
      certifications: [],
      skills: { technical: ["AWS", "Kubernetes"], soft: ["Problem Solving"] },
      aiFeedback: {
        rating: 9.1,
        summary: "Excellent technical depth and clear presentation",
        improvementAreas: ["Add soft skills examples"],
        suggestedSkills: ["Terraform"]
      },
      createdAt: "2024-01-05T09:15:00Z"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-success text-success-foreground";
    if (rating >= 6) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  if (mockHistoricalData.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Database className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Analysis History</h3>
          <p className="text-muted-foreground text-center max-w-md">
            You haven't analyzed any resumes yet. Upload a resume in the Live Analysis tab to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Total Analyses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHistoricalData.length}</div>
            <p className="text-xs text-muted-foreground">Resumes analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="w-4 h-4" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockHistoricalData.reduce((sum, item) => sum + item.aiFeedback.rating, 0) / mockHistoricalData.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Out of 10</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Latest Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {formatDate(mockHistoricalData[0].createdAt).split(',')[0]}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(mockHistoricalData[0].createdAt).split(',')[1]}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis History</CardTitle>
          <CardDescription>
            View all previously analyzed resumes and their AI-generated feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Analyzed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHistoricalData.map((analysis) => (
                  <TableRow key={analysis.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{analysis.personalDetails.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{analysis.personalDetails.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono">{analysis.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getRatingColor(analysis.aiFeedback.rating)}>
                        {analysis.aiFeedback.rating}/10
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(analysis.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => setSelectedAnalysis(analysis)}
                          >
                            <Eye className="w-4 h-4" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Resume Analysis Details</DialogTitle>
                          </DialogHeader>
                          {selectedAnalysis && (
                            <ResumeResults 
                              analysis={selectedAnalysis} 
                              onReset={() => setSelectedAnalysis(null)} 
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricalViewer;