import { useState } from 'react';
import { User, GraduationCap, MapPin, Phone, Mail, Github, Linkedin, Globe, Code2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ProfileFAB() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 bg-primary/90 backdrop-blur-sm border border-primary/20"
          aria-label="Author Profile"
        >
          <User className="h-6 w-6 text-primary-foreground" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-lg border-primary/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Developer Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <User className="h-4 w-4 text-primary shrink-0" />
                <div className="grid">
                  <span className="font-medium">Name</span>
                  <span className="text-muted-foreground">Hari Krishna Anem</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                <div className="grid">
                  <span className="font-medium">Education</span>
                  <span className="text-muted-foreground">B.Tech (CSIT)</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <div className="grid">
                  <span className="font-medium">Location</span>
                  <span className="text-muted-foreground">Hyderabad, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Details
            </h3>
            <div className="grid gap-3 text-sm">
              <a href="tel:+919885699666" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors group">
                <Phone className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <div className="grid">
                  <span className="font-medium">Phone</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">+91 9885699666</span>
                </div>
              </a>
              <a href="mailto:anemharikrishna@gmail.com" className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors group">
                <Mail className="h-4 w-4 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <div className="grid">
                  <span className="font-medium">Email</span>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">anemharikrishna@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Social & Links
            </h3>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/HariKrishna-9885699666" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
              <a href="https://linkedin.com/in/anemharikrishna" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
              <a href="https://harikrishna.is-a-good.dev" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary">
                  <User className="h-4 w-4" />
                  Portfolio
                </Button>
              </a>
              <a href="https://hashnode.com/@HariKrishna-9885699666" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary">
                  <Code2 className="h-4 w-4" />
                  Blog
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
