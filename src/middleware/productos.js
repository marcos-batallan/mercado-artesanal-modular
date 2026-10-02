// Middleware globales personalizados de solicitudes

function prepararAreaProductos(req, res, next) {
  res.locals.seccion = "Productos Artesanales";
  next();
}

function validarProducto(req, res, next) {
  const valores = req.body ?? {};
  const nombre = String(valores.nombre ?? "").trim();
  const categoria = String(valores.categoria ?? "").trim();
  const descripcion = String(valores.descripcion ?? "").trim();
  const precio = Number(valores.precio);

  if (
    !nombre ||
    !categoria ||
    !descripcion ||
    !Number.isFinite(precio) ||
    precio <= 0
  ) {
    return res.status(400).render("productos/nuevo", {
      titulo: "Nuevo producto",
      error: "Completá todos los campos con valores válidos",
      valores,
    });
  }
  req.productoValidado = { nombre, categoria, precio, descripcion };
  next();
}

module.exports = { prepararAreaProductos, validarProducto };
