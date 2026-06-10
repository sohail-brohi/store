import { getReviews, getProducts } from "@/lib/firestore";
import { ReviewActions } from "./ReviewActions";

export const metadata = { title: "Manage Reviews" };
export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  let reviews: Awaited<ReturnType<typeof getReviews>> = [];
  let productMap: Record<string, string> = {};
  try {
    reviews = await getReviews(undefined, false);
    const products = await getProducts();
    productMap = Object.fromEntries(products.map((p) => [p.id, p.name]));
  } catch {
    reviews = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Reviews</h1>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-white/50">No reviews yet</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-white/10 p-6 light:border-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-white light:text-black">
                    {review.userName} · {"★".repeat(review.rating)}
                  </p>
                  <p className="text-sm text-gold">
                    {productMap[review.productId] || "Unknown Product"}
                  </p>
                  <p className="mt-2 text-sm text-white/70">{review.comment}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      review.approved
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                  {!review.approved && (
                    <ReviewActions reviewId={review.id} productId={review.productId} />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
