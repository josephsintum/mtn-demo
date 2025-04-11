import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to the new adminPanel page
  redirect("/admin/adminPanel")
}
