export interface ICreateLink {
  title: string;
  userId: string;
  categoryId: string;
  description: string;
  company_name: string;
  company_logo: string;
  screenshot: string;
  url: string;
  path: string;
}

export interface IUpdateLinkBody {
  id: string;
  title: string;
  userId: string;
  categoryId: string;
  description: string;
  company_name: string;
  company_logo: string;
  screenshot: string;
  url: string;
  path: string;
}

export interface ILinkWithCategory {
  id: string;
  title: string;
  description: string;
  userId: string;
  categoryId: string;
  company_name: string;
  company_logo: string;
  screenshot: string;
  url: string;
  archivedAt: Date | null;
  deletedAt: Date | null;
  favoritedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  category: {
    name: string;
  };
}

export interface IUpdateLinkDeletedAt {
  linkId: string;
  path: string;
}

export interface IGetCategoryName {
  categoryId: string;
  path: string;
}

export interface ILink {
  id: string;
}

export interface IName {
  name: string;
}

export interface IUpdateLinkFavoritedAt extends IUpdateLinkDeletedAt {
  // ...
}

export interface IUpdateLinkArchivedAt extends IUpdateLinkDeletedAt {
  // ...
}

export interface IDeleteLinkPermanent extends IUpdateLinkDeletedAt {
  // ...
}
