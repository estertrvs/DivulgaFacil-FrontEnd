import "../styles/ConfirmacaoModal.css";

function AlertModal({ titulo, mensagem, onFechar }) {
  return (
    <div className="modal-confirmacao-root">
      <div className="modal-confirmacao-box">
        <h2>{titulo || "Aviso"}</h2>
        <p>{mensagem || "Algo inesperado aconteceu."}</p>
        <button className="confirmar" onClick={onFechar}>OK</button>
      </div>
    </div>
  );
}

export default AlertModal;
