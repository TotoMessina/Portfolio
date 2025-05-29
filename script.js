const options = [
    { name: "Proyectos", url: "/pages/proyectos.html" },
    { name: "Referencias", url: "/pages/referencias.html" },
    { name: "Experiencia", url: "/pages/experiencia.html" },
    { name: "Educación", url: "/pages/educacion.html" }
];

const input = document.getElementById("search");
const suggestionsContainer = document.getElementById("suggestions");
const searchIcon = document.getElementById("search-icon");

// Mostrar sugerencias al hacer foco
input.addEventListener("input", () => {
    const value = input.value.toLowerCase().trim();
    renderSuggestions(input.value.toLowerCase().trim());
    searchIcon.style.opacity = value ? "0" : "1";
});

// Filtrar mientras escribe
input.addEventListener("input", () => {
    renderSuggestions(input.value.toLowerCase().trim());
});

// Ocultar si hace clic fuera
document.addEventListener("click", (e) => {
    if (!suggestionsContainer.contains(e.target) && e.target !== input) {
        suggestionsContainer.innerHTML = "";
        resetInputBorder();
    }
});

// Escape para cerrar sugerencias
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        suggestionsContainer.innerHTML = "";
        resetInputBorder();
    }
});

function renderSuggestions(filter) {
    suggestionsContainer.innerHTML = "";

    const filtered = options.filter(opt =>
        opt.name.toLowerCase().includes(filter)
    );

    const list = filter ? filtered : options;

    if (list.length > 0) {
        input.classList.remove("input-rounded-full");
        input.classList.add("input-rounded-top");
        suggestionsContainer.classList.add("show");

        list.forEach(opt => {
            const div = document.createElement("div");
            div.classList.add("autocomplete-suggestion");
            div.textContent = opt.name;
            div.addEventListener("click", () => {
                window.location.href = opt.url;
            });
            suggestionsContainer.appendChild(div);
        });
    } else {
        // Mostrar mensaje si querés, o vaciar
        const noMatch = document.createElement("div");
        noMatch.classList.add("autocomplete-suggestion");
        noMatch.textContent = "Sin coincidencias";
        suggestionsContainer.appendChild(noMatch);
    }
}

function resetInputBorder() {
    input.classList.remove("input-rounded-top");
    input.classList.add("input-rounded-full");
    suggestionsContainer.classList.remove("show");
}

