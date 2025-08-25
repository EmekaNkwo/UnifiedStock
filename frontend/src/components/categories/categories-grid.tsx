import { CategoryCard } from "./category-card";
import { CategoryResponseDtoWithoutCreatedBy } from "@/redux/services/category-api";

interface CategoriesGridProps {
  categories: CategoryResponseDtoWithoutCreatedBy[];
  onEdit: () => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

export function CategoriesGrid({
  categories,
  onEdit,
  onDelete,
  onToggleStatus,
}: CategoriesGridProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No categories found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
