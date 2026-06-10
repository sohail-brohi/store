export const metadata = { title: "Users" };

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Users</h1>
      <p className="text-white/60">
        Users are managed through Firebase Authentication. View registered users in the{" "}
        <a
          href="https://console.firebase.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          Firebase Console
        </a>
        .
      </p>
    </div>
  );
}
