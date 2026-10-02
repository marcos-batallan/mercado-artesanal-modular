const express = require("express");
const {
  prepararAreaProductos,
  validarProducto,
} = require("../middleware/productos");

function crearRouterProductos(controladorProductos) {
  const router = express.Router();

  router.use(prepararAreaProductos);
  router.get("/", controladorProductos.listar);
  router.get("/nuevo", controladorProductos.mostrarFormulario);
  router.get("/:id", controladorProductos.mostrarDetalle);
  router.post("/", validarProducto, controladorProductos.crear);

  return router;
}

module.exports = { crearRouterProductos };
