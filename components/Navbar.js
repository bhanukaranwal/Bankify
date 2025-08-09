import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between">
      <div className="font-bold">Bankify</div>
      <div className="flex gap-4 items-center">
        {session && <span>Welcome, {session.user.email}</span>}
        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
