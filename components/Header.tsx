import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-primary-900 text-white shadow-md backdrop-blur-md">
      <Link href="/" className="text-2xl font-bold">
        CyberHire AI
      </Link>
      <nav className="flex items-center space-x-4">
        {session ? (
          <>
            <span className="hidden sm:inline">{session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 rounded bg-primary-700 hover:bg-primary-600 transition"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="px-3 py-1 rounded bg-primary-700 hover:bg-primary-600 transition"
          >
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
