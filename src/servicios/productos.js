function crearServicioProductos(productosIniciales) {
  const productos = [...productosIniciales];
  function listar() {
    return [...productos];
  }
  function obtenerPorId(id) {
    return productos.find((producto) => producto.id === id) ?? null;
  }
  function crear(datosValidados) {
    const ultimoId = productos.reduce(
      (mayor, producto) => Math.max(mayor, producto.id),
      0,
    );
    const nuevo = { id: ultimoId + 1, ...datosValidados };
    productos.push(nuevo);
    return nuevo;
  }
  return { listar, obtenerPorId, crear };
}

module.exports = { crearServicioProductos };
