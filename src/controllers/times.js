const JogosDB = require("../repositories/jogos");
const response = require("./response");

async function obterTodosOsTtimes(ctx) {
  //é async porq ocorre varias coisas ao msm tempo, e ele precisa
  const jogos = await JogosDB.obterJogos();

  let times = new Set();
  for (jogo of jogos) {
    times.add(jogo.time_casa);
    //é a mesma coisa que
    // const timeDB = jogo.time_casa;
    // //encontrar se o time ja esta na lista times
    // const timeEncontrado = times.find((time) => {
    //   time === timeDB ? true : false;
    // });

    // if (!timeEncontrado) {
    //   times.push(timeDB);
    // }
  }
  response(ctx, 200, [...times]);
}

module.exports = { obterTodosOsTtimes };
