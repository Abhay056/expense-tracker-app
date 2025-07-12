import { serve } from 'std/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import { isSameDay, isSameWeek, isSameMonth, isSameYear, addDays, addWeeks, addMonths, addYears } from 'date-fns'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req: Request) => {
  const { data: recurringExpenses, error } = await supabase
    .from('recurring_expenses')
    .select('*')

  if (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }

  const today = new Date()
  const expensesToCreate = []

  for (const expense of recurringExpenses) {
    const lastCreated = expense.last_created_date ? new Date(expense.last_created_date) : null
    const startDate = new Date(expense.start_date)
    const endDate = expense.end_date ? new Date(expense.end_date) : null

    if (endDate && today > endDate) {
      continue
    }

    if (lastCreated && isSameDay(today, lastCreated)) {
      continue
    }

    let shouldCreate = false
    let nextDate = lastCreated ? lastCreated : startDate

    switch (expense.frequency) {
      case 'daily':
        nextDate = addDays(nextDate, 1)
        if (today >= nextDate) {
          shouldCreate = true
        }
        break
      case 'weekly':
        nextDate = addWeeks(nextDate, 1)
        if (today >= nextDate) {
          shouldCreate = true
        }
        break
      case 'monthly':
        nextDate = addMonths(nextDate, 1)
        if (today >= nextDate) {
          shouldCreate = true
        }
        break
      case 'yearly':
        nextDate = addYears(nextDate, 1)
        if (today >= nextDate) {
          shouldCreate = true
        }
        break
    }

    if (shouldCreate) {
      expensesToCreate.push({
        user_id: expense.user_id,
        amount: expense.amount,
        category_id: expense.category_id,
        notes: expense.notes,
        date: today.toISOString().split('T')[0],
      })

      await supabase
        .from('recurring_expenses')
        .update({ last_created_date: today.toISOString().split('T')[0] })
        .eq('id', expense.id)
    }
  }

  if (expensesToCreate.length > 0) {
    const { error: insertError } = await supabase
      .from('expenses')
      .insert(expensesToCreate)

    if (insertError) {
      console.error(insertError)
      return new Response(JSON.stringify({ error: insertError.message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      })
    }
  }

  return new Response(JSON.stringify({ message: 'Recurring expenses processed' }), {
    headers: { 'Content-Type': 'application/json' },
  })
})