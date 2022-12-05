const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCgg4V34MDerF5HkP8DOeUOg&part=snippet%2Cid&order=date&maxResults=50'

const content= null || document.getElementById('content')//Eso se hace para que en caso de que fallé obtener el elemento por el id, no quede undefined, y que quede null.

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5d57aea8fdmsh995f34af8f11721p160ca7jsn8a63a89f7d22',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

async function fetchData(urlApi) {//declaramos un funcion para no tener que repetir codigo luego
    const response = await fetch(urlApi, options)
    const data = await response.json();
    return data;//sevuelve los datos
}

(async () => {//funcion iife (funcion que se llama sola)
    try {
        const videos = await fetchData(API)//llamamos a la funcion fetchData con el argumento API. video va a contener los datos que recivimos en fetch
        let view = `
        ${videos.items.map(video => `
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
      </a>
        `).slice(0, 4).join('')}
        `;
        //videos.items.map(video => el metodo mapmap crea un nuevo arreglo con lo que devuelvamos en cada iteracion de nuestro arreglo
        //${video.snippet.thumbnail.high.url} llamamamos a la url de la imagen 
        //${video.snippet.description} llamamos a la descripcion del video
        //${video.snippet.title}//llamamos a el titulo
        //slice(0,4) crea un nuevo arreglo con los elementos del 0 al 4

      content.innerHTML=view;//content tiene un getElementById que junto con el innet.html carga a view en el html(si, lo explique bien :D)
    } catch (error){
      console.log(error);
      /* content.innerHTML=`<h3>Actualemnte no podemos cargar los videos</h3>`; */

    }
})();