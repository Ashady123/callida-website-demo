import { Building2 } from 'lucide-react'

import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

/** Representative public-sector imagery (Unsplash) — anonymised, aligned with main site */
const slides = [
  {
    id: 's1',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=640&q=75',
    label: 'Public architecture',
  },
  {
    id: 's2',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=640&q=75',
    label: 'Urban operations context',
  },
  {
    id: 's3',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=640&q=75',
    label: 'Corporate and program settings',
  },
  {
    id: 's4',
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=640&q=75',
    label: 'Civic environment',
  },
  {
    id: 's5',
    image:
      'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=640&q=75',
    label: 'Built environment',
  },
  {
    id: 's6',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=75',
    label: 'Program delivery context',
  },
] as const

export function ClientsLogosSlider() {
  return (
    <section className="border-y border-rule bg-paper-2 py-10">
      <div className="mx-auto max-w-[1320px] px-[clamp(20px,4vw,56px)] pb-8">
        <h2 className="font-serif text-[clamp(2rem,5vw,4.5rem)] font-normal leading-none tracking-tight text-ink">
          Our clients.
        </h2>
      </div>
      <div className="relative h-[120px] w-full overflow-hidden">
        <InfiniteSlider className="flex h-full w-full items-center" duration={40} gap={40}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex h-[88px] w-[200px] shrink-0 items-center justify-center overflow-hidden rounded-sm border border-rule bg-paper shadow-sm"
            >
              <img
                src={slide.image}
                alt=""
                width={640}
                height={360}
                className="h-full w-full object-cover opacity-90 saturate-[0.92] transition duration-300 hover:scale-105 hover:opacity-100"
              />
              <span className="sr-only">{slide.label}</span>
            </div>
          ))}
          <div className="flex h-[88px] w-[200px] shrink-0 items-center justify-center rounded-sm border border-dashed border-rule bg-paper/80 text-ink-mute">
            <Building2 className="h-10 w-10" strokeWidth={1.25} aria-hidden />
            <span className="sr-only">Additional public sector clients</span>
          </div>
        </InfiniteSlider>
        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-[min(200px,18vw)]"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-[min(200px,18vw)]"
          direction="right"
          blurIntensity={1}
        />
      </div>
    </section>
  )
}
