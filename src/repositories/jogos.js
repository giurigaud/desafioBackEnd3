//Lida com o banco de dados
//todas as querys aqui
const { Query } = require("pg");
const database = require("../utils/database");

const obterJogos = async () => {
  const query = `SELECT * FROM jogos`;
  const result = await database.query({
    text: query,
  });

  return result.rows;
};

const obterJogosPorRodada = async (rodada) => {
  const query = `SELECT * FROM jogos WHERE rodada = $1`;
  const result = await database.query({
    text: query,
    values: [rodada],
  });

  return result.rows;
};

const obterClassificaçao = async () => {
  const query = `
    SELECT  nome,
	(
	SELECT SUM(gols_visitante ) as golsVisitante FROM jogos 
	WHERE time_casa = times.nome 
	)
	+
	(
	SELECT SUM(gols_casa ) as golsCasa FROM jogos 
	WHERE time_visitante = times.nome
	) as "golsSofridos",
	(
	SELECT SUM(gols_casa ) as golsCasa FROM jogos 
	WHERE time_casa = times.nome 
	)
	+
	(
	SELECT SUM(gols_visitante ) as golsFeitos FROM jogos 
	WHERE time_visitante = times.nome
	) as "golsFeitos",
	(
	SELECT COUNT(time_casa ) as empates FROM jogos
	WHERE gols_casa = gols_visitante
	and time_casa = times.nome
	)
	+
	(
	SELECT COUNT(time_visitante ) as empates FROM jogos
	WHERE gols_casa = gols_visitante
	and time_visitante = times.nome
	) as "empates",
	(
	SELECT COUNT(time_casa ) as vitórias FROM jogos
	WHERE gols_casa > gols_visitante
	and time_casa = times.nome)
	+
	(SELECT COUNT(time_visitante ) as vitórias FROM jogos
	WHERE gols_visitante > gols_casa
	and time_visitante = times.nome
	) as "vitorias",
	(
	SELECT COUNT(time_casa ) as derrotas FROM jogos
	WHERE gols_casa < gols_visitante
	and time_casa = times.nome)
	+
	(SELECT COUNT(time_visitante ) as derrotas FROM jogos
	WHERE gols_visitante < gols_casa
	and time_visitante = times.nome
	) as derrotas,
	(SELECT COUNT(time_casa) FROM jogos
	WHERE time_casa = times.nome)
	+
	(SELECT COUNT(time_visitante ) FROM jogos
	WHERE time_visitante = times.nome) as jogos
FROM (SELECT distinct time_casa as nome FROM jogos) as times;
    `;

  const result = await database.query({
    text: query,
  });
  return result.rows;
};

const atualizarJogo = async (jogo) => {
  const { id, gols_casa, gols_visitante } = jogo;

  const query = {
    text: `UPDATE jogos SET
          gols_casa = $1,
          gols_visitante = $2
          WHERE id = $3
          RETURNING *`,
    values: [gols_casa, gols_visitante, id],
  };

  const result = await database.query(query);

  return result.rows[0];
};

const obterEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await database.query({
    text: query,
    values: [email],
  });

  return result.rows[0];
};

module.exports = {
  obterJogos,
  obterJogosPorRodada,
  obterClassificaçao,
  atualizarJogo,
  obterEmail,
};
