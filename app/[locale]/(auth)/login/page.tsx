import { Shield, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import LoginForm from "./_components/LoginForm";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface AdminPanelLogoProps {
  className?: string;
}

function AdminPanelLogo({ className }: AdminPanelLogoProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ unauthorized?: string }>;
}) {
  const params = await searchParams;
  const unauthorized = params.unauthorized === "true";

  const t = await getTranslations("login");

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
        <div className="relative z-10 max-w-lg text-white">
          <div className="mb-12 flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <AdminPanelLogo className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">AdminPanel</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Shield className="mb-2 w-6 h-6 text-white/90" aria-hidden="true" />
              <p className="text-sm font-semibold">{t("enterpriseSecurity")}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="mb-2 w-6 h-6 text-white/90" aria-hidden="true" />
              <p className="text-sm font-semibold">{t("realtimeSync")}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <div className="w-full h-full bg-white rounded-full blur-3xl" />
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-12 bg-white dark:bg-[#1a2435] relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AdminPanelLogo className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AdminPanel
            </span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
              {t("title")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
          </div>
          <LoginForm unauthorized={unauthorized} />
          <div className="mt-12 flex justify-center gap-6 text-slate-400 dark:text-slate-500">
            <a href="#" className="text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              {t("privacyPolicy")}
            </a>
            <a href="#" className="text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              {t("termsOfService")}
            </a>
            <a href="#" className="text-xs hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              {t("support")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
