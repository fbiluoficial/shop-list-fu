import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShoppingListItemProps {
  id: string;
  name: string;
  category?: string;
  date?: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string, newCategory?: string, newDate?: string) => void;
}

export function ShoppingListItem({
  id,
  name,
  category,
  date,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: ShoppingListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDate, setEditedDate] = useState(date);

  const handleSave = () => {
    onEdit(id, editedName, editedCategory, editedDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="glass rounded-lg p-4 mb-2 flex flex-col gap-2">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="bg-background/50 border border-white/10 rounded px-2 py-1"
          placeholder="Item name"
        />
        <input
          type="text"
          value={editedCategory || ""}
          onChange={(e) => setEditedCategory(e.target.value)}
          className="bg-background/50 border border-white/10 rounded px-2 py-1"
          placeholder="Category (optional)"
        />
        <input
          type="date"
          value={editedDate || ""}
          onChange={(e) => setEditedDate(e.target.value)}
          className="bg-background/50 border border-white/10 rounded px-2 py-1"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Check size={20} />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-4 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onToggle(id)}
            className={cn(
              "w-6 h-6 rounded border transition-colors flex items-center justify-center",
              completed
                ? "bg-secondary border-secondary text-secondary-foreground"
                : "border-white/20 hover:border-white/40"
            )}
          >
            {completed && <Check size={16} />}
          </button>
          <div className="flex flex-col">
            <span className={cn("text-lg", completed && "line-through opacity-50")}>
              {name}
            </span>
            <div className="flex gap-2 text-sm text-white/60">
              {category && <span>{category}</span>}
              {date && <span>· {date}</span>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}