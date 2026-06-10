import { getContactMessages } from "@/lib/firestore";

export const metadata = { title: "Messages" };
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  let messages: Awaited<ReturnType<typeof getContactMessages>> = [];
  try {
    messages = await getContactMessages();
  } catch {
    messages = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Contact Messages</h1>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-white/50">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-white/10 p-6 light:border-black/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white light:text-black">{msg.name}</p>
                  <p className="text-sm text-gold">{msg.email}</p>
                  {msg.subject && (
                    <p className="mt-1 text-sm text-white/70">Re: {msg.subject}</p>
                  )}
                </div>
                <span className="text-xs text-white/40">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
                </span>
              </div>
              <p className="mt-4 text-sm text-white/70">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
