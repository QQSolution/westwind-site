import { announcement } from '@/content/site'

export function AnnouncementBar() {
  return (
    <div className="bg-[hsl(var(--navy))] text-white">
      <div className="container-tight flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-[13px]">
        <span className="font-medium text-white/85">{announcement.text}</span>
        <a href={announcement.href} className="-my-2 inline-flex min-h-[44px] items-center whitespace-nowrap px-1 font-semibold text-[hsl(var(--gold))] hover:underline">
          {announcement.link} ›
        </a>
      </div>
    </div>
  )
}
