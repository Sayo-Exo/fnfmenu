var running = false;
var width = 1280;
var height = 720;

var body = document.getElementById("body");

var helpmodal = document.getElementById("helpmodal");
var helpmodalOpen = document.getElementById("helpmodalopen");
var helpmodalClose = document.getElementsByClassName("modal-close")[0];

var modsmodal = document.getElementById("modsmodal");
var modsmodalOpen = document.getElementById("modsmodalopen");
var modsmodalClose = document.getElementsByClassName("modal-close")[0];

var modsTag = document.getElementsByTagName("mod");
var randomimageTag = document.getElementsByTagName("randomimage");

for (var curMod = 0; curMod < modsTag.length; curMod++) {
    var mod = modsTag[curMod];
    mod.addEventListener("click", () => {
        loadGame(mod.id + "/Funkin.js");
    })
}

function yesimages() {
    for (var curImage = 0; curImage < randomimageTag.length; curImage++) {
        var image = randomimageTag[curImage];
        var wowimages = [
            "assets/shared/images/sick.png",
            "assets/shared/images/go.png",
            "assets/shared/images/opensauceforever.png",
            "assets/shared/images/week54prototype.png",
            "assets/shared/music/breakfast.mp3",
            "assets/music/kickstarterTrailer.mp4",
            "assets/music/ughCutscene.mp4",
            "assets/songs/test/Inst.mp3",
            "assets/songs/test/Voices.mp3"
        ]
        var wowerimage = wowimages[Math.floor(Math.random() * wowimages.length)];
        var htmlthing = "Random thingy lol<br>";
        if (wowerimage.endsWith(".png")) {
            htmlthing += `<img src="${wowerimage}">`;
        } else if (wowerimage.endsWith(".mp3" || wowerimage.endsWith(".ogg"))) {
            htmlthing += `<audio controls="controls" src="${wowerimage}"></audio>`;
        } else if (wowerimage.endsWith(".mp4")) {
            htmlthing += `<video width="980" height="550" controls="controls" src="${wowerimage}"></video>`;
        }
        image.innerHTML = htmlthing + "<br>" + wowerimage;   
    }
}

helpmodalOpen.onclick = function () {
    audio("assets/sounds/scrollMenu.mp3");
    yesimages();
    helpmodal.style.display = "block";
}

helpmodalClose.onclick = function () {
    audio("assets/sounds/cancelMenu.mp3");
    helpmodal.style.display = "none";
}

modsmodalOpen.onclick = function () {
    audio("assets/sounds/scrollMenu.mp3");
    modsmodal.style.display = "block";
}

modsmodalClose.onclick = function () {
    audio("assets/sounds/cancelMenu.mp3");
    modsmodal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == helpmodal) {
        helpmodal.style.display = "none";
        audio("assets/sounds/cancelMenu.mp3");
    }
    else if (event.target == modsmodal) {
        modsmodal.style.display = "none";
        audio("assets/sounds/cancelMenu.mp3");
    }
}

function audio(audio) {
    new Audio(audio).play();
}

function loadGame(game) {
    audio("assets/sounds/confirmMenu.mp3");
    try {
        document.getElementById("game").innerHTML = "";
        AudioContext = window.AudioContext || window.webkitAudioContext;
        AudioContext = new AudioContext();
        AudioContext.close();
    } catch (err) {
        
    }
    running = true;
    try {
        $.getScript(game, function (data, textStatus, jqxhr) {
            window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { capture: false, passive: false });
            if (typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio > 2) {
                var meta = document.getElementById("viewport");
                meta.setAttribute('content', 'width=device-width, initial-scale=' + (2 / window.devicePixelRatio) + ', user-scalable=no');
            }
            lime.embed("Funkin", "game", width, height, { parameters: {} });
        });
    } catch (error) {
        var details = "Whoops! An error has ocurred!\n\nIf you want to report the error, use these details:\n" + error.message;
        console.warn(details);
        alert(details);
    }
}