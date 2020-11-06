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

const obterClassificaçao = async (ctx) => {
  const tabela = [];

  const result = await Jogos.obterClassificaçao();

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

  const resultAscendente = resultPontos.sort((a, b) => {
    //-1 a é maior -> a vem dps de b
    //1 b é maior -> b vem dps de a
    //0 os dois são iguais -> iguais
    const saldoDeGolsA = a.golsFeitos - a.golsSofridos;
    const saldoDeGolsB = b.golsFeitos - b.golsSofridos;

    if (a.pontos > b.pontos) {
      return -1;
    } else if (b.pontos > a.pontos) {
      return 1;
    } else if (a.vitorias > b.vitorias) {
      return -1;
    } else if (b.vitorias > a.vitorias) {
      return 1;
    } else if (saldoDeGolsA > saldoDeGolsB) {
      return -1;
    } else if (saldoDeGolsB > saldoDeGolsA) {
      return 1;
    } else if (a.golsFeitos > b.golsFeitos) {
      return -1;
    } else if (b.golsFeitos > a.golsFeitos) {
      return 1;
    } else {
      return a.nome.localeCompare(b.nome);
    }
  });

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
