
$(document).ready(function(){
    //Elementos DOM
    //Recuperamos los elementos que vamos a ocupar
    const divEmptyInputAlert = $(".ID-Empty");
    const btnSearch = $("#btnSearch");
    const inputPlaylistId = $("#idPlaylist");

    const videoPlayer = $("#videoFrame");

    const divNotFoundInputAlert = $("#divNotFoundInputAlert");


    //ESTADO INICIAL
    divEmptyInputAlert.hide(); //Escondido
    divNotFoundInputAlert.hide(); //escondido


    // URL del API de youtube      
    var URL="https://content.googleapis.com/youtube/v3/playlistItems";
    
    // Llave obtenida de google
    var APIKey = "AIzaSyDle5PgKTTCZSPvHYOsPRz0_YWJlHMNm4s";

    
    
    /*******************************************************
     * Funcion para el evento click en boton buscar:
     ******************************************************/
    btnSearch.click(function (){
        // ID del playlist
        var playlistID = inputPlaylistId.val();
        console.log("playlistID= "+ playlistID);

        // verificamos si se intenta enviar ID vacio
        if (playlistID == "") {
            console.log("estoy aqui");
            $(".ID-Empty").show(600); //muestra
            //cards.hide(600); //esconde
            //divinfoPlaylist.hide(600); //esconde
            //divError.hide(600); //esconde
        } else {
            console.log("estoy acá");
            // Ocultamos mensajes de alerta si hay
            $(".ID-Empty").hide(600); //esconde
            //Invocación AJAX
            /* $.get(
                URL,
                "playlistId=" +
                  playlistID +
                  "&maxResults=50&part=id,snippet&key=" +
                  APIKey,
                function (data) {
                  // Vemos respuesta de invocacion
                  console.log(`datos de respuesta: ${JSON.stringify(data)}`);
                }
            )*/

            $.get(
                URL,
                "playlistId="+playlistID+
                "&maxResults=50&part=id,snippet&key="+APIKey,
                cargaPlaylist);
        }
    });
    
    /*******************************************************
     * Funcion para cargar la Playlist:
     * // Callback. Playlist es un objeto que contiene otros objetos que son las entradas de la lista
     ******************************************************/
    
    function cargaPlaylist(playlist)
    {
       // Este mensaje aparece en la consola de desarrollo de JavaScript en el navegador
       console.log("Encontré lista con "+playlist.items.length+" elementos");

       //Mostramos el video
       playVideo(`${playlist.items[0].snippet.resourceId.videoId}`)

       // Crea una lista
       $("#contenido").append($("<ul>"));
        // Recorre los objetos de la playlist y genera la lista
        var i;
                            
        for (i=0;i<playlist.items.length;i++) {
            var element = playlist.items[i];

            //$("#contenido").append(
            //    $(`<li> <a href='https://www.youtube.com/embed/"+element.snippet.resourceId.videoId+"+"</a></li>'>`)
            //);

            $("#contenido").append($("<li> <a href='https://www.youtube.com/embed/"+element.snippet.resourceId.videoId+"'>"+element.snippet.title+"</a></li>"));
            /*<div class='cancion'>
            <img src="./img/Youtube_Music_icon.png" alt="iconoCancion">
            <div class="info">
                <h6>$()</h6>
                <p>-`+element.snippet.channelTitle+`</p>
            </div>
        </div>*/
        }
        $("#contenido").append($("</ul>"));

    }//Fin de cargarPlaylist

    function playVideo(videoID){
        console.log(videoID);
        srcVideo = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
        videoPlayer.attr("src", srcVideo)
    }//fin de playVideo
    
});
