import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Experience } from '@/lib/types';

interface ExperienceFormModalProps {
  open: boolean;
  onClose: () => void;
  experience?: Experience | null;
  onSave: (experience: Partial<Experience>) => void;
}

export default function ExperienceFormModal({ open, onClose, experience, onSave }: ExperienceFormModalProps) {
  const [formData, setFormData] = useState({
    company: experience?.company || '',
    role: experience?.role || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    current: experience?.current || false,
    description: experience?.description || '',
    techStack: experience?.techStack?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company.trim() || !formData.role.trim()) {
      toast({ title: 'Error', description: 'Company and role are required', variant: 'destructive' });
      return;
    }

    onSave({
      ...formData,
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
      endDate: formData.current ? undefined : formData.endDate,
    });
    
    toast({ title: experience ? 'Experience Updated' : 'Experience Added', description: `${formData.role} at ${formData.company} has been saved.` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {experience ? 'Edit Experience' : 'Add New Experience'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company Name *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="E.g., TechCorp Solutions"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Job Title / Role *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="E.g., Senior Full-Stack Developer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) => setFormData({ ...formData, current: !!checked, endDate: '' })}
            />
            <Label htmlFor="current" className="cursor-pointer">I currently work here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your responsibilities and achievements..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Technologies Used (comma-separated)</Label>
            <Input
              id="techStack"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="React, Node.js, AWS, etc."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {experience ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
