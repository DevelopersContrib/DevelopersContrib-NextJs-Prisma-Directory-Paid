export type LinkType = {
  id: string;
  title: string;
  description: string;
  userId: string;
  categoryId: string;
  company_name: string;
  company_logo: string | null;
  screenshot: string | null;
  url: string;
  approved: boolean;
  featured: boolean;
  from_vnoc: boolean;
  approved_by: string | null;

  category: CategoryT;

  archivedAt: Date | null;
  deletedAt: Date | null;
  favoritedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;

  countLike?: number;
  countClick?: number;
  countUnlike?: number;
};

export type CategoryT = {
  category_name: string;
};
