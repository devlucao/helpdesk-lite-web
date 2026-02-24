import { useEffect, useState } from "react"
import useAuth from "../auth/useAuth";
import { apiGet } from "../api/apiClient";

export default function TicketsListPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [meta, setMeta] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");

  const { token } = useAuth();

  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams({
          page: String(page),
          limit: String(limit),
        });

        if (status) queryString.set("status", status);

        const result = await apiGet(`/tickets?${queryString.toString()}`, token);

        setTickets(result.data);
        setMeta(result.meta);
      } catch (err: any) {
        setError(err?.message || "Failed to load tickets.");
      } finally {
        setLoading(false);
      }
    }

    fetchTickets();
  }, [page, limit, status, token]);

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

  const totalPages = meta?.totalPages ?? 1;

  function formatStatus(status: string) {
    if(status === "open") return "Aberto";
    if(status === "in_progress") return "Em tratativa";
    if(status === "closed") return "Encerrado.";

    return status;
  }

  return (
    <>
      <h2>TICKETS</h2>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <label>Status:{" "}

          <select
            value={status}
            onChange={(event) => { setStatus(event.target.value); setPage(1); }}
          >
            <option value="">Todos</option>
            <option value="open">Aberto</option>
            <option value="in_progress">Em Tratativa</option>
            <option value="closed">Fechado</option>
          </select>
        </label>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <button type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Anterior</button>

          <span>Página {page} / {totalPages}</span>


          <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Próxima</button>
        </div>
      </div>

      {
        tickets.length === 0 ? (
          <p>Nenhum ticket encontrado.</p>
        ) : (
          <ul>
            {tickets.map((t: any) => (
              <li key={t.id}>
                <strong>{t.title || "Sem título."}</strong> - 
                <span> {formatStatus(t.status)}</span>
              </li>
            ))}
          </ul>
        )
      }
    </>
  )
}
