export function formatStatus(status: string) {
    if (status === "open") return "Aberto";
    if (status === "in_progress") return "Em tratativa";
    if (status === "closed") return "Encerrado.";

    return status;
  }