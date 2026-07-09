import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] tracking-luxe text-muted-foreground">404</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">Lost in the stars</h1>
        <p className="mt-3 text-sm text-muted-foreground">The page you're looking for has drifted away.</p>
        <Link to="/" className="mt-6 inline-flex items-center bg-foreground px-5 py-2.5 text-xs tracking-luxe text-background">
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please refresh and try again.</p>
        <a href="/" className="mt-6 inline-block bg-foreground px-5 py-2.5 text-xs tracking-luxe text-background">
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LLUMI Jewellery — Wear your story" },
      { name: "description", content: "Heirloom-quality earrings, necklaces, and rings from LLUMI. Wear your story." },
      { property: "og:title", content: "LLUMI Jewellery — Wear your story" },
      { property: "og:description", content: "Heirloom-quality earrings, necklaces, and rings from LLUMI. Wear your story." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "LLUMI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LLUMI Jewellery — Wear your story" },
      { name: "twitter:description", content: "Heirloom-quality earrings, necklaces, and rings from LLUMI. Wear your story." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1eec02d5-bca4-4101-b79c-970840c63be3" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/1eec02d5-bca4-4101-b79c-970840c63be3" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/__l5e/assets-v1/f7fe3f0a-39d9-40c2-95bf-8e39d6dab4f2/llumi-logo-primary.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Outlet />
          <Toaster position="top-center" />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
