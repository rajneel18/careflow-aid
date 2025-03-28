
import { Home, ClipboardList, Users, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setActive(path);
    navigate(`/${path === "dashboard" ? "" : path}`);
  };

  const NavItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-3",
        active === value && "bg-primary/10 text-primary"
      )}
      onClick={() => handleNavigation(value)}
    >
      <Icon className="h-5 w-5" />
      <span className="hidden md:inline">{label}</span>
    </Button>
  );

  return (
    <div className="flex h-full">
      {/* Desktop Navigation */}
      <div className="hidden w-[220px] flex-col border-r bg-card p-4 md:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            CF
          </div>
          <h2 className="text-xl font-bold">CareFlow AI</h2>
        </div>
        <div className="flex flex-col gap-1">
          <NavItem icon={Home} label="Dashboard" value="dashboard" />
          <NavItem icon={ClipboardList} label="Patient Records" value="records" />
          <NavItem icon={Users} label="Patients" value="patients" />
          <NavItem icon={Settings} label="Settings" value="settings" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex w-full items-center justify-between border-b bg-card p-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            CF
          </div>
          <h2 className="text-xl font-bold">CareFlow AI</h2>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0">
            <div className="flex flex-col p-4">
              <div className="mb-8 flex items-center gap-2 px-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                  CF
                </div>
                <h2 className="text-xl font-bold">CareFlow AI</h2>
              </div>
              <div className="flex flex-col gap-1">
                <NavItem icon={Home} label="Dashboard" value="dashboard" />
                <NavItem icon={ClipboardList} label="Patient Records" value="records" />
                <NavItem icon={Users} label="Patients" value="patients" />
                <NavItem icon={Settings} label="Settings" value="settings" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
