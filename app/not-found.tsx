import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site">
      <div className="section-card p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Page introuvable</h1>
        <p className="mt-2 text-sm text-slate-600">La page demandée n&apos;existe pas ou a été déplacée.</p>
        <Link href="/" className="btn-brand mt-4">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
