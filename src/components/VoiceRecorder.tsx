
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
}

const VoiceRecorder = ({ onTranscriptionComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const startRecording = () => {
    setIsRecording(true);
    intervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    toast({
      title: "Recording started",
      description: "Speak clearly into your microphone",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setRecordingTime(0);
      
      // Sample transcription based on recordingTime to simulate different lengths of recording
      const sampleTranscriptions = [
        "Patient presents with symptoms of seasonal allergies including nasal congestion, itchy eyes, and occasional sneezing. No fever present. Patient has a history of mild asthma but reports no recent asthma attacks.",
        "Patient reports persistent headache for the past 3 days, pain is described as throbbing and located primarily in the frontal region. Pain level rated as 6/10. No visual disturbances or nausea. Patient has been taking over-the-counter ibuprofen with minimal relief.",
        "Follow-up appointment for diabetes management. Glucose levels have been well-controlled with current medication regimen. Patient reports consistent exercise routine and dietary compliance. No episodes of hypoglycemia in the past month."
      ];
      
      const transcriptionIndex = Math.min(Math.floor(recordingTime / 5), 2);
      onTranscriptionComplete(sampleTranscriptions[transcriptionIndex]);
      
      toast({
        title: "Transcription complete",
        description: "Your recording has been processed successfully",
      });
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-lg font-semibold">Voice Documentation</div>
          
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/20 bg-primary/10">
            {isProcessing ? (
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            ) : (
              <div className={`relative flex h-16 w-16 items-center justify-center rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}>
                {isRecording ? (
                  <Square className="h-6 w-6 text-white" />
                ) : (
                  <Mic className="h-8 w-8 text-white" />
                )}
                {isRecording && (
                  <div className="absolute -bottom-8 text-sm font-medium">
                    {formatTime(recordingTime)}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {isProcessing ? "Processing your recording..." : isRecording ? "Recording in progress" : "Click to start recording patient notes"}
          </div>
          
          <Button 
            className="mt-4 px-8" 
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
