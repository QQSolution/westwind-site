import { announcement, contact } from '@/content/site'

export function AnnouncementBar() {
  // announcement.text ends with "Call <phone> ext <ext>.", split that off so the
  // phone number renders as a real tel: link instead of plain text.
  const [pitch] = announcement.text.split(/\s*Call\s/)

  return (
    <div className="bg-[hsl(var(--navy))] text-white">
      <div className="container-tight flex min-h-9 items-center justify-center gap-2 py-1.5 text-center text-[13px]">
        <span className="font-medium text-white/85">
          <span className="hidden sm:inline">{pitch}</span>
          <span className="sm:hidden">We’re growing.</span>
        </span>
        <a
          href={`tel:${contact.tel}`}
          data-track="announcement_call"
          className="-my-2 inline-flex min-h-[44px] items-center whitespace-nowrap px-1 font-semibold text-white hover:underline"
        >
          Call {contact.phone}
          <span className="hidden sm:inline">&nbsp;ext {contact.ext}</span>
        </a>
        <a href={announcement.href} className="-my-2 inline-flex min-h-[44px] items-center whitespace-nowrap px-1 font-semibold text-[hsl(var(--gold))] hover:underline">
          {announcement.link} ›
        </a>
      </div>
    </div>
  )
}
