import { notFound } from "next/navigation";
import { getClientById } from "@/lib/mock/clients";
import ClientDetailContent from "./_components/ClientDetailContent";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    notFound();
  }

  return <ClientDetailContent client={client} />;
}
