import CategoryType from "@/types/category.type";
import { LinkType } from "@/types/link.type";

export interface ICreate {
  name: string;
  path: string;
  userId: string;
}

export interface ICategoryWithLinks extends CategoryType {
  links: LinkType[];
}

export interface ICategoryOption {
  [key: string]: string;
}
