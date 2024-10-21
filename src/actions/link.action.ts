"use server";

import {
  ICreateLink,
  IDeleteLinkPermanent,
  IUpdateLinkArchivedAt,
  IUpdateLinkBody,
  IUpdateLinkDeletedAt,
  IUpdateLinkFavoritedAt,
  IGetCategoryName,
  ILink,
  IName
} from "@/interfaces/link.interface";
import prismadb from "@/lib/prismaDb";
import { LinkType } from "@/types/link.type";
import { revalidatePath } from "next/cache";

export const createLinkAction = async ({
  title,
  userId,
  categoryId,
  description,
  company_name,
  company_logo,
  screenshot,
  url,
  path,
}: ICreateLink) => {
  try {
    const link = await prismadb.link.create({
      data: {
        title,
        userId,
        categoryId,
        description,
        company_name,
        company_logo,
        screenshot,
        url,
      },
    });

    return { data: link, message: "Link created successfully." };
  } catch (error) {
    console.info(["[ERROR_CREATE_POST_ACTION]"], error);

    return { data: null, message: "Something went wrong." };
  } finally {
    revalidatePath(path);
  }
};

export const updateLinkBodyAction = async ({
  id,
  title,
  userId,
  categoryId,
  description,
  company_name,
  company_logo,
  screenshot,
  path,
}: IUpdateLinkBody) => {
  try {
    const link = await prismadb.link.update({
      where: { id },
      data: {
        title,
        userId,
        categoryId,
        description,
        company_name,
        company_logo,
        screenshot,
      },
    });

    return {
      data: link,
      message: "Link updated successfully.",
    };
  } catch (error) {
    console.info("[ERROR_UPDATE_POST_BODY_ACTION]", error);

    return {
      data: null,
      message: "Something went wrong.",
    };
  } finally {
    revalidatePath(path);
  }
};

export const updateLinkDeletedAtAction = async ({
  linkId,
  path,
}: IUpdateLinkDeletedAt) => {
  try {
    const post = await prismadb.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!post) {
      return {
        data: null,
        message: "Link not found.",
      };
    }

    if (post.deletedAt !== null) {
      await prismadb.link.update({
        where: {
          id: post.id,
        },
        data: {
          deletedAt: null,
        },
      });

      return {
        data: {
          postId: post.id,
          categoryId: post.categoryId,
        },
        message: "Link undeleted successfully.",
      };
    }

    await prismadb.link.update({
      where: {
        id: post.id,
      },
      data: {
        deletedAt: new Date(),
        archivedAt: null,
        favoritedAt: null,
      },
    });

    return {
      data: null,
      message: "LInk deleted successfully.",
    };
  } catch (error) {
    console.info("[ERROR_UPDATED_POST_DELETED_AT_ACTION]", error);

    return {
      data: null,
      message: "Something went wrong.",
    };
  } finally {
    revalidatePath(path);
  }
};

export const updatePostFavoritedAtAction = async ({
  linkId,
  path,
}: IUpdateLinkFavoritedAt) => {
  try {
    const post = await prismadb.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!post) {
      return {
        data: null,
        message: "Post not found.",
      };
    }

    if (post.favoritedAt !== null) {
      await prismadb.link.update({
        where: {
          id: post.id,
        },
        data: {
          favoritedAt: null,
        },
      });

      return {
        data: null,
        message: "Link unfavorited successfully.",
      };
    }

    await prismadb.link.update({
      where: {
        id: post.id,
      },
      data: {
        archivedAt: null,
        favoritedAt: new Date(),
      },
    });

    return {
      data: null,
      message: "Post favorited successfully.",
    };
  } catch (error) {
    console.info("[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]", error);

    return {
      data: null,
      message: "Something went wrong.",
    };
  } finally {
    revalidatePath(path);
  }
};

