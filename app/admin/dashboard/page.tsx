'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/hooks/use-toast'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  totalPastes: number
  totalViews: number
  totalCopies: number
  totalShares: number
  pastesByDay: Record<string, number>
  viewsByDay: Record<string, number>
  copiesByDay: Record<string, number>
  sharesByDay: Record<string, number>
  activeIPs: number
  avgPasteLength: number
  lastUpdated: string
}

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    // Try to load API key from local storage
    const savedApiKey = localStorage.getItem('analytics-api-key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
      // Don't auto-fetch - require manual button press for security
    }
  }, [])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)

      if (!apiKey) {
        toast({
          title: 'API Key Required',
          description: 'Please enter your API key to access analytics',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      // Save API key to local storage
      localStorage.setItem('analytics-api-key', apiKey)

      const response = await fetch('/api/analytics', {
        headers: {
          'x-api-key': apiKey,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: 'Unauthorized',
            description: 'Invalid API key. Please check your API key and try again.',
            variant: 'destructive',
          })
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch analytics data. Please try again later.',
            variant: 'destructive',
          })
        }
        setIsLoading(false)
        return
      }

      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch analytics data. Please try again later.',
        variant: 'destructive',
      })
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const prepareDailyData = (data: Record<string, number>) => {
    return Object.entries(data)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30) // Show last 30 days
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto flex-1 px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Analytics Dashboard</h1>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Enter your API key to access analytics data</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  fetchAnalytics()
                }}
                className="flex space-x-2"
              >
                {/* Hidden username field for accessibility and password managers */}
                <input
                  type="text"
                  autoComplete="username"
                  className="sr-only"
                  tabIndex={-1}
                  value="analytics-admin"
                  readOnly
                  aria-hidden="true"
                />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter API key"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  suppressHydrationWarning
                  autoComplete="new-password"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Load Analytics'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {analytics && (
          <>
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Pastes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalPastes.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Copies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalCopies.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalShares.toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active IPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeIPs.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Paste Length</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(analytics.avgPasteLength).toLocaleString()} characters
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Daily Statistics</CardTitle>
                <CardDescription>
                  Data from the last 30 days (last updated:{' '}
                  {new Date(analytics.lastUpdated).toLocaleString()})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pastes">
                  <TabsList className="mb-4">
                    <TabsTrigger value="pastes">Pastes</TabsTrigger>
                    <TabsTrigger value="views">Views</TabsTrigger>
                    <TabsTrigger value="copies">Copies</TabsTrigger>
                    <TabsTrigger value="shares">Shares</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pastes" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareDailyData(analytics.pastesByDay)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3b82f6" name="Pastes" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="views" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareDailyData(analytics.viewsByDay)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#10b981" name="Views" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="copies" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareDailyData(analytics.copiesByDay)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#6366f1" name="Copies" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="shares" className="mt-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={prepareDailyData(analytics.sharesByDay)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#ec4899" name="Shares" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
