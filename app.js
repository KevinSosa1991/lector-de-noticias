const API_KEY = "pub_cf188764a8ec44f08b000ef5e31614f5";
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=es&country=mx`;

const contenedor = document.getElementById("contenedor-noticias");
const btnRefrescar = document.getElementById("btnRefrescar");

async function cargarNoticias() {
  contenedor.innerHTML = "<p>Cargando noticias...</p>";

  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("Error en la respuesta de la API");

    const datos = await respuesta.json();
    const noticias = datos.results;

    contenedor.innerHTML = "";

    if (!noticias || noticias.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron noticias disponibles.</p>";
      return;
    }

    noticias.forEach(noticia => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-noticia";

      // Imagen (real o por defecto)
      const imagen = document.createElement("img");
      imagen.src = noticia.image_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/News_feed_icon.svg/120px-News_feed_icon.svg.png";
      imagen.alt = "Imagen de la noticia";
      imagen.className = "imagen-noticia";
      tarjeta.appendChild(imagen);

      // Contenido
      const contenido = document.createElement("div");
      contenido.className = "contenido-noticia";

      const titulo = document.createElement("h3");
      titulo.textContent = noticia.title;

      const resumen = document.createElement("p");
      resumen.textContent = noticia.description || "(Sin resumen disponible)";

      const fecha = document.createElement("small");
      const fechaFormateada = new Date(noticia.pubDate).toLocaleString("es-MX");
      fecha.textContent = `🗓 Publicado: ${fechaFormateada}`;

      const enlace = document.createElement("a");
      enlace.href = noticia.link;
      enlace.textContent = "Leer más";
      enlace.target = "_blank";

      contenido.appendChild(titulo);
      contenido.appendChild(resumen);
      contenido.appendChild(fecha);
      contenido.appendChild(enlace);

      tarjeta.appendChild(contenido);
      contenedor.appendChild(tarjeta);
    });

  } catch (error) {
    console.error("Error:", error);
    contenedor.innerHTML = "<p>Error al cargar las noticias. Intenta más tarde.</p>";
  }
}

btnRefrescar.addEventListener("click", cargarNoticias);
window.addEventListener("DOMContentLoaded", cargarNoticias);
