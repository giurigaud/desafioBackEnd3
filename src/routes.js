const Router = require("koa-router");
const router = new Router();

const Jogos = require("./controllers/jogos");
const Auth = require("./controllers/auth");
const Session = require("./middlewares/session");

router.post("/auth", Auth.autenticar);

router.get("/jogos", Jogos.obterJogos);
router.get("/jogos/classificacao", Jogos.obterClassificaçao);
router.get("/jogos/:rodada", Jogos.obterJogosPorRodada);
router.put("/jogos/:id", Session.verify, Jogos.atualizarJogo);

module.exports = router;
