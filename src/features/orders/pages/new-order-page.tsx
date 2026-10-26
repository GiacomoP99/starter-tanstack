import { useState } from 'react'
import type { Order } from '@/api/generated/model'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { m } from '@/lib/i18n'
import { CreateOrderForm } from '../components/create-order-form'

export function NewOrderPage() {
  const [created, setCreated] = useState<Order | null>(null)

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{m.order_new_title()}</CardTitle>
        <CardDescription>{m.order_new_description()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CreateOrderForm onCreated={setCreated} />
        {created && (
          <p role="status" className="text-sm text-muted-foreground">
            {m.order_created({ customer: created.customer })}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
