import { useNavigate, useParams } from "react-router-dom"
import useAuth from "../auth/useAuth";
import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "../api/apiClient";
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
  const { token, user } = useAuth();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function loadTicket() {
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
      if (err?.status === 404) setError("Ticket não encontrado.");
      else setError(err?.message || "Failed to load ticket.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTicket();
  }, [id, token]);

  async function changeStatus(newStatus: "open" | "in_progress" | "closed") {
    if (!id) return;

    try {
      setActionLoading(true);
      setActionError(null);

      await apiPatch(`/tickets/${id}/status`, token, { status: newStatus });

      await loadTicket();
    } catch (err: any) {
      if (err?.status === 403) setActionError("Você não tem permissão para mudar o status.");
      else if (err?.status === 400) setActionError(err?.message);
      else setActionError(err?.message || "Falha ao alterar status.");
    } finally {
      setActionLoading(false);
    }
  }

  async function assignTo(assignedToId: string) {
    if (!id) return;

    try {
      setActionLoading(true);
      setActionError(null);

      await apiPatch(`/tickets/${id}/assign`, token, { assignedToId });

      await loadTicket();
    } catch (err: any) {
      if (err?.status === 403) setActionError("Você não tem permissão para atribuir tickets.");
      else if (err?.status === 400) setActionError(err?.message);
      else setActionError(err?.message || "Falha ao atribuir ticket.");
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <h2>Ticket Details</h2>
        <p>Carregando...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <button type="button" onClick={() => navigate(-1)}>Voltar</button>
        <h2>Ticket Details</h2>
        <p style={{ color: "crimson" }}>{error}</p>
      </>
    )
  }

  if (!ticket) {
    return (
      <>
        <button type="button" onClick={() => navigate(-1)}>Voltar</button>
        <h2>Ticket Details</h2>
        <p>Ticket não encontrado.</p>
      </>
    );
  }

  const role = user?.role;
  const canAssign = role === "admin" || role === "agent";

  return (
    <>
      <button type="button" onClick={() => navigate(-1)}>Voltar</button>
      <h2>Ticket Details</h2>

      <section style={{ margin: "12px 0" }}>
        <h3>Ações</h3>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="button" disabled={actionLoading || ticket.status === "open"} onClick={() => changeStatus("open")}>Abrir</button>
          <button type="button" disabled={actionLoading || ticket.status === "in_progress"} onClick={() => changeStatus("in_progress")}>Em tratativa</button>
          <button type="button" disabled={actionLoading || ticket.status === "closed"} onClick={() => changeStatus("closed")}>Fechado</button>
        </div>

        {canAssign && (
          <div style={{ marginTop: 12 }}>
            <button type="button" disabled={actionLoading} onClick={() => assignTo("u-101")}>Assign para u-101</button>
          </div>
        )}

        {actionError && <p style={{ color: "crimson" }}>{actionError}</p>}
      </section>
      <section>

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
      </section>
    </>
  )
}