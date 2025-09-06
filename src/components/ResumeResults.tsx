import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  FolderOpen, 
  Award,
  Brain,
  TrendingUp,
  Target,
  Star,
  RotateCcw
} from "lucide-react";
import { ResumeAnalysis } from "@/types/resume";

interface ResumeResultsProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

const ResumeResults = ({ analysis, onReset }: ResumeResultsProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-success";
    if (rating >= 6) return "text-warning";
    return "text-destructive";
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return "bg-success/10 border-success/20";
    if (rating >= 6) return "bg-warning/10 border-warning/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <div className="space-y-6">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <p className="text-muted-foreground">{analysis.fileName}</p>
        </div>
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Analyze New Resume
        </Button>
      </div>

      {/* AI Rating Card */}
      <Card className={`${getRatingBg(analysis.aiFeedback.rating)} border-2`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Analysis Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getRatingColor(analysis.aiFeedback.rating)}`}>
                {analysis.aiFeedback.rating}
              </div>
              <div className="text-sm text-muted-foreground">out of 10</div>
            </div>
            <div className="flex-1">
              <p className="text-sm">{analysis.aiFeedback.summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{analysis.personalDetails.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{analysis.personalDetails.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{analysis.personalDetails.phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              {analysis.personalDetails.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{analysis.personalDetails.linkedin}</span>
                </div>
              )}
              {analysis.personalDetails.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{analysis.personalDetails.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {analysis.summary && (
        <Card>
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysis.workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <Badge variant="outline">{exp.duration}</Badge>
                </div>
                <ul className="text-sm space-y-1 ml-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="list-disc list-outside">{desc}</li>
                  ))}
                </ul>
                {index < analysis.workExperience.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-sm">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{edu.duration}</Badge>
                    {edu.gpa && (
                      <Badge variant="secondary" className="text-xs">GPA: {edu.gpa}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects and Certifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.projects.map((project, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-sm">{project.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.certifications.map((cert, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-sm">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  <Badge variant="outline" className="text-xs mt-1">{cert.date}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Feedback */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.aiFeedback.improvementAreas.map((area, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Suggested Skills to Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.aiFeedback.suggestedSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs border-primary/50 hover:bg-primary/10">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeResults;