import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTIONS } from "@/lib/firestore";

export const metadata = { title: "Discount Codes" };
export const dynamic = "force-dynamic";

export default async function AdminDiscountsPage() {
  let codes: Array<{
    id: string;
    code: string;
    type: string;
    value: number;
    usedCount: number;
    maxUses?: number;
    active: boolean;
  }> = [];

  try {
    const snap = await getDocs(collection(db, COLLECTIONS.discountCodes));
    codes = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as typeof codes;
  } catch {
    codes = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Discount Codes</h1>
      <div className="overflow-x-auto rounded-lg border border-white/10 light:border-black/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-white/50">Code</th>
              <th className="px-4 py-3 text-left text-white/50">Type</th>
              <th className="px-4 py-3 text-left text-white/50">Value</th>
              <th className="px-4 py-3 text-left text-white/50">Used</th>
              <th className="px-4 py-3 text-left text-white/50">Status</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id} className="border-b border-white/5">
                <td className="px-4 py-3 font-mono text-gold">{code.code}</td>
                <td className="px-4 py-3 capitalize text-white/70">{code.type}</td>
                <td className="px-4 py-3 text-white">
                  {code.type === "percentage" ? `${code.value}%` : `PKR ${code.value}`}
                </td>
                <td className="px-4 py-3 text-white/70">
                  {code.usedCount}
                  {code.maxUses ? ` / ${code.maxUses}` : ""}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      code.active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {code.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
