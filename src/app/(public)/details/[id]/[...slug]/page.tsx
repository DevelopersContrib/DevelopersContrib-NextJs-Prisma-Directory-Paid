import React from "react";
import Details from "../../components/Details";
import { LinkType } from "@/types/link.type";
import { getLink,getFeatured,getDislikeCount,getLikeCount } from "@/actions/link.action";
import { getDomain, getData } from "@/lib/data";
import { clickAction, countClicksAction } from "@/actions/click.action";

export async function generateMetadata({ params }: { params: { id: string } }) {
  // 2. You can access the 'id' from 'params' here, similar to how you're doing it in the page component.
  const domain = getDomain();
  const c = await getData();

  const linkType = await getLink({ id: params.id }); // This is where you use the 'id'
  const link = linkType as LinkType;

  // 3. Use the 'id' for dynamic title or description
  return {
    title: `${link.title} - ${link.title}.com`, // Or use the fetched domain info if it's needed for the title
    description: link.description,
  };
}

const page = async({ params }: { params: { id: string} }) => {

  const res = await clickAction({
    LinkId: params.id,
    path: "/",
  });
  
  const linkType = await getLink({id: params.id,});
  const link = linkType as LinkType;

  const c = await getData();
  const domain = getDomain();
  
  const featuredLink = await getFeatured();
  const featured = featuredLink as LinkType[];


  const countLikes = await getLikeCount(params.id);
  const countDislikes = await getDislikeCount(params.id);

  return (
    <main>
      <Details data={c.data} domain={domain} link={link} featured={featured} countLikes={countLikes} countDislikes={countDislikes} />
    </main>
  );
};

export default page;
