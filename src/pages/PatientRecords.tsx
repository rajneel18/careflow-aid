
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ChevronLeft, ChevronRight, FileText, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const PatientRecords = () => {
  const navigate = useNavigate();

  // Sample patient records data
  const recentPatients = [
    { 
      id: "PT-12345", 
      name: "Michael Anderson", 
      lastVisit: "Today", 
      status: "Active",
      documents: 8,
      appointments: 2
    },
    { 
      id: "PT-12346", 
      name: "Sarah Johnson", 
      lastVisit: "Yesterday", 
      status: "Completed",
      documents: 12,
      appointments: 0
    },
    { 
      id: "PT-12347", 
      name: "Robert Williams", 
      lastVisit: "2 days ago", 
      status: "Review",
      documents: 5,
      appointments: 1
    },
    { 
      id: "PT-12348", 
      name: "Jennifer Lopez", 
      lastVisit: "1 week ago", 
      status: "Completed",
      documents: 9,
      appointments: 0
    },
    { 
      id: "PT-12349", 
      name: "David Miller", 
      lastVisit: "2 weeks ago", 
      status: "Active",
      documents: 4,
      appointments: 1
    },
  ];

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Patient Records</h1>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search patient records..." className="pl-9" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent Patients</TabsTrigger>
                <TabsTrigger value="all">All Records</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 pt-4 font-medium">Patient</th>
                    <th className="pb-3 pt-4 font-medium">Last Visit</th>
                    <th className="pb-3 pt-4 font-medium">Status</th>
                    <th className="pb-3 pt-4 font-medium">Documents</th>
                    <th className="pb-3 pt-4 font-medium">Actions</th>
                  </tr>
                </thead>
                
                <tbody>
                  {recentPatients.map((patient, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInitials(patient.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-xs text-muted-foreground">{patient.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="text-sm">{patient.lastVisit}</div>
                      </td>
                      <td className="py-3">
                        <Badge variant="outline" className={`${getStatusColor(patient.status)} border-none font-normal`}>
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-3">
                          <div className="flex items-center gap-1 text-sm">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                            {patient.documents}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            {patient.appointments}
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <Button size="sm" variant="ghost" onClick={() => navigate("/")}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm text-muted-foreground">
                Page 1 of 3
              </div>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PatientRecords;
