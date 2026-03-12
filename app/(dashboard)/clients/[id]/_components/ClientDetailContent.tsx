"use client";

import Link from "next/link";
import {
  Edit,
  Send,
  FileText,
  Image,
  Archive,
  Download,
  RocketIcon,
  FileIcon,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import type { Client, FileItem, Project, ProjectStatus, FileType } from "@/types/client";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
};

const STATUS_ICON: Record<ProjectStatus, React.ReactNode> = {
  IN_PROGRESS: <Loader2 className="w-3.5 h-3.5" />,
  COMPLETED: <CheckCircle2 className="w-3.5 h-3.5" />,
  PENDING: <Clock className="w-3.5 h-3.5" />,
};

function FileTypeIcon({ type }: { type: FileType }) {
  switch (type) {
    case "pdf":
      return (
        <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-red-500" />
        </div>
      );
    case "image":
      return (
        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center shrink-0">
          <Image className="w-5 h-5 text-blue-500" />
        </div>
      );
    case "zip":
      return (
        <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center shrink-0">
          <Archive className="w-5 h-5 text-amber-500" />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
          <FileIcon className="w-5 h-5 text-slate-500" />
        </div>
      );
  }
}

function ProjectCard({ project }: { project: Project }) {
  const cfg = STATUS_CONFIG[project.status];
  return (
    <div className="relative pl-6 border-l-2 border-primary/20">
      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-primary rounded-full" />
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
            {project.name}
          </h5>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {project.description}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${cfg.className}`}
        >
          {STATUS_ICON[project.status]}
          {cfg.label}
        </span>
      </div>
      <div className="flex items-center justify-between mt-4 gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {project.teamMembers.length > 0 && (
            <div className="flex -space-x-2">
              {project.teamMembers.map((member) => (
                <div
                  key={member}
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-primary/20 flex items-center justify-center"
                  title={member}
                >
                  <span className="text-[9px] font-bold text-primary">
                    {member.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="text-[10px] text-slate-400 font-medium">
            Due {project.dueDate}
          </p>
        </div>
        <div className="w-28 sm:w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${project.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function FileCard({ file }: { file: FileItem }) {
  return (
    <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
      <FileTypeIcon type={file.type} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
          {file.name}
        </p>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide mt-0.5">
          {file.sizeLabel} &bull; {file.uploadedAt}
        </p>
      </div>
      <Download className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
    </div>
  );
}

interface ClientDetailContentProps {
  client: Client;
}

export default function ClientDetailContent({
  client,
}: ClientDetailContentProps) {
  const isActive = client.status === "active";
  const healthPercent = (client.accountHealth.score / client.accountHealth.maxScore) * 100;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link
          href="/clients"
          className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          Clients
        </Link>
        <span className="text-slate-300 dark:text-slate-700">/</span>
        <span className="text-slate-900 dark:text-slate-100 font-medium">
          {client.name}
        </span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar + Info */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 border-4 border-slate-50 dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden">
                {client.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.avatarUrl}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary">
                    {client.name.charAt(0)}
                  </span>
                )}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 ${isActive ? "bg-green-500" : "bg-slate-400"
                  }`}
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 truncate">
                {client.name}
              </h3>
              <p className="text-slate-500 font-medium text-sm mt-0.5 truncate">
                {client.company}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${isActive
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                >
                  {isActive ? "Active Client" : "Inactive"}
                </span>
                <span className="text-sm text-slate-400">
                  Joined {client.joinedAt}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
            <button className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Email Address
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 break-all">
              {client.email}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Phone Number
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {client.phone}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Total Spent
            </p>
            <p className="text-sm font-medium text-primary">
              {formatCurrency(client.totalSpent)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Last Interaction
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {client.lastInteraction}
            </p>
          </div>
        </div>
      </div>

      {/* Content grid — 2/3 left + 1/3 right on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Projects + Files */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <RocketIcon className="w-5 h-5 text-primary" />
                Active Projects
              </h4>
              <button className="text-xs font-bold text-primary hover:underline">
                View All
              </button>
            </div>
            <div className="p-6 space-y-6">
              {client.projects.length > 0 ? (
                client.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">
                  No projects yet.
                </p>
              )}
            </div>
          </div>


        </div>


      </div>
    </div>
  );
}
