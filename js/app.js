const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

const totalTareas = document.getElementById("totalTareas");
const tareasCompletadas = document.getElementById("tareasCompletadas");
const tareasPendientes = document.getElementById("tareasPendientes");

let tareas = [];

btnAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        agregarTarea();
    }
});

function agregarTarea() {
    const texto = inputTarea.value.trim();

    if (texto === "") {
        alert("Por favor, ingresar una tarea.");
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        descripcion: texto,
        completada: false
    };

    tareas.push(nuevaTarea);
    inputTarea.value = "";

    mostrarTareas();
}

function mostrarTareas() {
    listaTareas.innerHTML = "";

    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.className = tarea.completada ? "tarea completada" : "tarea";

        li.innerHTML = `
            <span class="texto-tarea">${tarea.descripcion}</span>
            <div class="acciones">
                <button class="btn-completar" onclick="cambiarEstado(${tarea.id})">
                    ${tarea.completada ? "Pendiente" : "Completar"}
                </button>
                <button class="btn-editar" onclick="editarTarea(${tarea.id})">
                    Editar
                </button>
                <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">
                    Eliminar
                </button>
            </div>
        `;

        listaTareas.appendChild(li);
    });

    actualizarResumen();
}

function cambiarEstado(id) {
    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return {
                ...tarea,
                completada: !tarea.completada
            };
        }
        return tarea;
    });

    mostrarTareas();
}

function editarTarea(id) {
    const tareaEncontrada = tareas.find(tarea => tarea.id === id);

    if (!tareaEncontrada) {
        alert("La tarea no fue encontrada.");
        return;
    }

    const nuevaDescripcion = prompt(
        "Editar tarea:",
        tareaEncontrada.descripcion
    );

    if (nuevaDescripcion === null) {
        return;
    }

    if (nuevaDescripcion.trim() === "") {
        alert("La descripción no puede estar vacía.");
        return;
    }

    tareas = tareas.map(tarea => {
        if (tarea.id === id) {
            return {
                ...tarea,
                descripcion: nuevaDescripcion.trim()
            };
        }
        return tarea;
    });

    mostrarTareas();
}

function eliminarTarea(id) {
    const confirmar = confirm("¿Está seguro de eliminar esta tarea?");

    if (!confirmar) {
        return;
    }

    tareas = tareas.filter(tarea => tarea.id !== id);

    mostrarTareas();
}

function actualizarResumen() {
    const total = tareas.length;
    const completadas = tareas.filter(tarea => tarea.completada).length;
    const pendientes = total - completadas;

    totalTareas.textContent = total;
    tareasCompletadas.textContent = completadas;
    tareasPendientes.textContent = pendientes;
}