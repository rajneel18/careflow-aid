
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [voiceModel, setVoiceModel] = useState("enhanced");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Navbar />
      
      <main className="flex-1 p-4 md:p-6">
        <h1 className="mb-6 text-2xl font-bold">Settings</h1>
        
        <Tabs defaultValue="account">
          <TabsList className="mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integration">EHR Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Profile Information</h3>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-white">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="npi">NPI Number</Label>
                    <Input id="npi" defaultValue="1234567890" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Select defaultValue="internal">
                      <SelectTrigger id="specialty">
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal Medicine</SelectItem>
                        <SelectItem value="family">Family Practice</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Security</h3>
                <CardDescription>Update your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">AI Configuration</h3>
                <CardDescription>Customize how AI assists your workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automatic Transcription</div>
                    <div className="text-sm text-muted-foreground">Automatically convert your voice to text</div>
                  </div>
                  <Switch
                    checked={autoTranscribe}
                    onCheckedChange={setAutoTranscribe}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">AI Enhancement</div>
                    <div className="text-sm text-muted-foreground">Automatically structure and enhance your notes</div>
                  </div>
                  <Switch
                    checked={autoEnhance}
                    onCheckedChange={setAutoEnhance}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voiceModel">Speech Recognition Model</Label>
                  <Select
                    value={voiceModel}
                    onValueChange={setVoiceModel}
                  >
                    <SelectTrigger id="voiceModel">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="enhanced">Enhanced (Medical)</SelectItem>
                      <SelectItem value="premium">Premium (Specialty-specific)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialtyTerms">Custom Medical Terms</Label>
                  <Input id="specialtyTerms" placeholder="Add custom medical terminology separated by commas" />
                  <div className="text-xs text-muted-foreground">Add specialty-specific terms to improve transcription accuracy</div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save AI Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Notifications</div>
                    <div className="text-sm text-muted-foreground">Receive system notifications</div>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Patient Appointment Reminders</div>
                    <div className="text-sm text-muted-foreground">Get notified before upcoming appointments</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Prescription Alerts</div>
                    <div className="text-sm text-muted-foreground">Alerts about potential medication interactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-muted-foreground">Be notified about new features and updates</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Notification Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">EHR Integration</h3>
                <CardDescription>Connect to your Electronic Health Record system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="ehrSystem">EHR System</Label>
                  <Select defaultValue="epic">
                    <SelectTrigger id="ehrSystem">
                      <SelectValue placeholder="Select EHR system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="cerner">Cerner</SelectItem>
                      <SelectItem value="allscripts">Allscripts</SelectItem>
                      <SelectItem value="meditech">Meditech</SelectItem>
                      <SelectItem value="nextgen">NextGen</SelectItem>
                      <SelectItem value="athena">Athenahealth</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" type="password" value="••••••••••••••••••••••" readOnly />
                  <div className="text-xs text-muted-foreground">Contact your IT administrator for integration details</div>
                </div>
                
                <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
                  <div className="font-medium">Integration Status: Connected</div>
                  <div>Last synchronized: Today at 08:45 AM</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Automatic Sync</div>
                    <div className="text-sm text-muted-foreground">Automatically sync records with EHR</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Test Connection</Button>
                  <Button onClick={handleSave}>Save Integration Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
