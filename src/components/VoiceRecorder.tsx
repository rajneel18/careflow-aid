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

  // New refs for media recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const { toast } = useToast();

  const startRecording = async () => {
    setIsRecording(true);
    intervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    // New code to get access to the audio stream and start recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let options = { mimeType: "audio/wav" };
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, options);
      } catch {
        recorder = new MediaRecorder(stream);
      }
      recordedChunksRef.current = [];
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      });
      recorder.addEventListener("stop", () => {
        // Combine chunks into a WAV file Blob
        const blob = new Blob(recordedChunksRef.current, { type: "audio/wav" });
        
        // Create a temporary download URL for triggering download
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = downloadUrl;
        a.download = "recording.wav";
        document.body.appendChild(a);
        a.click();
        
        // Convert blob to a data URL for persistent storage/display
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          // Update localStorage with the new recording details
          const recordingObject = { name: "recording.wav", url: dataUrl };
          const storedRecordings = JSON.parse(localStorage.getItem("recordings") || "[]");
          storedRecordings.push(recordingObject);
          localStorage.setItem("recordings", JSON.stringify(storedRecordings));
          window.dispatchEvent(new Event("recording-added"));
          
          // Revoke the temporary download URL
          URL.revokeObjectURL(downloadUrl);
          
          // Optional: Upload the recording to the server
          const formData = new FormData();
          formData.append("file", blob, "recording.wav");
          fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Upload successful:", data);
              // Update localStorage if a permanent URL is returned
              if (data.url) {
                const updatedRecordings = JSON.parse(localStorage.getItem("recordings") || "[]");
                updatedRecordings[updatedRecordings.length - 1].url = data.url;
                localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
                window.dispatchEvent(new Event("recording-added"));
              }
            })
            .catch((err) => console.error("Upload failed:", err));
        };
        reader.readAsDataURL(blob);
      });
      mediaRecorderRef.current = recorder;
      recorder.start();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast({
        title: "Error",
        description: "Unable to access microphone",
      });
      setIsRecording(false);
    }

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
    // Stop the media recorder so it triggers the stop event
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    
    setIsProcessing(true);
    
    // Simulate processing delay and transcription
    setTimeout(() => {
      setIsProcessing(false);
      setRecordingTime(0);
      
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
