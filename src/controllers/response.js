const response = (ctx, code, dados) => {
  const status = code >= 200 && code <= 399 ? "Sucesso" : "Erro";
  ctx.status = code;
  ctx.body = {
    status,
    dados,
  };
};

module.exports = response;
