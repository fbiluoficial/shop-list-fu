import { useState } from "react";
import { Plus } from "lucide-react";

interface AddItemFormProps {
  onAdd: (name: string, category?: string, date?: string) => void;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), category.trim() || undefined, date || undefined);
      setName("");
      setCategory("");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 bg-background/50 border border-white/10 rounded px-4 py-2"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (optional)"
          className="md:w-48 bg-background/50 border border-white/10 rounded px-4 py-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="md:w-48 bg-background/50 border border-white/10 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded px-6 py-2 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
}