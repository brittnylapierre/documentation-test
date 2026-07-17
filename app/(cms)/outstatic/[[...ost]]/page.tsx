import 'outstatic/outstatic.css'
import { Outstatic } from 'outstatic'
import { OstClient } from 'outstatic/client'

export default async function Page({ params }: { params: Promise<{ ost?: string[] }> }) {
  const ostData = await Outstatic()
  const resolvedParams = await params
  return (
    <div id="outstatic" style={{ minHeight: '100vh', width: '100%' }}>
      <OstClient ostData={ostData} params={{ ost: resolvedParams.ost ?? [] }} />
    </div>
  )
}
