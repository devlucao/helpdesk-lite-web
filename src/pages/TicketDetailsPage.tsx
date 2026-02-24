import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../auth/useAuth";
import { useEffect, useState } from "react";
import { apiGet } from "../api/apiClient";
import { formatStatus } from "../utils/functions";

type Ticket = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  createdById: string;
  assignedToId?: string | null;
  createdBy?: { id: string, name: string, email: string, role: string };
};

export default function TicketDetailsPage() {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const { token } = useAuth();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTicket() {
      if (!id) {
        setError("Missing ticket id in URL.");
        return;
      }
      try {
        setLoading(true);
        setError(null);

        const result = await apiGet(`/tickets/${id}`, token);

        setTicket(result.data);
      } catch (err: any) {
        if (err?.status === 404) {
          setError("Ticket não encontrado.");

        } else {
          setError(err?.message || "Failed to load ticket.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTicket();
  }, [id, token])

  if (loading) {
    return (
      <>
        <h2>TICKETS</h2>
        <p>Carregando...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h2>TICKETS</h2>
        <p style={{ color: "crimson" }}>{error}</p>
      </>
    )
  }

  if (!ticket) {
    return (
      <>
        <h2>Ticket Details</h2>
        <p>Ticket não encontrado.</p>
      </>
    );
  }

  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>Voltar</button>
      <h2>Ticket Details</h2>
      <p><strong>ID:</strong> {ticket.id}</p>
      <p><strong>Título:</strong> {ticket.title}</p>
      <p><strong>Status:</strong> {formatStatus(ticket.status)}</p>
      <p><strong>Descrição:</strong> {ticket.description}</p>
      <p>
        <strong>Criado por:</strong>{" "}
        {ticket.createdBy ? `${ticket.createdBy.name} (${ticket.createdBy.role})` : ticket.createdById}
      </p>
      <p><strong>Atribuído para:</strong> {ticket.assignedToId ?? "Não atribuído"}</p>
      <p><strong>Criado em:</strong> {new Date(ticket.createdAt).toLocaleString("pt-BR")}</p>
    </>
  )
}