import { useState, useEffect } from "react";
import { Search, Trash2 } from "lucide-react";
import { ShoppingListItem } from "@/components/ShoppingListItem";
import { AddItemForm } from "@/components/AddItemForm";
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Item {
  id: string;
  name: string;
  category?: string;
  date?: string;
  completed: boolean;
}

const STORAGE_KEY = "shopping-list-items";

const Index = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (name: string, category?: string, date?: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      name,
      category,
      date,
      completed: false,
    };
    setItems((prev) => [newItem, ...prev]);
    toast({
      title: "Item added",
      description: `${name} has been added to your list.`,
    });
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The item has been removed from your list.",
      variant: "destructive",
    });
  };

  const editItem = (id: string, newName: string, newCategory?: string, newDate?: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, name: newName, category: newCategory, date: newDate }
          : item
      )
    );
    toast({
      title: "Item updated",
      description: "The item has been updated successfully.",
    });
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.completed));
    toast({
      title: "Completed items cleared",
      description: "All completed items have been removed from your list.",
    });
  };

  const clearAll = () => {
    setItems([]);
    toast({
      title: "List cleared",
      description: "All items have been removed from your list.",
      variant: "destructive",
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary animate-glow">
            Lista de Compras Futurista
          </h1>
          <ThemeToggle />
        </div>

        <div className="glass rounded-lg p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full bg-background/50 border border-white/10 rounded pl-10 pr-4 py-2"
            />
          </div>
        </div>

        <AddItemForm onAdd={addItem} />

        <div className="mb-6">
          {filteredItems.map((item) => (
            <ShoppingListItem
              key={item.id}
              {...item}
              onToggle={toggleItem}
              onDelete={deleteItem}
              onEdit={editItem}
            />
          ))}
        </div>

        {items.length > 0 && (
          <div className="flex justify-end gap-4">
            <button
              onClick={clearCompleted}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors rounded px-4 py-2"
            >
              Clear Completed
            </button>
            <button
              onClick={clearAll}
              className="bg-destructive hover:bg-destructive/90 transition-colors rounded px-4 py-2 flex items-center gap-2"
            >
              <Trash2 size={20} />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;