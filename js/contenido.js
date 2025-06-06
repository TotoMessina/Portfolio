class GestorContenido {
  constructor(tipoContenido, containerId) {
    this.config = CONFIG[tipoContenido];
    this.containerId = containerId;
    this.itemsPorPagina = this.config.itemsPorPagina;
    this.paginaActual = 1;
    this.items = [];
    this.tipoContenido = tipoContenido;
  }

  async cargarContenido() {
    try {
      const response = await fetch(this.config.ruta);
      const data = await response.json();
      // Asegurarnos de que tenemos un array de items
      this.items = Array.isArray(data) ? data : 
                  (data[this.tipoContenido] ? data[this.tipoContenido] : []);
      
      if (this.items.length === 0) {
        console.warn(`No se encontraron ${this.tipoContenido} para mostrar`);
        return;
      }

      this.renderizarContenido();
    } catch (error) {
      console.error(`Error al cargar ${this.tipoContenido}:`, error);
      const container = document.getElementById(this.containerId);
      if (container) {
        container.innerHTML = `<p class="error">Error al cargar el contenido. Por favor, intente más tarde.</p>`;
      }
    }
  }

  renderizarContenido() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Renderizar items
    container.innerHTML = this.items.map(item => this.config.template(item)).join('');
    
    // Solo agregar paginación si hay más de un item por página
    if (this.items.length > this.itemsPorPagina) {
      container.innerHTML += `
        <div class="pagination">
          <button id="prev-page" disabled>Anterior</button>
          <span id="page-info">Página 1 de X</span>
          <button id="next-page">Siguiente</button>
        </div>
      `;
      this.inicializarPaginacion();
    }
  }

  inicializarPaginacion() {
    const items = document.querySelectorAll(`#${this.containerId} > div:not(.pagination)`);
    const totalItems = items.length;
    const totalPaginas = Math.ceil(totalItems / this.itemsPorPagina);

    const crearNumerosPagina = () => {
      const paginacion = document.querySelector('.pagination');
      const numerosContainer = document.createElement('div');
      numerosContainer.className = 'numeros-pagina';
      
      let inicio = Math.max(1, this.paginaActual - 2);
      let fin = Math.min(totalPaginas, inicio + 4);
      
      if (fin - inicio < 4) {
        inicio = Math.max(1, fin - 4);
      }

      for (let i = inicio; i <= fin; i++) {
        const numero = document.createElement('button');
        numero.textContent = i;
        numero.className = i === this.paginaActual ? 'pagina-actual' : '';
        numero.addEventListener('click', () => {
          this.paginaActual = i;
          this.mostrarItems(this.paginaActual);
          this.actualizarNumerosPagina();
        });
        numerosContainer.appendChild(numero);
      }

      const numerosAnteriores = document.querySelector('.numeros-pagina');
      if (numerosAnteriores) {
        numerosAnteriores.remove();
      }
      paginacion.insertBefore(numerosContainer, document.getElementById('next-page'));
    };

    const actualizarNumerosPagina = () => {
      const numeros = document.querySelectorAll('.numeros-pagina button');
      numeros.forEach(numero => {
        numero.className = parseInt(numero.textContent) === this.paginaActual ? 'pagina-actual' : '';
      });
    };

    const mostrarItems = (pagina) => {
      const inicio = (pagina - 1) * this.itemsPorPagina;
      const fin = inicio + this.itemsPorPagina;

      items.forEach((item, index) => {
        if (index >= inicio && index < fin) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      document.getElementById('page-info').textContent = `Página ${pagina} de ${totalPaginas}`;
      document.getElementById('prev-page').disabled = pagina === 1;
      document.getElementById('next-page').disabled = pagina === totalPaginas;
    };

    // Event listeners para los botones
    document.getElementById('prev-page').addEventListener('click', () => {
      if (this.paginaActual > 1) {
        this.paginaActual--;
        mostrarItems(this.paginaActual);
        actualizarNumerosPagina();
      }
    });

    document.getElementById('next-page').addEventListener('click', () => {
      if (this.paginaActual < totalPaginas) {
        this.paginaActual++;
        mostrarItems(this.paginaActual);
        actualizarNumerosPagina();
      }
    });

    mostrarItems(1);
    crearNumerosPagina();
  }
}

// Función para calcular la edad
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Calcular y mostrar la edad
  const fechaNacimiento = '2003-02-03';
  const edadElement = document.getElementById('edad');
  if (edadElement) {
    edadElement.textContent = calcularEdad(fechaNacimiento);
  }
  
  // Inicializar el contenido según la página
  const proyectosContainer = document.getElementById('proyectos-container');
  if (proyectosContainer) {
    const gestorProyectos = new GestorContenido('proyectos', 'proyectos-container');
    gestorProyectos.cargarContenido();
  }

  const referenciasContainer = document.getElementById('referencias-container');
  if (referenciasContainer) {
    const gestorReferencias = new GestorContenido('referencias', 'referencias-container');
    gestorReferencias.cargarContenido();
  }

  const estudiosContainer = document.getElementById('estudios-container');
  if (estudiosContainer) {
    const gestorEstudios = new GestorContenido('estudios', 'estudios-container');
    gestorEstudios.cargarContenido();
  }
}); 