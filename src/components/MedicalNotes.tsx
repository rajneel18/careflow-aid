
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Save, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface MedicalNotesProps {
  transcribedText: string;
  onGeneratePrescription: (notes: string) => void;
}

const MedicalNotes = ({ transcribedText, onGeneratePrescription }: MedicalNotesProps) => {
  const [notes, setNotes] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [enhancedNotes, setEnhancedNotes] = useState("");
  const [activeTab, setActiveTab] = useState("raw");
  const { toast } = useToast();

  useEffect(() => {
    if (transcribedText) {
      setNotes(transcribedText);
      enhanceNotes(transcribedText);
    }
  }, [transcribedText]);

  const enhanceNotes = (text: string) => {
    // Simulate AI enhancement of the notes with improved structure
    setTimeout(() => {
      // Add structure to the raw transcription
      const sections = [
        "## Subjective",
        text,
        "\n## Objective",
        "- Vital signs within normal range",
        "- Physical examination unremarkable",
        "\n## Assessment",
        "Based on symptoms and examination findings, the following diagnoses are considered:",
        "1. Primary: " + generateDiagnosis(text),
        "\n## Plan",
        "- Medication prescribed (see prescription section)",
        "- Follow-up in 2 weeks",
        "- Patient education provided regarding condition management"
      ];
      
      setEnhancedNotes(sections.join("\n"));
      setActiveTab("enhanced");
    }, 1000);
  };

  const generateDiagnosis = (text: string) => {
    if (text.includes("allergies") || text.includes("itchy")) {
      return "Seasonal allergic rhinitis";
    } else if (text.includes("headache")) {
      return "Tension headache";
    } else if (text.includes("diabetes")) {
      return "Type 2 diabetes mellitus, controlled";
    } else {
      return "Unspecified condition requiring further evaluation";
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    enhanceNotes(notes);
    toast({
      title: "Notes saved",
      description: "Your medical notes have been updated"
    });
  };

  const handlePrescriptionGenerate = () => {
    onGeneratePrescription(activeTab === "enhanced" ? enhancedNotes : notes);
    toast({
      title: "Generating prescription",
      description: "Creating prescription based on your notes",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-lg font-semibold">Medical Notes</h3>
        <div className="flex gap-2">
          {isEditing ? (
            <Button size="sm" onClick={handleSave}>
              <Save className="mr-1 h-4 w-4" />
              Save
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit2 className="mr-1 h-4 w-4" />
              Edit
            </Button>
          )}
          <Button 
            size="sm" 
            onClick={handlePrescriptionGenerate}
            disabled={!notes}
            variant="default"
          >
            <CheckCircle2 className="mr-1 h-4 w-4" />
            Generate Rx
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="raw">Raw Notes</TabsTrigger>
            <TabsTrigger value="enhanced" disabled={!enhancedNotes}>
              Enhanced (AI)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="raw" className="mt-0">
            {isEditing ? (
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Enter or edit medical notes here..."
              />
            ) : (
              <div className="min-h-[300px] whitespace-pre-wrap rounded-md border bg-muted/30 p-4 font-mono text-sm">
                {notes || "No notes yet. Use the voice recorder to create notes."}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="enhanced" className="mt-0">
            <div className="min-h-[300px] whitespace-pre-wrap rounded-md border bg-muted/30 p-4 font-mono text-sm">
              {enhancedNotes || "Enhanced notes will appear here after processing."}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalNotes;
