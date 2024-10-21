import ListPosts from "@/components/list-posts/list-posts";
import Main from "@/components/main/main";
import CreateNewNoteModal from "@/components/sidebar/create-new-note-modal";
import CreateNewListingModal from "@/components/sidebar/create-new-listing-modal";
import Sidebar from "@/components/sidebar/sidebar";
import { ICategoryWithLinks } from "@/interfaces/category.interface";
import { ILinkWithCategory } from "@/interfaces/link.interface";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import FolderType from "@/types/folder.type";
import PostType from "@/types/post.type";
import { LinkType } from "@/types/link.type";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDomain, getData } from "@/lib/data";
import PaymentType from "@/types/payment.type";
import CategoryType from "@/types/category.type";
import StripeWrapper from "@/components/checkout/StripeWrapper";

type SearchParams = {
  linkId?: string;
  categoryId?: string;
};

interface Checkout {
  params: { id: string };
}
const App: React.FC<Checkout> = async ({ params }) => {
  const session: SessionType = await getServerSession(authOptions);

  if (!session) redirect("/");

  const c = await getData();
  const domain = getDomain();

  const paymentAlreadyExists = await prismadb.payment.findFirst({
    where: {
      userId: session.user.userId,
    },
  });

  //if (paymentAlreadyExists) redirect("/dashboard");

  const categories: CategoryType[] = await prismadb.category.findMany({
    orderBy: {
      category_name: "asc",
    },
  });
  const recents: LinkType[] = await prismadb.link.findMany({
    where: {
      userId: session.user.userId,
      archivedAt: null,
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

  const pack = {
    id: 1,
    name: "Lifetime Membership",
    start_limit: 1,
    end_limit: 10,
    price: "9",
    userPlanId: 1,
  };

  return (
    <>
      <main className="flex">
        <Sidebar
          recents={recents}
          categories={categories}
          userId={session.user.userId}
          domain={domain}
          logo={c.data.logo}
        />
        {paymentAlreadyExists?<>
          <div className="p-[50px] flex flex-col gap-y-8 w-full">
            <div>
              <div className="bg-[#cfe2ff] p-8 border border-[#9ec5fe] text-[#052c65]">
                <h1 className="text-3xl mb-4">
                  Subscription Plan
                </h1>
    
                <p className="mb-4">
                You are currently subscribed to the <strong>$9 Lifetime Plan.</strong> This plan gives you <strong>unlimited link submissions</strong> with no additional fees.
                </p>
                <p className="mb-4">
                  <strong>Subscription Details:</strong>
                </p>
                <ol className="mb-4 ">
                  <li className="list-disc list-inside">
                    <strong>Plan Type:</strong>  Lifetime Access
                  </li>
                  <li className="list-disc list-inside">
                    <strong>Cost:</strong>  $9 (one-time payment)
                  </li>
                  <li className="list-disc list-inside">
                    <strong>Link Submissions:</strong>  Unlimited
                  </li>
                  <li className="list-disc list-inside">
                    <strong>Renewal:</strong> No renewal needed, lifetime access granted.
                  </li>
                </ol>
                <p className="mb-4">
                  If you’d like to upgrade or manage your subscription, please contact our support team for assistance. We will notify you of any new features or paid options as they become available.
                </p>
              </div>
            </div>
          </div>
        </>:<>
          <div className="p-[50px] flex flex-col gap-y-8 w-full">
            <div>
              <div className="bg-[#cfe2ff] p-8 border border-[#9ec5fe] text-[#052c65]">
                <h1 className="text-3xl mb-4">
                  Unlock Unlimited Link Posting for Just $9 – One-Time Payment!
                </h1>
                <p className="mb-4">
                  <strong>Why Go Unlimited?</strong>
                </p>
                <p className="mb-4">
                  For a one-time payment of just $9, you can unlock unlimited link submissions across our entire directory. Whether you're looking to promote multiple businesses, products, or services, this deal gives you lifetime access to our platform with no recurring fees.
                </p>
                <p className="mb-4">
                  <strong>What You Get for $9:</strong>
                </p>
                <ol className="mb-4 ">
                  <li className="list-disc list-inside">
                  Unlimited Link Submissions: Post as many links as you want without any restrictions. Whether you have one business or multiple projects, you're covered.
                  Lifetime Access: This is a one-time payment, and you’ll have access to post links forever. No hidden costs, no recurring fees.
                  </li>
                  <li className="list-disc list-inside">
                    SEO-Optimized Listings: Your links will benefit from SEO best practices, helping to improve visibility on search engines like Google.
                  </li>
                  <li className="list-disc list-inside">
                  Community Engagement: Get your listings upvoted by our community, helping your business stand out.
                  Instant Approval: Once approved, your links will be live immediately and visible to everyone.
                  </li>
                </ol>
                <p className="mb-4">
                  <strong>How It Works:</strong>
                </p>
                <ol className="mb-4 ">
                  <li className="list-disc list-inside">
                  Pay $9 for lifetime access.
                  </li>
                  <li className="list-disc list-inside">
                  Start posting unlimited links immediately.
                  </li>
                  <li className="list-disc list-inside">
                  Watch your business grow with our SEO-friendly and community-driven directory.
                  </li>
                </ol>
                <p className="mb-4">
                  <strong>Secure Payment Options</strong>
                </p>
                <p className="mb-4">
                We accept payments through Stripe.
                </p>
                <p className="mb-4">
                  <strong>Ready to Go Unlimited?</strong>
                </p>
                <p className="mb-4">
                Take your business to the next level with this limited-time offer. For just $9, you’ll never have to worry about link limits again. Start posting and promoting your business now!
                </p>
              </div>
            </div>
            <StripeWrapper
              id={params.id}
              pack={pack}
              userId={session.user.userId}
            />
          </div>
        </>}
      </main>
    </>
  );
};

export default App;
