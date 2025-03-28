
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, Activity, Calendar } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Time Saved Today",
      value: "1hr 45m",
      change: "+15m",
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Patient Records",
      value: "24",
      change: "+3",
      icon: FileText,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Prescriptions",
      value: "18",
      change: "+2",
      icon: Activity,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Appointments",
      value: "8",
      change: "Today",
      icon: Calendar,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className="flex items-center p-6">
            <div className={`mr-4 rounded-full p-2 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-bold">{stat.value}</h4>
                <span className="text-xs font-medium text-green-600">{stat.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
