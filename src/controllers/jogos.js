const database = require("../utils/database");
const Jogos = require("../repositories/jogos");
const response = require("./response");

const obterJogos = async (ctx) => {
  const result = await Jogos.obterJogos();
  return response(ctx, 200, result);
};

const obterJogosPorRodada = async (ctx) => {
  const { rodada } = ctx.params;

  if (rodada) {
    const result = await Jogos.obterJogosPorRodada(rodada);
    console.log(result);

    if (result) {
      return response(ctx, 200, result);
    }
    return response(ctx, 404, { message: "Rodada não encontrada" });
  }
  return response(ctx, 400, { message: "Pedido mal formatado!" });
};

function meuMap(array, funcao) {
  const novoArray = [];
  for (const elemento of array) {
    novoArray.push(funcao(elemento));
  }
  return novoArray;
}
const tabela = [];

const obterClassificaçao = async (ctx) => {
  const result = await Jogos.obterClassificaçao();

  // const dadosAscendentes = dadosModificados.sort((t1, t2) => {
  //   if (
  //     typeof t1[colunaOrdenada] === "number" &&
  //     typeof t2[colunaOrdenada] === "number"
  //   ) {
  //     return t1[colunaOrdenada] - t2[colunaOrdenada];
  //   } else {
  //     return t1[colunaOrdenada].localeCompare(t2[colunaOrdenada]);
  //   }
  // });
  const resultPontos = result.map((dado) => {
    return {
      nome: dado.nome,
      golsSofridos: Number(dado.golsSofridos),
      golsFeitos: Number(dado.golsFeitos),
      empates: Number(dado.empates),
      vitorias: Number(dado.vitorias),
      derrotas: Number(dado.derrotas),
      jogos: Number(dado.jogos),
      pontos: Number(dado.vitorias) * 3 + Number(dado.empates),
    };
  });

  const resultAscendente = resultPontos.sort((pontos, empates) => {
    if (typeof pontos === "number" && typeof empates === "number") {
      return pontos - empates;
    } else {
      // return t1.localeCompare(t2);
    }
  });
  console.log(resultAscendente);
  return response(ctx, 200, resultAscendente);
};

const atualizarJogo = async (ctx) => {
  const { id = null } = ctx.params;
  const { gols_casa = null, gols_visitante = null } = ctx.request.body;
  const jogo = {
    id,
    gols_casa,
    gols_visitante,
  };
  const result = await Jogos.atualizarJogo(jogo);
  if (result === undefined) {
    return response(ctx, 404, "Jogo não existe, insira outro id");
  }
  return response(ctx, 200, result);
};

const obterEmail = async (email) => {};

module.exports = {
  obterJogos,
  obterJogosPorRodada,
  obterClassificaçao,
  atualizarJogo,
  obterEmail,
};
