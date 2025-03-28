import { useState, useEffect } from "react";

const AudioRecordings = () => {
  const [recordings, setRecordings] = useState([]);

  const loadRecordings = () => {
    const storedRecordings = JSON.parse(localStorage.getItem("recordings") || "[]");
    console.log("Loaded recordings:", storedRecordings);
    setRecordings(storedRecordings);
  };

  useEffect(() => {
    // Load recordings initially
    loadRecordings();
    // Set up event listener to update recordings when a new one is added
    window.addEventListener("recording-added", loadRecordings);
    return () => {
      window.removeEventListener("recording-added", loadRecordings);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Audio Recordings</h1>
      {recordings.length === 0 ? (
        <p>No recordings available.</p>
      ) : (
        <ul className="space-y-4">
          {recordings.map((recording: any, idx: number) => (
            <li key={idx} className="border rounded p-4">
              <p className="mb-2">{recording.name}</p>
              <audio controls src={recording.url} className="w-full">
                Your browser does not support the audio element.
              </audio>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AudioRecordings;
