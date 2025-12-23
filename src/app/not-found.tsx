import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container pt-10">
      <div className="card max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-white/75">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6">
          <Link className="btn-primary" href="/">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
