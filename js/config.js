const CONFIG = {
  proyectos: {
    ruta: '/data/proyectos.json',
    itemsPorPagina: 5,
    template: (proyecto) => `
      <div class="proyecto">
        <h2>${proyecto.titulo}</h2>
        <p class="tecnologias">${proyecto.tecnologias.join(' • ')}</p>
        <p class="descripcion">${proyecto.descripcion}</p>
        <div class="enlaces">
          ${proyecto.enlaces.map(enlace => `
            <a href="${enlace.url}" target="_blank" title="${enlace.descripcion}">${enlace.texto}</a>
          `).join('')}
        </div>
      </div>
    `
  },
  referencias: {
    ruta: '/data/referencias.json',
    itemsPorPagina: 3,
    template: (referencia) => `
      <div class="referencia">
        <h2>${referencia.nombre}</h2>
        <p class="cargo">${referencia.cargo} en ${referencia.empresa}</p>
        <p class="relacion">${referencia.relacion}</p>
        <p class="descripcion">${referencia.descripcion}</p>
        <div class="contacto">
          <p><strong>Teléfono:</strong> ${referencia.telefono}</p>
          <p><strong>Email:</strong> ${referencia.email}</p>
        </div>
      </div>
    `
  },
  educacion: {
    ruta: '/data/educacion.json',
    itemsPorPagina: 3,
    template: (educacion) => `
      <div class="educacion">
        <h2>${educacion.titulo}</h2>
        <p class="institucion">${educacion.institucion}</p>
        <p class="periodo">${educacion.periodo} - ${educacion.estado}</p>
        <p class="descripcion">${educacion.descripcion}</p>
        <div class="logros">
          <h3>Logros:</h3>
          <ul>
            ${educacion.logros.map(logro => `<li>${logro}</li>`).join('')}
          </ul>
        </div>
      </div>
    `
  },
  experiencia: {
    ruta: '/data/experiencia.json',
    itemsPorPagina: 3,
    template: (experiencia) => `
      <div class="experiencia">
        <h2>${experiencia.cargo}</h2>
        <p class="empresa">${experiencia.empresa}</p>
        <p class="periodo">${experiencia.periodo}</p>
        <p class="descripcion">${experiencia.descripcion}</p>
        <div class="responsabilidades">
          <h3>Responsabilidades:</h3>
          <ul>
            ${experiencia.responsabilidades.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
        <div class="tecnologias">
          <h3>Tecnologías:</h3>
          <p>${experiencia.tecnologias.join(' • ')}</p>
        </div>
      </div>
    `
  }
}; 