import type { Client } from "@/types/client";

export const MOCK_CLIENTS: Client[] = [
  {
    id: "c-001",
    name: "Alexander West",
    company: "Horizon Tech Solutions Inc.",
    email: "alex.west@horizontech.com",
    phone: "+1 (555) 0123-4567",
    totalSpent: 24450,
    joinedAt: "Oct 12, 2023",
    lastInteraction: "Today, 09:42 AM",
    status: "active",
    accountHealth: {
      score: 9.4,
      maxScore: 10,
      tier: "Tier 1 Partner",
      description:
        "Alexander is a Tier 1 Partner. High satisfaction score based on the last 3 project completions.",
    },
    projects: [
      {
        id: "p-001",
        name: "Cloud Migration Strategy v2",
        description:
          "Infrastructure optimization and scalable server architecture.",
        dueDate: "Dec 20, 2023",
        progressPercent: 65,
        status: "IN_PROGRESS",
        teamMembers: ["Sarah K.", "Marcus L."],
      },
      {
        id: "p-002",
        name: "API Integration Suite",
        description:
          "Third-party service integrations for payment and analytics.",
        dueDate: "Jan 15, 2024",
        progressPercent: 30,
        status: "IN_PROGRESS",
        teamMembers: ["David R."],
      },
    ],
    files: [
      {
        id: "f-001",
        name: "Service_Agreement_Nexus.pdf",
        sizeLabel: "2.4 MB",
        uploadedAt: "Oct 14, 2023",
        type: "pdf",
      },
      {
        id: "f-002",
        name: "Brand_Logo_Assets.zip",
        sizeLabel: "45.8 MB",
        uploadedAt: "Oct 28, 2023",
        type: "zip",
      },
    ],
  },
  {
    id: "c-002",
    name: "Sofia Reyes",
    company: "Luminary Creative Agency",
    email: "sofia.reyes@luminarycreative.io",
    phone: "+1 (555) 0234-5678",
    totalSpent: 11800,
    joinedAt: "Feb 5, 2024",
    lastInteraction: "Yesterday, 03:15 PM",
    status: "active",
    accountHealth: {
      score: 8.1,
      maxScore: 10,
      tier: "Tier 2 Partner",
      description:
        "Sofia is a Tier 2 Partner. Consistent delivery and positive project feedback over the last 2 engagements.",
    },
    projects: [
      {
        id: "p-003",
        name: "Brand Identity Refresh",
        description:
          "Full visual identity overhaul including logo, palette, and guidelines.",
        dueDate: "Mar 30, 2024",
        progressPercent: 80,
        status: "IN_PROGRESS",
        teamMembers: ["Anna T.", "Jake P."],
      },
    ],
    files: [
      {
        id: "f-003",
        name: "Creative_Brief_Q1.pdf",
        sizeLabel: "1.1 MB",
        uploadedAt: "Feb 8, 2024",
        type: "pdf",
      },
      {
        id: "f-004",
        name: "Moodboard_v3.png",
        sizeLabel: "8.3 MB",
        uploadedAt: "Feb 20, 2024",
        type: "image",
      },
    ],
  },
  {
    id: "c-003",
    name: "Nathan Cole",
    company: "PeakFlow Ventures",
    email: "n.cole@peakflowventures.com",
    phone: "+1 (555) 0345-6789",
    totalSpent: 6200,
    joinedAt: "May 20, 2024",
    lastInteraction: "Mar 8, 2025, 11:00 AM",
    status: "active",
    accountHealth: {
      score: 7.5,
      maxScore: 10,
      tier: "Standard Client",
      description:
        "Nathan is a Standard Client. Good engagement with room to grow. First project completed on time.",
    },
    projects: [
      {
        id: "p-004",
        name: "Go-to-Market Website",
        description:
          "Landing page and product site for Series A funding round.",
        dueDate: "Jul 1, 2024",
        progressPercent: 100,
        status: "COMPLETED",
        teamMembers: ["Lisa W.", "Omar H."],
      },
      {
        id: "p-005",
        name: "Investor Deck Design",
        description: "Pitch deck redesign for Q3 investor meetings.",
        dueDate: "Sep 10, 2024",
        progressPercent: 15,
        status: "PENDING",
        teamMembers: [],
      },
    ],
    files: [
      {
        id: "f-005",
        name: "GTM_Scope_Document.pdf",
        sizeLabel: "3.7 MB",
        uploadedAt: "May 22, 2024",
        type: "pdf",
      },
    ],
  },
  {
    id: "c-004",
    name: "Priya Nair",
    company: "MedCore Analytics Ltd.",
    email: "priya.nair@medcoreanalytics.com",
    phone: "+1 (555) 0456-7890",
    totalSpent: 38900,
    joinedAt: "Aug 3, 2022",
    lastInteraction: "Mar 10, 2025, 02:30 PM",
    status: "inactive",
    accountHealth: {
      score: 6.2,
      maxScore: 10,
      tier: "Former Partner",
      description:
        "Priya is currently inactive. Last engagement ended successfully but no new projects have been initiated in the past 6 months.",
    },
    projects: [
      {
        id: "p-006",
        name: "Data Dashboard MVP",
        description:
          "Interactive analytics dashboard for clinical trial reporting.",
        dueDate: "Dec 5, 2022",
        progressPercent: 100,
        status: "COMPLETED",
        teamMembers: ["Chen L.", "Rachel M."],
      },
    ],
    files: [
      {
        id: "f-006",
        name: "Final_Deliverables_v2.zip",
        sizeLabel: "120 MB",
        uploadedAt: "Dec 7, 2022",
        type: "zip",
      },
      {
        id: "f-007",
        name: "Project_Closeout_Report.pdf",
        sizeLabel: "4.2 MB",
        uploadedAt: "Dec 10, 2022",
        type: "pdf",
      },
    ],
  },
];

export function getClientById(id: string): Client | undefined {
  return MOCK_CLIENTS.find((c) => c.id === id);
}
