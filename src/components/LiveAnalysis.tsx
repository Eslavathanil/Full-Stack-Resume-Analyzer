import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ResumeAnalysis } from "@/types/resume";
import ResumeResults from "./ResumeResults";

const LiveAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setAnalysis(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setAnalysis(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockAnalysis: ResumeAnalysis = {
        id: Date.now().toString(),
        fileName: file.name,
        personalDetails: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1 (555) 123-4567",
          linkedin: "linkedin.com/in/johndoe",
          portfolio: "johndoe.dev"
        },
        summary: "Experienced software developer with 5+ years in full-stack development, specializing in React and Node.js applications.",
        workExperience: [
          {
            company: "Tech Corp",
            position: "Senior Software Developer",
            duration: "2021 - Present",
            description: [
              "Led development of React applications serving 10k+ users",
              "Implemented CI/CD pipelines reducing deployment time by 60%",
              "Mentored junior developers and conducted code reviews"
            ]
          }
        ],
        education: [
          {
            institution: "University of Technology",
            degree: "Bachelor of Computer Science",
            duration: "2015 - 2019",
            gpa: "3.8"
          }
        ],
        projects: [
          {
            name: "E-commerce Platform",
            description: "Full-stack e-commerce solution with React and Node.js",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            duration: "3 months"
          }
        ],
        certifications: [
          {
            name: "AWS Certified Developer",
            issuer: "Amazon Web Services",
            date: "2023"
          }
        ],
        skills: {
          technical: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
          soft: ["Leadership", "Problem Solving", "Communication", "Team Collaboration"]
        },
        aiFeedback: {
          rating: 8.5,
          summary: "Strong technical background with good project diversity. Resume shows clear career progression and relevant skills.",
          improvementAreas: [
            "Add more quantified achievements and metrics",
            "Include more soft skills examples in experience descriptions",
            "Consider adding a professional summary section"
          ],
          suggestedSkills: [
            "Kubernetes",
            "GraphQL",
            "TypeScript",
            "Machine Learning basics"
          ]
        },
        createdAt: new Date().toISOString()
      };

      setAnalysis(mockAnalysis);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
  };

  if (analysis) {
    return <ResumeResults analysis={analysis} onReset={resetAnalysis} />;
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="border-dashed border-2 transition-colors duration-200 hover:border-primary/50">
        <CardContent className="p-8">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive
                ? "border-primary bg-primary/5 scale-[1.02]"
                : file
                ? "border-success bg-success/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isAnalyzing}
            />
            
            <div className="flex flex-col items-center gap-4">
              {file ? (
                <>
                  <CheckCircle className="w-12 h-12 text-success" />
                  <div>
                    <h3 className="text-lg font-semibold text-success">File Selected</h3>
                    <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-semibold">Upload Your Resume</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Drag and drop your PDF resume here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Only PDF files are supported (Max 10MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Button */}
      {file && (
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={analyzeResume}
            disabled={isAnalyzing}
            size="lg"
            className="min-w-[200px] h-12"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                Analyze Resume
              </>
            )}
          </Button>
          
          {isAnalyzing && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                This may take a few moments while we analyze your resume...
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-info/20 bg-info/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-info" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Advanced AI reviews your resume structure, content, and provides improvement suggestions
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Skill Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Get personalized skill recommendations based on your experience and industry trends
            </p>
          </CardContent>
        </Card>

        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Instant Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Receive detailed feedback and actionable insights to enhance your resume's impact
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveAnalysis;