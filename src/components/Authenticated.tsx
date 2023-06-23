import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type ReactNode, useEffect } from "react";

const Authenticated = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || status !== "authenticated") {
      return router.push("/");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-600">
        <div className="h-20 w-20 animate-spin rounded-full border-[5px] border-current border-t-transparent">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Authenticated;
