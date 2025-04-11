"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { BarChart, Calendar, Download, FileText, PieChart, TrendingUp, Users } from "lucide-react"

export default function ReportsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("30days")

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== "admin") {
      toast({
        title: "Access denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }, [user, router, toast])

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Reports & Analytics</h1>
            <p className="text-gray-400 mt-1">View system performance and usage statistics</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-mtn-black border-mtn-gray">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-mtn-gray border-mtn-gray">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-mtn-yellow">1,248</p>
              <p className="text-sm text-gray-400">
                <span className="text-green-500">↑ 12%</span> vs previous period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-mtn-gray border-mtn-gray">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-mtn-yellow">87</p>
              <p className="text-sm text-gray-400">
                <span className="text-green-500">↑ 5%</span> vs previous period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-mtn-gray border-mtn-gray">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-mtn-yellow">42</p>
              <p className="text-sm text-gray-400">
                <span className="text-red-500">↓ 3%</span> vs previous period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-mtn-gray border-mtn-gray">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-mtn-yellow">0.8s</p>
              <p className="text-sm text-gray-400">
                <span className="text-green-500">↑ 15%</span> vs previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="verification" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-mtn-black mb-8">
            <TabsTrigger
              value="verification"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Verification Trends
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <FileText className="h-4 w-4 mr-1" />
              Certificate Analytics
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <Users className="h-4 w-4 mr-1" />
              User Activity
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
            >
              <BarChart className="h-4 w-4 mr-1" />
              System Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verification" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>Verification Trends</CardTitle>
                <CardDescription>Certificate verification activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 text-mtn-yellow opacity-50" />
                    <p>Verification trend chart would appear here</p>
                    <p className="text-sm mt-2">Showing daily verification counts</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Most Verified Certificate</h3>
                    <p className="text-sm text-gray-400">MTN-CERT-1234</p>
                    <p className="text-xs text-gray-500 mt-1">Digital Marketing Fundamentals</p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Peak Verification Time</h3>
                    <p className="text-sm text-gray-400">Weekdays, 10:00 - 11:00 AM</p>
                    <p className="text-xs text-gray-500 mt-1">Based on local time (CAT)</p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Verification Success Rate</h3>
                    <p className="text-sm text-gray-400">98.7%</p>
                    <p className="text-xs text-gray-500 mt-1">1.3% of attempts failed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>Certificate Analytics</CardTitle>
                <CardDescription>Certificate issuance and status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-6">
                    <h3 className="font-medium mb-4 text-center">Certificate Status Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <PieChart className="h-16 w-16 mx-auto mb-4 text-mtn-yellow opacity-50" />
                        <p>Status distribution chart would appear here</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                      <div>
                        <div className="h-3 bg-green-500 rounded-full mb-1"></div>
                        <p>Issued (85%)</p>
                      </div>
                      <div>
                        <div className="h-3 bg-yellow-500 rounded-full mb-1"></div>
                        <p>Draft (10%)</p>
                      </div>
                      <div>
                        <div className="h-3 bg-red-500 rounded-full mb-1"></div>
                        <p>Revoked (5%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-6">
                    <h3 className="font-medium mb-4 text-center">Certificate Issuance by Program</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <BarChart className="h-16 w-16 mx-auto mb-4 text-mtn-yellow opacity-50" />
                        <p>Program distribution chart would appear here</p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      <p className="text-center">Top programs by certificate count</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-4">Certificate Issuance Timeline</h3>
                  <div className="h-64 flex items-center justify-center bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <div className="text-center text-gray-400">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-mtn-yellow opacity-50" />
                      <p>Certificate issuance timeline would appear here</p>
                      <p className="text-sm mt-2">Showing monthly certificate issuance counts</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>User registration and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-mtn-black border border-mtn-gray rounded-lg p-4 mb-6">
                  <div className="text-center text-gray-400">
                    <Users className="h-16 w-16 mx-auto mb-4 text-mtn-yellow opacity-50" />
                    <p>User activity chart would appear here</p>
                    <p className="text-sm mt-2">Showing daily active users and new registrations</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Total Users</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">1,245</p>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>Recipients: 1,230</span>
                      <span>Admins: 15</span>
                    </div>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Active Users (30 days)</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">487</p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="text-green-500">↑ 8%</span> vs previous period
                    </p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Avg. Session Duration</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">5m 24s</p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="text-green-500">↑ 12%</span> vs previous period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>System response times and resource utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-mtn-black border border-mtn-gray rounded-lg p-4 mb-6">
                  <div className="text-center text-gray-400">
                    <BarChart className="h-16 w-16 mx-auto mb-4 text-mtn-yellow opacity-50" />
                    <p>System performance chart would appear here</p>
                    <p className="text-sm mt-2">Showing response times and server load</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Avg. Response Time</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">0.8s</p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="text-green-500">↑ 15%</span> faster
                    </p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Uptime</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">99.98%</p>
                    <p className="text-xs text-gray-400 mt-2">Last 30 days</p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Error Rate</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">0.12%</p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="text-green-500">↓ 0.05%</span> vs previous
                    </p>
                  </div>

                  <div className="bg-mtn-black border border-mtn-gray rounded-lg p-4">
                    <h3 className="font-medium mb-1">Database Size</h3>
                    <p className="text-2xl font-bold text-mtn-yellow">2.4 GB</p>
                    <p className="text-xs text-gray-400 mt-2">
                      <span className="text-yellow-500">↑ 0.3 GB</span> this month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
