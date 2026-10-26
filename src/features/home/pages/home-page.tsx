import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { m } from '@/lib/i18n'

export function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">{m.app_name()}</h1>
      <p className="text-muted-foreground">{m.home_tagline()}</p>
      <Button asChild>
        <Link to="/demo">{m.home_open_demo()}</Link>
      </Button>
    </section>
  )
}
