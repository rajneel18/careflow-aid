
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const patientFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Age must be a positive number.",
  }),
  gender: z.string().min(1, {
    message: "Please select a gender.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  bloodType: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientDialogProps {
  onAddPatient: (patient: any) => void;
}

export function PatientDialog({ onAddPatient }: PatientDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      bloodType: "",
    },
  });

  function onSubmit(data: PatientFormValues) {
    // Generate a unique ID for the new patient
    const newPatient = {
      id: `PT-${Math.floor(10000 + Math.random() * 90000)}`,
      name: data.name,
      age: Number(data.age),
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      bloodType: data.bloodType || "Unknown",
      lastVisit: "New Patient",
      status: "Active",
      allergies: [],
      conditions: [],
      medications: [],
      vitals: {
        bp: "N/A",
        heartRate: "N/A",
        temp: "98.6",
        weight: "N/A",
        height: "N/A"
      },
      notes: "New patient record created."
    };

    onAddPatient(newPatient);
    toast.success("Patient added successfully");
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's details below to create a new patient record.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="Male/Female/Other" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bloodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Type</FormLabel>
                    <FormControl>
                      <Input placeholder="A+/B-/O+/AB+" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="patient@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Create Patient</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
