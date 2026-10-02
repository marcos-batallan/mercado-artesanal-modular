function crearControladorProductos(servicioProductos) {
  function listar(req, res) {
    res.render("productos/lista", {
      titulo: "Productos Artesanales",
      productos: servicioProductos.listar(),
    });
  }

  function mostrarFormulario(req, res) {
    res.render("productos/nuevo", {
      titulo: "Nuevo producto",
      error: null,
      valores: {},
    });
  }

  function mostrarDetalle(req, res) {
    const id = Number(req.params.id);
    const producto = servicioProductos.obtenerPorId(id);
    if (!producto) {
      return res.status(404).render("no-encontrado", {
        titulo: "Producto no encontrado",
        mensaje: "No existe ningún producto con ese identificador",
      });
    }
    res.render("productos/detalle", {
      titulo: producto.nombre,
      producto,
    });
  }

  function crear(req, res) {
    servicioProductos.crear(req.productoValidado);
    res.redirect("/productos");
  }

  function listarApi(req, res) {
    res.json(servicioProductos.listar());
  }
  return { listar, mostrarFormulario, mostrarDetalle, crear, listarApi };
}
module.exports = { crearControladorProductos };
