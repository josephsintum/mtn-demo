import { redirect } from "next/navigation"

export default function AdminDashboardPage() {
  // Redirect to the new adminPanel page
  redirect("/admin/adminPanel")
}
