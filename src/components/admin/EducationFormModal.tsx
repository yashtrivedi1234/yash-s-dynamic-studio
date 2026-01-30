import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Education } from '@/lib/types';

interface EducationFormModalProps {
  open: boolean;
  onClose: () => void;
  education?: Education | null;
  onSave: (education: Partial<Education>) => void;
}

export default function EducationFormModal({ open, onClose, education, onSave }: EducationFormModalProps) {
  const [formData, setFormData] = useState({
    degree: education?.degree || '',
    institution: education?.institution || '',
    location: education?.location || '',
    startYear: education?.startYear || '',
    endYear: education?.endYear || '',
    current: education?.current || false,
    description: education?.description || '',
    grade: education?.grade || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.degree.trim() || !formData.institution.trim()) {
      toast({ title: 'Error', description: 'Degree and institution are required', variant: 'destructive' });
      return;
    }

    onSave({
      ...formData,
      endYear: formData.current ? undefined : formData.endYear,
    });
    
    toast({ title: education ? 'Education Updated' : 'Education Added', description: `"${formData.degree}" has been saved.` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {education ? 'Edit Education' : 'Add New Education'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree / Program *</Label>
            <Input
              id="degree"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="E.g., Bachelor of Technology in Computer Science"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="institution">Institution *</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="E.g., ABC Institute of Technology"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="E.g., Lucknow, Uttar Pradesh"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startYear">Start Year</Label>
              <Input
                id="startYear"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="2018"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endYear">End Year</Label>
              <Input
                id="endYear"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                placeholder="2022"
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) => setFormData({ ...formData, current: !!checked, endYear: '' })}
            />
            <Label htmlFor="current" className="cursor-pointer">Currently studying here</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade / GPA</Label>
            <Input
              id="grade"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              placeholder="E.g., 8.5 CGPA or 92%"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Specialization, achievements, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {education ? 'Update Education' : 'Add Education'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
