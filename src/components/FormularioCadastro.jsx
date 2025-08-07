import "../styles/Formulario.css";
import React from "react";

export default function FormularioCadastro({ campos, onSubmit, titulo, botaoTexto = "Salvar", onVoltar }) {
  return (
    <div className="formulario-container">
      <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">{titulo}</h2>

      <form onSubmit={onSubmit}>
        {campos.map((campo) => (
          <React.Fragment key={campo.name}>
            {campo.label && (
              <label htmlFor={campo.name} className="formulario-label">
                {campo.label}
              </label>
            )}

            {campo.type === "select" ? (
              <select
                name={campo.name}
                value={campo.value}
                onChange={campo.onChange}
                required={campo.required}
                className="formulario-select"
              >
                <option value="">{campo.placeholder}</option>
                {campo.options?.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={campo.name}
                type={campo.type || "text"}
                placeholder={campo.placeholder}
                value={campo.value}
                onChange={campo.onChange}
                required={campo.required}
              />
            )}
          </React.Fragment>
        ))}

        <button type="submit" className="botao-criar">{botaoTexto}</button>
        {onVoltar && (
          <button type="button" className="botao-voltar" onClick={onVoltar}>Voltar</button>
        )}
      </form>
    </div>
  );
}
