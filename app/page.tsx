// app/page.tsx — drop-in landing page inspired by ola.click (clean, modern)
// Assumes Tailwind is already configured and Inter font available as .font-inter
// Paste this file as app/page.tsx and run `npm run dev`

import Image from "next/image";

export default function Page() {
  return (
    <main className="font-inter text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-slate-900" />
            <span className="text-lg font-semibold">Ola‑Style</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-slate-950" href="#features">Features</a>
            <a className="hover:text-slate-950" href="#how">How it works</a>
            <a className="hover:text-slate-950" href="#pricing">Pricing</a>
            <a className="hover:text-slate-950" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm px-3 py-2">Sign in</button>
            <a href="#cta" className="text-sm px-4 py-2 rounded-xl bg-slate-900 text-white">Get started</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_45rem_at_80%_-10%,rgba(2,6,23,0.08),transparent),radial-gradient(40rem_40rem_at_-10%_10%,rgba(2,6,23,0.08),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-slate-900 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" /> New
              <span>AI‑assisted ordering menu</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
              Turn your WhatsApp into a <span className="underline decoration-4 decoration-slate-900 underline-offset-4">smart store</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg max-w-xl">
              Create a beautiful digital menu, take orders via WhatsApp, manage deliveries, and get paid—without coding.
            </p>
            <form className="mt-6 flex w-full max-w-md gap-3">
              <input className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/20" placeholder="Enter your email" />
              <button className="px-5 py-3 rounded-xl bg-slate-900 text-white">Start free</button>
            </form>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full bg-slate-200 border border-white" />
                <div className="h-6 w-6 rounded-full bg-slate-300 border border-white" />
                <div className="h-6 w-6 rounded-full bg-slate-400 border border-white" />
              </div>
              <span>Trusted by 5k+ restaurants</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-slate-100 to-white" />
            <div className="rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1559333084-56ef747c55c1?q=80&w=1600&auto=format&fit=crop" alt="Menu preview" width={1200} height={900} className="w-full" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-center">
              {[
                "Delivery areas",
                "Digital menu",
                "Order statuses",
              ].map((t) => (
                <div key={t} className="rounded-xl border border-slate-200 px-3 py-2 bg-white">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-8 border-y border-slate-200 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 opacity-70">
          {["ubereats","doordash","shopify","meta","whatsapp"].map((k)=> (
            <div key={k} className="h-6 w-28 bg-slate-200 rounded" />
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold">Everything to sell from WhatsApp</h2>
          <p className="mt-3 text-slate-600">Publish your menu, manage orders, track deliveries, and collect payments—all in one place.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              t: "Digital menu",
              d: "Create categories, items, options, and photos in minutes.",
            },
            { t: "WhatsApp orders", d: "Receive structured orders right in your chats." },
            { t: "Delivery zones", d: "Set fees by distance or area and auto‑assign couriers." },
            { t: "Payments", d: "Accept card, cash on delivery, or local methods." },
            { t: "Analytics", d: "Know your top sellers, AOV, and repeat customers." },
            { t: "Multi‑branch", d: "Manage multiple locations with separate menus." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-slate-200 p-6 bg-white">
              <div className="h-10 w-10 rounded-xl bg-slate-900 mb-4" />
              <h3 className="font-semibold text-lg">{f.t}</h3>
              <p className="mt-1 text-slate-600 text-sm">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl sm:text-4xl font-bold text-center">Launch in 3 simple steps</h2>
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {[
              { s: "1", t: "Create your menu", d: "Add products, prices, photos, and options." },
              { s: "2", t: "Share your link", d: "Customers browse and order via WhatsApp." },
              { s: "3", t: "Manage orders", d: "Track statuses, assign delivery, get paid." },
            ].map((x) => (
              <div key={x.s} className="rounded-2xl border border-slate-200 p-6 bg-white">
                <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">{x.s}</div>
                <h3 className="mt-3 font-semibold">{x.t}</h3>
                <p className="mt-1 text-slate-600 text-sm">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot block */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold">Modern dashboard to run your shop</h2>
            <p className="mt-3 text-slate-600">Process incoming orders, update statuses, and keep everything organized with a clean, fast interface.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc list-inside">
              <li>Real‑time order queue</li>
              <li>Customer details & notes</li>
              <li>Printer‑friendly receipts</li>
            </ul>
            <a href="#cta" className="mt-6 inline-flex px-5 py-3 rounded-xl bg-slate-900 text-white">Try it free</a>
          </div>
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <Image src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop" alt="Dashboard" width={1200} height={900} />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h2 className="text-2xl sm:text-4xl font-bold text-center">Simple pricing</h2>
          <p className="text-center mt-2 text-slate-600">Start free. Upgrade when you grow.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { n: "Free", p: "$0", f: ["Menu builder", "WhatsApp orders", "1 branch"] },
              { n: "Pro", p: "$19/mo", f: ["Delivery zones", "Payments", "3 branches"] },
              { n: "Business", p: "$49/mo", f: ["Advanced analytics", "Priority support", "Unlimited branches"] },
            ].map((plan) => (
              <div key={plan.n} className="rounded-2xl border border-slate-200 p-6 bg-white">
                <h3 className="font-semibold">{plan.n}</h3>
                <div className="mt-2 text-3xl font-extrabold">{plan.p}</div>
                <ul className="mt-4 space-y-1 text-sm text-slate-700">
                  {plan.f.map((i) => (
                    <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-900" /> {i}</li>
                  ))}
                </ul>
                <a href="#cta" className="mt-6 inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white">Choose {plan.n}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold">Ready to sell on WhatsApp?</h2>
          <p className="mt-2 text-slate-600">Publish your menu in minutes and start taking orders today.</p>
          <form className="mt-6 mx-auto max-w-md flex gap-3">
            <input className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/20" placeholder="Your email" />
            <button className="px-5 py-3 rounded-xl bg-slate-900 text-white">Start free</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 text-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-slate-900" />
            <span className="font-semibold">Ola‑Style</span>
          </div>
          <div className="text-slate-500">© {new Date().getFullYear()} — All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
