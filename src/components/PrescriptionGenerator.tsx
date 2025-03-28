
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Printer, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PrescriptionGeneratorProps {
  notesContent: string;
  patientName: string;
  patientId: string;
}

const PrescriptionGenerator = ({ notesContent, patientName, patientId }: PrescriptionGeneratorProps) => {
  const [prescription, setPrescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (notesContent) {
      generatePrescription();
    }
  }, [notesContent]);

  const generatePrescription = () => {
    setIsLoading(true);
    
    // Simulate API call to generate prescription
    setTimeout(() => {
      let generatedRx = "";
      
      // Simple logic to generate different prescriptions based on content
      if (notesContent.includes("allergies") || notesContent.includes("allerg")) {
        generatedRx = `
Rx

MEDICATION: Cetirizine 10mg
INSTRUCTIONS: Take 1 tablet by mouth once daily
QUANTITY: 30 tablets
REFILLS: 3

MEDICATION: Fluticasone Propionate Nasal Spray 50mcg
INSTRUCTIONS: Use 1 spray in each nostril once daily
QUANTITY: 1 bottle (120 sprays)
REFILLS: 2
        `;
      } else if (notesContent.includes("headache")) {
        generatedRx = `
Rx

MEDICATION: Sumatriptan 50mg
INSTRUCTIONS: Take 1 tablet at onset of headache. May repeat after 2 hours if needed. Do not exceed 200mg in 24 hours.
QUANTITY: 9 tablets
REFILLS: 2

MEDICATION: Ibuprofen 600mg
INSTRUCTIONS: Take 1 tablet by mouth every 6 hours as needed for pain
QUANTITY: 60 tablets
REFILLS: 1
        `;
      } else if (notesContent.includes("diabetes")) {
        generatedRx = `
Rx

MEDICATION: Metformin 500mg
INSTRUCTIONS: Take 1 tablet by mouth twice daily with meals
QUANTITY: 60 tablets
REFILLS: 5

MEDICATION: Glipizide 5mg
INSTRUCTIONS: Take 1 tablet by mouth once daily before breakfast
QUANTITY: 30 tablets
REFILLS: 5
        `;
      } else {
        generatedRx = `
Rx

MEDICATION: Acetaminophen 500mg
INSTRUCTIONS: Take 2 tablets by mouth every 6 hours as needed for pain or fever
QUANTITY: 60 tablets
REFILLS: 1
        `;
      }
      
      const header = `
PRESCRIPTION

Patient: ${patientName}
Patient ID: ${patientId}
Date: ${new Date().toLocaleDateString()}
Prescriber: Dr. Sarah Johnson, MD
NPI: 1234567890
      `;
      
      const footer = `

Electronically signed by Dr. Sarah Johnson, MD
${new Date().toLocaleString()}

This prescription is electronically generated and valid without signature.
      `;
      
      setPrescription(header + generatedRx + footer);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prescription);
    toast({
      title: "Copied to clipboard",
      description: "Prescription has been copied to clipboard",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print requested",
      description: "Sending prescription to printer",
    });
  };

  const handleDownload = () => {
    // Create a blob from the prescription text
    const blob = new Blob([prescription], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = `prescription_${patientId}_${new Date().toISOString().split("T")[0]}.txt`;
    
    // Trigger the download
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download complete",
      description: "Prescription has been downloaded",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Generated Prescription</h3>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-md border border-dashed p-8">
            <div className="text-center">
              <div className="mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground">Generating prescription...</p>
            </div>
          </div>
        ) : prescription ? (
          <pre className="min-h-[300px] whitespace-pre-wrap rounded-md border bg-white p-6 text-sm font-mono">
            {prescription}
          </pre>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center rounded-md border border-dashed p-8">
            <p className="text-center text-sm text-muted-foreground">
              No prescription generated yet. Create notes and click "Generate Rx".
            </p>
          </div>
        )}
      </CardContent>
      
      {prescription && (
        <CardFooter className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={handleCopy}>
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </Button>
          <Button size="sm" variant="outline" onClick={handlePrint}>
            <Printer className="mr-1 h-4 w-4" />
            Print
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <FileDown className="mr-1 h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PrescriptionGenerator;
