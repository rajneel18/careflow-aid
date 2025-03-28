import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { PatientDialog } from "@/components/PatientDialog";

const Patients = () => {
  const [patients, setPatients] = useState([
    {
      id: "PT-12345",
      name: "Michael Anderson",
      age: 42,
      gender: "Male",
      email: "michael.a@example.com",
      phone: "(555) 123-4567",
      lastVisit: "Today",
      status: "Active",
      bloodType: "O+",
      allergies: ["Penicillin", "Peanuts"],
      conditions: ["Hypertension", "Seasonal Allergies"],
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
        { name: "Cetirizine", dosage: "10mg", frequency: "Once daily as needed" }
      ],
      vitals: {
        bp: "125/82",
        heartRate: "72",
        temp: "98.6",
        weight: "185 lbs",
        height: "5'11\""
      },
      notes: "Patient managing hypertension well with current medication regimen. Seasonal allergies typically occur in spring and fall."
    },
    {
      id: "PT-12346",
      name: "Sarah Johnson",
      age: 35,
      gender: "Female",
      email: "sarahj@example.com",
      phone: "(555) 987-6543",
      lastVisit: "Yesterday",
      status: "Completed",
      bloodType: "A+",
      allergies: ["Sulfa drugs"],
      conditions: ["Migraine", "Anxiety"],
      medications: [
        { name: "Sumatriptan", dosage: "50mg", frequency: "As needed for migraine" },
        { name: "Sertraline", dosage: "25mg", frequency: "Once daily" }
      ],
      vitals: {
        bp: "118/75",
        heartRate: "68",
        temp: "98.2",
        weight: "145 lbs",
        height: "5'6\""
      },
      notes: "Patient reports reduction in migraine frequency with current preventative measures. Anxiety symptoms well-managed."
    },
    {
      id: "PT-12347",
      name: "Robert Williams",
      age: 58,
      gender: "Male",
      email: "rwilliams@example.com",
      phone: "(555) 765-4321",
      lastVisit: "2 days ago",
      status: "Review",
      bloodType: "B-",
      allergies: [],
      conditions: ["Type 2 Diabetes", "Osteoarthritis"],
      medications: [
        { name: "Metformin", dosage: "1000mg", frequency: "Twice daily" },
        { name: "Acetaminophen", dosage: "500mg", frequency: "As needed for pain" }
      ],
      vitals: {
        bp: "138/85",
        heartRate: "75",
        temp: "98.8",
        weight: "210 lbs",
        height: "5'10\""
      },
      notes: "Blood glucose levels trending higher than target range. Consider adjusting medication regimen. Scheduled for follow-up lab work."
    },
    {
      id: "PT-12348",
      name: "Jennifer Lopez",
      age: 29,
      gender: "Female",
      email: "jenniferl@example.com",
      phone: "(555) 234-5678",
      lastVisit: "1 week ago",
      status: "Completed",
      bloodType: "AB+",
      allergies: ["Latex"],
      conditions: ["Asthma"],
      medications: [
        { name: "Albuterol", dosage: "90mcg", frequency: "As needed for shortness of breath" },
        { name: "Fluticasone", dosage: "220mcg", frequency: "2 inhalations twice daily" }
      ],
      vitals: {
        bp: "120/78",
        heartRate: "70",
        temp: "98.4",
        weight: "135 lbs",
        height: "5'4\""
      },
      notes: "Asthma well-controlled with current management plan. No exacerbations reported in the past 3 months."
    },
    {
      id: "PT-12349",
      name: "David Miller",
      age: 45,
      gender: "Male",
      email: "dmiller@example.com",
      phone: "(555) 876-5432",
      lastVisit: "2 weeks ago",
      status: "Active",
      bloodType: "O-",
      allergies: ["Ibuprofen"],
      conditions: ["GERD", "Insomnia"],
      medications: [
        { name: "Omeprazole", dosage: "20mg", frequency: "Once daily" },
        { name: "Zolpidem", dosage: "5mg", frequency: "As needed for sleep" }
      ],
      vitals: {
        bp: "130/80",
        heartRate: "72",
        temp: "98.6",
        weight: "190 lbs",
        height: "6'0\""
      },
      notes: "GERD symptoms improving with medication and dietary changes. Sleep issues persist despite current interventions."
    },
  ]);

  const [selectedPatient, setSelectedPatient] = useState<string | null>("PT-12345");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = (newPatient: any) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
    setSelectedPatient(newPatient.id);
  };

  const handleStartVisit = () => {
    toast.success("Visit started successfully");
    
    if (selectedPatient) {
      setPatients(prevPatients => 
        prevPatients.map(patient => 
          patient.id === selectedPatient 
            ? { ...patient, status: "Active", lastVisit: "Today" } 
            : patient
        )
      );
    }
  };

  const handleFilter = () => {
    toast.info("Filtering options will be available in the next version");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Review":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Patients</h1>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search patients..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={handleFilter}>
              <Filter className="h-4 w-4" />
            </Button>
            <PatientDialog onAddPatient={handleAddPatient} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="mb-2 text-sm font-medium">Patient List</div>
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-2 pr-4">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <div 
                        key={patient.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-colors hover:bg-muted/50 ${selectedPatient === patient.id ? 'bg-primary/10 border-primary/20' : ''}`}
                        onClick={() => setSelectedPatient(patient.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(patient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{patient.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{patient.id}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{patient.age} yrs</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getStatusColor(patient.status)} border-none font-normal`}>
                          {patient.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-sm text-muted-foreground">
                      No patients found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          {selectedPatientData && (
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(selectedPatientData.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPatientData.name}</h2>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedPatientData.age} years old</span>
                        <span>•</span>
                        <span>{selectedPatientData.gender}</span>
                        <span>•</span>
                        <Badge variant="outline" className={`${getStatusColor(selectedPatientData.status)} border-none font-normal`}>
                          {selectedPatientData.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleStartVisit}>Start Visit</Button>
                </div>
                
                <Tabs defaultValue="overview">
                  <TabsList className="mb-6 w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="tests">Test Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Contact Information</h3>
                          <div className="rounded-md border p-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <div className="text-muted-foreground">Email</div>
                                <div>{selectedPatientData.email}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Phone</div>
                                <div>{selectedPatientData.phone}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Last Visit</div>
                                <div>{selectedPatientData.lastVisit}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Blood Type</div>
                                <div>{selectedPatientData.bloodType}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Vital Signs</h3>
                          <div className="rounded-md border p-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <div className="text-muted-foreground">Blood Pressure</div>
                                <div>{selectedPatientData.vitals.bp}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Heart Rate</div>
                                <div>{selectedPatientData.vitals.heartRate} bpm</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Temperature</div>
                                <div>{selectedPatientData.vitals.temp}°F</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Weight</div>
                                <div>{selectedPatientData.vitals.weight}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Height</div>
                                <div>{selectedPatientData.vitals.height}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Conditions</h3>
                          <div className="rounded-md border p-4">
                            <div className="flex flex-wrap gap-2">
                              {selectedPatientData.conditions.map((condition, i) => (
                                <Badge key={i} variant="outline" className="border-accent/50 bg-accent/10 text-accent-foreground font-normal">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Allergies</h3>
                          <div className="rounded-md border p-4">
                            <div className="flex flex-wrap gap-2">
                              {selectedPatientData.allergies.length ? (
                                selectedPatientData.allergies.map((allergy, i) => (
                                  <Badge key={i} variant="secondary" className="font-normal">
                                    {allergy}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground">No known allergies</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="mb-2 text-lg font-medium">Current Medications</h3>
                          <div className="rounded-md border p-4">
                            <div className="space-y-3">
                              {selectedPatientData.medications.map((med, i) => (
                                <div key={i} className="flex flex-col">
                                  <div className="font-medium">{med.name}</div>
                                  <div className="text-sm text-muted-foreground">{med.dosage} - {med.frequency}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="mb-2 text-lg font-medium">Clinical Notes</h3>
                      <div className="rounded-md border p-4">
                        <p className="text-sm">{selectedPatientData.notes}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="mt-0">
                    <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
                      <p className="text-center text-sm text-muted-foreground">
                        Patient timeline will be available in the next version.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="medications" className="mt-0">
                    <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
                      <p className="text-center text-sm text-muted-foreground">
                        Detailed medication history will be available in the next version.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tests" className="mt-0">
                    <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
                      <p className="text-center text-sm text-muted-foreground">
                        Test results will be available in the next version.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Patients;
