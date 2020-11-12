const Router = require("koa-router");
const router = new Router();

const Jogos = require("./controllers/jogos");
const Classificacao = require("./controllers/classificacao");
const Auth = require("./controllers/auth");
const Session = require("./middlewares/session");
const Times = require("./controllers/times");

router.post("/auth", Auth.autenticar);

router.get("/jogos", Jogos.obterJogos);
router.get("/jogos/classificacao", Classificacao.obterClassificaçao);
router.get("/jogos/:rodada", Jogos.obterJogosPorRodada);
router.put("/jogos/:id", Session.verify, Jogos.atualizarJogo);

router.get("/times", Times.obterTodosOsTtimes);

module.exports = router;
