import "../styles/ConfirmacaoModal.css";

function ConfirmacaoModal({ titulo, mensagem, onConfirmar, onCancelar }) {
  return (
    <div className="modal-confirmacao-root">
      <div className="modal-confirmacao-box">
        <h2>{titulo || "Confirmar Ação"}</h2>
        <p>{mensagem || "Tem certeza que deseja continuar?"}</p>
        <div>
          <button className="cancelar" onClick={onCancelar}>Cancelar</button>
          <button className="confirmar" onClick={onConfirmar}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacaoModal;
