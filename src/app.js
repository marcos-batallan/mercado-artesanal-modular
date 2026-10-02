const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");
const {
  crearIdentificadorSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearControladorProductos } = require("./controladores/productos");
const { crearRouterProductos } = require("./rutas/productos");

function crearApp({ servicioProductos, formatoRegistro }) {
  const app = express();
  const controladorProductos = crearControladorProductos(servicioProductos);
  const productosRouter = crearRouterProductos(controladorProductos);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");

  app.use(morgan(formatoRegistro));
  app.use(crearIdentificadorSolicitud());
  app.use(medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get("/", (req, res) => {
    res.render("inicio", { titulo: "Mercado Artesanal" });
  });
  app.get("/api/productos", controladorProductos.listarApi);

  app.use("/productos", productosRouter);
  app.use((req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe",
    });
  });

  return app;
}
module.exports = { crearApp };
