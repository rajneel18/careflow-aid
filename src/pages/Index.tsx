
import { useState } from "react";
import Navbar from "@/components/Navbar";
import VoiceRecorder from "@/components/VoiceRecorder";
import PatientCard from "@/components/PatientCard";
import MedicalNotes from "@/components/MedicalNotes";
import PrescriptionGenerator from "@/components/PrescriptionGenerator";
import DashboardStats from "@/components/DashboardStats";

const Index = () => {
  const [transcribedText, setTranscribedText] = useState("");
  const [notesForPrescription, setNotesForPrescription] = useState("");

  // Sample patient data
  const currentPatient = {
    id: "PT-12345",
    name: "Michael Anderson",
    age: 42,
    gender: "Male",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Seasonal Allergies"],
  };

  const handleTranscriptionComplete = (text: string) => {
    setTranscribedText(text);
  };

  const handleGeneratePrescription = (notes: string) => {
    setNotesForPrescription(notes);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold">CareFlow AI Assistant</h1>
        
        <DashboardStats />
        
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <PatientCard patient={currentPatient} />
            <VoiceRecorder onTranscriptionComplete={handleTranscriptionComplete} />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <MedicalNotes 
                transcribedText={transcribedText} 
                onGeneratePrescription={handleGeneratePrescription}
              />
              <PrescriptionGenerator 
                notesContent={notesForPrescription}
                patientName={currentPatient.name}
                patientId={currentPatient.id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
