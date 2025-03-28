
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    bloodType: string;
    allergies: string[];
    conditions: string[];
  };
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-bold">{patient.name}</h3>
              <Badge variant="outline" className="font-normal">
                ID: {patient.id}
              </Badge>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Age:</span>
                <span>{patient.age} years</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Gender:</span>
                <span>{patient.gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Blood:</span>
                <span>{patient.bloodType}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="mb-1 text-sm font-medium">Allergies:</div>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.length ? (
                  patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="secondary" className="font-normal">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">None reported</span>
                )}
              </div>
            </div>

            <div className="mt-3">
              <div className="mb-1 text-sm font-medium">Conditions:</div>
              <div className="flex flex-wrap gap-1">
                {patient.conditions.map((condition, i) => (
                  <Badge key={i} variant="outline" className="border-accent/50 bg-accent/10 text-accent-foreground font-normal">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
