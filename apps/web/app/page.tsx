import { getSession } from "@/lib/auth/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return redirect("/sign-in");
  }
  return redirect("/app");
}
