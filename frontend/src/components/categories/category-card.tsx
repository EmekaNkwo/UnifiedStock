import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Category } from "./types";
import { Edit, Trash2 } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
  onToggleStatus,
}: CategoryCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{category.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {category.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {category.productCount} products
            </Badge>
            <Badge variant={category.isActive ? "default" : "secondary"}>
              {category.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(category.id)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(category.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Updated {new Date(category.updatedAt).toLocaleDateString()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleStatus(category.id, !category.isActive)}
        >
          {category.isActive ? "Deactivate" : "Activate"}
        </Button>
      </div>
    </div>
  );
}
