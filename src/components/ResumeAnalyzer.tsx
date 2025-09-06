import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, History, Upload, Brain } from "lucide-react";
import LiveAnalysis from "./LiveAnalysis";
import HistoricalViewer from "./HistoricalViewer";

const ResumeAnalyzer = () => {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary text-primary-foreground">
              <Brain className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Resume Analyzer
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume for AI-powered analysis and get personalized feedback to improve your career prospects
          </p>
        </div>

        {/* Main Tabs */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="live" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Live Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  <span>History</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="mt-0">
                <div className="mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Resume Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload a PDF resume to get instant AI-powered analysis and feedback
                  </CardDescription>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <div className="mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Analysis History
                  </CardTitle>
                  <CardDescription>
                    View all previously analyzed resumes and their detailed feedback
                  </CardDescription>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="live" className="mt-0">
                <LiveAnalysis />
              </TabsContent>
              <TabsContent value="history" className="mt-0">
                <HistoricalViewer />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;