export const updateLinkArchivedAtAction = async ({
  linkId,
  path,
}: IUpdateLinkArchivedAt) => {
  try {
    const post = await prismadb.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!post) {
      return {
        data: null,
        message: "Post not found.",
      };
    }

    if (post.archivedAt !== null) {
      await prismadb.link.update({
        where: {
          id: post.id,
        },
        data: {
          archivedAt: null,
        },
      });

      return {
        data: {
          postId: post.id,
          categoryId: post.categoryId,
        },
        message: "Link unarchived successfully.",
      };
    }

    await prismadb.link.update({
      where: {
        id: post.id,
      },
      data: {
        archivedAt: new Date(),
        favoritedAt: null,
      },
    });

    return {
      data: { linkId: post.id },
      message: "Link archived successfully.",
    };
  } catch (error) {
    console.info("[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]", error);

    return {
      data: null,
      message: "Something went wrong.",
    };
  } finally {
    revalidatePath(path);
  }
};

export const deleteLinkPermanentAction = async ({
  linkId,
  path,
}: IDeleteLinkPermanent) => {
  try {
    const post = await prismadb.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!post) {
      return {
        data: null,
        message: "Post not found.",
      };
    }

    

    await prismadb.link.delete({
      where: {
        id: post.id,
      },
    });

    return {
      data: null,
      message: "Post deleted permanently.",
    };
  } catch (error) {
    console.info("[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]", error);

    return {
      data: null,
      message: "Something went wrong.",
    };
  } finally {
    revalidatePath(path);
  }
};

export const getLinks = async (userId: string, path: string) => {
  try {
    const links = await prismadb.link.findMany({
      where: {
        userId,
      },
    });

    return { data: links, message: "Links fetched successfully." };
  } catch (error) {
    console.info(["[ERROR_CREATE_POST_ACTION]"], error);

    return { data: null, message: "Something went wrong." };
  } finally {
    revalidatePath(path);
  }
};
  
export const getCategoryName = async ({
  categoryId,
  path,
}: IGetCategoryName) => {
  try {
    const post = await prismadb.category.findUnique({
      where: {
        category_id: categoryId,
      },
    });

    
    if (post) {
      return {
        data: post.category_name,
        message: "Category not found.",
      };
    }else {
      return {
        data: null,
        message: "Category not found.",
      };
    }

  } catch (error) {
    console.info("[ERROR_UPDATED_POST_FAVORITED_AT_ACTION]", error);

    return {
      data: null,
      message: "Something went wrong.",
    };
  } finally {
    revalidatePath(path);
  }
};


export const getLink = async ({
  id
}: ILink) => {
  
  const link = await prismadb.link.findUnique({
    where: {
      id: id,
    },
    include:{
      category:true
    }
  });

  return link;
  
};

export const getLikeCount = async (id:string) => {
  const count = await prismadb.linkVotesUp.count({
    where: {
      LinkId: id,
    }
  });

  return count;
  
};

export const getDislikeCount = async (id:string) => {
  const count = await prismadb.linkVotesDown.count({
    where: {
      LinkId: id,
    }
  });

  return count;
  
};

export const getFeatured = async () => {
  const featured: LinkType[] = await prismadb.link.findMany({
    where: {
      approved: true,
      featured: true,
    },
    include: {
      category: {
        select: {
          category_name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return featured;
};


export const getIdByTitle = async ({
  name
}: IName) => {
  
  const post = await prismadb.link.findFirst({
    where: {
      title: name.toLowerCase(),
    },
    
  });

  if (post) {
    return {
      data: post.id,
      message: "Link found.",
    };
  }else {
    return {
      data: null,
      message: "Link not found.",
    };
  }
  
};


export const getCategoryIdByName = async ({
  name
}: IName) => {
  
  const category = await prismadb.category.findFirst({
    where: {
      category_name: name.toLowerCase(),
    },
    
  });

  if (category) {
    return {
      data: category.category_id,
      message: "Category found.",
    };
  }else {
    return {
      data: null,
      message: "Category not found.",
    };
  }
  
};