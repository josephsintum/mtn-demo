import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Download, Share2, User, FileText, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import LogoutButton from "@/components/logout-button"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Welcome, John Doe</h1>
              <p className="text-gray-400 mt-1">Manage your MTN certificates and profile</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button variant="outline" className="border-mtn-gray text-white hover:bg-mtn-gray">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <LogoutButton />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-mtn-yellow">3</p>
              </CardContent>
            </Card>
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recently Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-mtn-yellow">12</p>
                <p className="text-sm text-gray-400">times in the last 30 days</p>
              </CardContent>
            </Card>
            <Card className="bg-mtn-gray border-mtn-gray">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Last Login</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">March 28, 2025</p>
                <p className="text-sm text-gray-400">10:45 AM</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="certificates" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-mtn-black mb-8">
              <TabsTrigger
                value="certificates"
                className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
              >
                <FileText className="h-4 w-4 mr-1" />
                Your Certificates
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
              >
                <Bell className="h-4 w-4 mr-1" />
                Recent Notifications
              </TabsTrigger>
              <TabsTrigger
                value="actions"
                className="data-[state=active]:bg-mtn-yellow data-[state=active]:text-mtn-black flex items-center justify-center gap-1 py-2"
              >
                <Settings className="h-4 w-4 mr-1" />
                Quick Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="bg-mtn-gray border-mtn-gray overflow-hidden">
                    <div className="aspect-[4/3] relative bg-mtn-black">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt={`Certificate ${i}`}
                        width={400}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Digital Marketing Fundamentals</CardTitle>
                      <CardDescription>Certificate ID: MTN-CERT-123{i}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-gray-400">Issued: Jan 15, 2025</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-mtn-gray">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-mtn-gray">
                          <Share2 className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button asChild className="bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                  <Link href="/dashboard/certificates">View All Certificates</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card className="bg-mtn-gray border-mtn-gray">
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Stay updated on certificate activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Certificate Verified",
                        description:
                          "Your Digital Marketing Fundamentals Certificate was verified by Acme Corp on March 27, 2025",
                        time: "2 days ago",
                      },
                      {
                        title: "New Certificate Issued",
                        description: "You have received a new certificate: Project Management Essentials",
                        time: "1 week ago",
                      },
                      {
                        title: "Account Login",
                        description: "New login detected from Douala, Cameroon",
                        time: "2 weeks ago",
                      },
                    ].map((notification, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-lg bg-mtn-black border border-mtn-gray">
                        <div className="h-10 w-10 rounded-full bg-mtn-yellow/10 flex items-center justify-center flex-shrink-0">
                          <Bell className="h-5 w-5 text-mtn-yellow" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-gray-400">{notification.description}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-mtn-gray text-white hover:bg-mtn-gray">
                    <Link href="/dashboard/notifications">View All Notifications</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="actions" className="mt-0">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-mtn-gray border-mtn-gray">
                  <CardHeader>
                    <CardTitle>Share a Certificate</CardTitle>
                    <CardDescription>Share your certificates with employers or on social media</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <Share2 className="h-16 w-16 text-mtn-yellow" />
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                      <Link href="/dashboard/share">Share Certificate</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-mtn-gray border-mtn-gray">
                  <CardHeader>
                    <CardTitle>Download Certificate</CardTitle>
                    <CardDescription>Download your certificates in PDF format</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <Download className="h-16 w-16 text-mtn-yellow" />
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                      <Link href="/dashboard/certificates">Download</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-mtn-gray border-mtn-gray">
                  <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>Manage your account information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <User className="h-16 w-16 text-mtn-yellow" />
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-mtn-yellow text-mtn-black hover:bg-mtn-yellow/90">
                      <Link href="/dashboard/profile">Update Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
