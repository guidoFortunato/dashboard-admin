"use client";

import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail?: string;
  userName?: string;
  userRole?: string;
}

const CLOSE_DURATION_MS = 320;

export default function DashboardShell({
  children,
  userEmail,
  userName,
  userRole,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleCloseMobile = useCallback(() => {
    if (!mobileOpen) return;
    setIsClosing(true);
    const t = setTimeout(() => {
      setMobileOpen(false);
      setIsClosing(false);
    }, CLOSE_DURATION_MS);
    return () => clearTimeout(t);
  }, [mobileOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8] dark:bg-[#101922]">
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobile}
        collapsed={collapsed}
        isClosing={isClosing}
      />
      {/* Overlay con transición suave al cerrar */}
      {(mobileOpen || isClosing) && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleCloseMobile}
        />
      )}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          userEmail={userEmail}
          userName={userName}
          userRole={userRole}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
