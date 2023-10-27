const ingresos = [
  new Ingreso("Salario", 2100.0),
  new Ingreso("Venta Coche", 2500.0),
];

const egresos = [
  new Egreso("Renta departamento", 900),
  new Egreso("Ropa", 400),
];

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

const totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.Valor;
  }

  return totalIngreso;
};

const totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.Valor;
  }

  return totalEgreso;
};

const cargarCabecero = () => {
  let presupuestoTotal = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML =
    formatoMoneda(presupuestoTotal);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }

  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.Descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.Valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${
                      ingreso.Id
                    })"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

  return ingresoHTML;
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }

  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.Descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.Valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(
              egreso.Valor / totalEgresos()
            )}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${
                      egreso.Id
                    })"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

  return egresoHTML;
};

const eliminarIngreso = (id) => {
  let indiceRegistro = ingresos.findIndex((ingreso) => ingreso.Id === id);
  ingresos.splice(indiceRegistro, 1);
  cargarCabecero();
  cargarIngresos();
};

const eliminarEgreso = (id) => {
  let indiceRegistro = egresos.findIndex((egreso) => egreso.Id === id);
  egresos.splice(indiceRegistro, 1);
  cargarCabecero();
  cargarEgresos();
};

const agregarDato = () => {
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];
  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
    } else {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
    }
  }
};
