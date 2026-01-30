import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Skill } from '@/lib/types';

interface SkillFormModalProps {
  open: boolean;
  onClose: () => void;
  skill?: Skill | null;
  onSave: (skill: Partial<Skill>) => void;
}

export default function SkillFormModal({ open, onClose, skill, onSave }: SkillFormModalProps) {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    category: skill?.category || 'frontend',
    proficiency: skill?.proficiency || 80,
    visible: skill?.visible ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({ title: 'Error', description: 'Skill name is required', variant: 'destructive' });
      return;
    }

    onSave(formData);
    toast({ title: skill ? 'Skill Updated' : 'Skill Added', description: `"${formData.name}" has been saved.` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {skill ? 'Edit Skill' : 'Add New Skill'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="E.g., React, Node.js, Docker"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as Skill['category'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="ai">AI / ML</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Proficiency Level</Label>
              <span className="text-sm font-medium text-accent">{formData.proficiency}%</span>
            </div>
            <Slider
              value={[formData.proficiency]}
              onValueChange={([value]) => setFormData({ ...formData, proficiency: value })}
              max={100}
              min={1}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="visible"
              checked={formData.visible}
              onCheckedChange={(checked) => setFormData({ ...formData, visible: !!checked })}
            />
            <Label htmlFor="visible" className="cursor-pointer">Show on portfolio</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {skill ? 'Update Skill' : 'Add Skill'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
