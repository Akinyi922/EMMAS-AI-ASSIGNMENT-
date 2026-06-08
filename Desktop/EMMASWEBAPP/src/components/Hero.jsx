import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="border-b border-black/5 bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center space-y-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Spring / Summer 2026
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.15] text-ebony sm:text-5xl lg:text-6xl">
            Curated Timelessness.
            <br />
            <span className="text-muted">Defined by You.</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Discover architected silhouettes and heirloom accessories—crafted
            for those who define elegance on their own terms.
          </p>
          <a
            href="#catalog"
            className="group inline-flex w-fit items-center gap-3 bg-ebony px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:bg-ebony/90 hover:shadow-lg"
          >
            Shop Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-warm-gray shadow-2xl sm:aspect-[3/4] lg:aspect-[4/5]">
          <img
            src="/editorial-portrait.svg"
            alt="Editorial fashion portrait"
            className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ebony/30 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="font-serif text-lg text-ivory sm:text-xl">
              The New Editorial
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/80">
              Limited Release · Online Exclusive
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
