
$(document).ready(function(){
    //Elementos DOM
    //Recuperamos los elementos que vamos a ocupar
    const divEmptyInputAlert = $(".ID-Empty");
    const btnSearch = $("#btnSearch");
    const inputPlaylistId = $("#idPlaylist");

    const videoPlayer = $("#videoFrame");

    const divNotFoundInputAlert = $("#divNotFoundInputAlert");
    const divvideoPlaylist = $(".video-Playlist");


    //ESTADO INICIAL
    divEmptyInputAlert.hide(); //Escondido
    divNotFoundInputAlert.hide(); //escondido
    divvideoPlaylist.hide(); //Escondido


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
            divvideoPlaylist.hide(600); //esconde
            divNotFoundInputAlert.hide(600); //esconde
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
                function (data){
                    //vemos respuesta de invocación
                    console.log(`datos de respuesta: ${data}`);
                }
            )
            //si la petición corresponde correctamente cargamos la playlist
            .done(function (data, textStatus, xhr){
                cargaPlaylist(data)
            })
            .fail(function (data, textStatus, xhr){
                console.log("error", data.status);
                console.log("STATUS: " + xhr);
                if(data.status == 404) {
                    errorPlaylist();
                }
            })

        }

        // Funcion callback de error
        function errorPlaylist() {
            divNotFoundInputAlert.show(600);
            divEmptyInputAlert.hide(600);
        }
    });
    
    /*******************************************************
     * Funcion para cargar la Playlist:
     * // Callback. Playlist es un objeto que contiene otros objetos que son las entradas de la lista
     ******************************************************/
    
    function cargaPlaylist(playlist)
    {
       // Este mensaje aparece en la consola de desarrollo de JavaScript en el navegador
       //console.log("Encontré lista con "+playlist.items.length+" elementos");

       divvideoPlaylist.show(600);

       //Mostramos el video
       playVideo(`${playlist.items[0].snippet.resourceId.videoId}`)

       // Crea una lista
       $("#contenido").append($(`<ul>`));
        // Recorre los objetos de la playlist y genera la lista
        var i;
                            
        for (i=0;i<playlist.items.length;i++) {
            var element = playlist.items[i];

            if(element.snippet.title != "Deleted video"){

                //$("#contenido").append(
                //    $(`<li><a href="https://www.youtube.com/embed/"${element.snippet.resourceId.videoId}>${element.snippet.title}</a></li>`)
                //);
                //console.log(element.snippet.resourceId.videoId);
            
                /*/$("#contenido").append(
                    $(`<li onclick="playVideo('${element.snippet.resourceId.videoId}')" style="list-style-type: none">
                    <a>
                    <div class='cancion'>
                        <div class="div-img">
                            <img src="${element.snippet.thumbnails.default.url}" width=${element.snippet.thumbnails.default.width} height=${element.snippet.thumbnails.default.height}>
                        </div>
                        
                        <div class="info">
                            <h6>${element.snippet.title}</h6>
                            <p>${element.snippet.channelTitle}</p>
                        </div>
                    </div>
                    </a>
                    </li>`)
                );*/

                $("#contenido").append(
                    $("<li>").on("click", function() {
                        playVideo(element.snippet.resourceId.videoId);
                    }).css("list-style-type", "none").append(
                        $("<a>").append(
                            $("<div>").addClass("cancion").append(
                                $("<div>").addClass("div-img").append(
                                    $("<img>").attr({
                                        src: element.snippet.thumbnails.default.url,
                                        width: element.snippet.thumbnails.default.width,
                                        height: element.snippet.thumbnails.default.height
                                    })
                                ),
                                $("<div>").addClass("info").append(
                                    $("<h6>").text(element.snippet.title),
                                    $("<p>").text(element.snippet.channelTitle)
                                )
                            )
                        )
                    )
                );                
            }//fin del if
        }
        $("#contenido").append($("</ul>"));

    }//Fin de cargarPlaylist

    function playVideo(videoId) {
        console.log(`playvideo= ${videoId}`);
        srcVideo = `https://www.youtube.com/embed/${videoId}?audioplay=1`;
        $("#videoFrame").attr("src", srcVideo);
        $("#videoFrame").show(1000);
    
    } 

    /*function playVideo(videoId){
        console.log(`playvideo= ${videoId}`);
        srcVideo = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoPlayer.attr("src", srcVideo);
        videoPlayer.show(1000);
    }//fin de playVideo
    */
});
