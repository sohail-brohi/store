import { StaticPage } from "@/components/content/StaticPage";

export const metadata = { title: "Size Guide" };

const sizeTables = [
  {
    title: "Women's Clothing",
    headers: ["Size", "Bust (in)", "Waist (in)", "Hips (in)"],
    rows: [
      ["XS", "32", "24", "34"],
      ["S", "34", "26", "36"],
      ["M", "36", "28", "38"],
      ["L", "38", "30", "40"],
      ["XL", "40", "32", "42"],
    ],
  },
  {
    title: "Men's Clothing",
    headers: ["Size", "Chest (in)", "Waist (in)", "Hips (in)"],
    rows: [
      ["S", "36", "30", "37"],
      ["M", "38", "32", "39"],
      ["L", "40", "34", "41"],
      ["XL", "42", "36", "43"],
      ["XXL", "44", "38", "45"],
    ],
  },
];

export default function SizeGuidePage() {
  return (
    <StaticPage title="Size Guide" subtitle="Find your perfect fit">
      <p>All measurements are in inches. If you&apos;re between sizes, we recommend sizing up.</p>
      {sizeTables.map((table) => (
        <div key={table.title} className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-white light:text-black">
            {table.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20 light:border-black/20">
                  {table.headers.map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-gold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row[0]} className="border-b border-white/10 light:border-black/10">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3 text-white/80 light:text-black/80">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </StaticPage>
  );
}
