/* Spookhuis Game – Interactieve horror game
Auteur: [Nour Raian]
Over de gaem: De speler moet het spook vinden binnen 20 sec, anders volgt jumpscare.
*/
document.addEventListener("DOMContentLoaded", () => {
    const deurKnop = document.getElementById("deur-knop");
    const spookieImg = document.getElementById("spookie-img");
    const toggleAudio = document.getElementById("toggle-audio");
    const audio = document.getElementById("audio");
    const sounds = [
        document.getElementById("booha"),
        document.getElementById("ghost"),
        document.getElementById("psst"),
        document.getElementById("scream")
    ];
    let isPlaying = false;

    function showSection(sectionId) {
        document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
        document.getElementById(sectionId).classList.remove("hidden");
    }

    // Deur openen – speler klikt op deurknop en gaat naar spookkamer👻🚪
    deurKnop.addEventListener("click", () => {
        audio.play();
        setTimeout(() => {
            alert("The door creaks open... Do you dare to enter? 👻🚪");
            showSection("spookroom");
        }, 500);
    });

    let frames = [
        "afbeeldingen/deurmethand.png",
        "afbeeldingen/deur2.png",
        "afbeeldingen/deur3.png",
        "afbeeldingen/deur4.png",
        "afbeeldingen/deur5.png"
    ];

    spookieImg.addEventListener("click", () => {
        let index = 0;
        function nextFrame() {
            if (index >= frames.length) {
                showSection("boo");
                return;
            }
            spookieImg.src = frames[index];
            index++;
            setTimeout(nextFrame, 150);
        }
        nextFrame();
    });

    toggleAudio.addEventListener("click", () => {
        if (!isPlaying) {
            sounds.forEach(sound => sound.play());
            toggleAudio.textContent = "🔇 Stop geluid";
        } else {
            sounds.forEach(sound => sound.pause());
            toggleAudio.textContent = "🔊 Start geluid";
        }
        isPlaying = !isPlaying;
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const doos = document.getElementById("doos");
    const kast = document.getElementById("kast");
    const la = document.getElementById("la");

    let doosOpen = false;
    let kastOpen = false;
    let laStatus = 0;

    doos.addEventListener("click", () => {
        doos.src = doosOpen ? "afbeeldingen/doosdicht.png" : "afbeeldingen/doosopen.png";
        doosOpen = !doosOpen;
    });

    kast.addEventListener("click", () => {
        kast.src = kastOpen ? "afbeeldingen/kastdicht.png" : "afbeeldingen/kastopen.png";
        kastOpen = !kastOpen;
    });

    la.addEventListener("click", () => {
        if (laStatus === 0) {
            la.src = "afbeeldingen/laopen1.png";
            laStatus = 1;
        } else if (laStatus === 1) {
            la.src = "afbeeldingen/laopen2.png";
            laStatus = 2;
        } else {
            la.src = "afbeeldingen/ladicht.png";
            laStatus = 0;
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const spook = document.getElementById("spook");
    const happyspook = document.getElementById("happyspook");
    const jumpscare = document.getElementById("jumpscare");
    const melding = document.getElementById("melding");
    const restartBtn = document.getElementById("restart-btn");
    const popupOverlay = document.getElementById("popup-overlay");
    const popupBtn = document.getElementById("popup-ok");

    let bewegen;
    let verliesTimer;

    function startGame() {

        bewegen = setInterval(randomPositie, 500);
        // Timer voor verlies+ melding en jumbscare afbeelding en audio
        verliesTimer = setTimeout(() => {
            if (melding.textContent === "") {
                clearInterval(bewegen);
                spook.style.display = "none";
                jumpscare.style.display = "block";
                melding.textContent = "💀 Too late, spookies are gone, try again";
                const scareSound = new Audio("audio/jumbscare.mp3");
                scareSound.play();
                setTimeout(() => {
                    restartBtn.style.display = "block";
                }, 1000);
            }
        }, 20000);
    }

    function randomPositie() {
        const randomTop = Math.random() * 80;
        const randomLeft = Math.random() * 80;
        spook.style.top = randomTop + "%";
        spook.style.left = randomLeft + "%";
    }

    spook.addEventListener("click", () => {
        clearInterval(bewegen);
        clearTimeout(verliesTimer);
        spook.style.display = "none";
        happyspook.style.display = "block";
        melding.textContent = "🎉 Gotcha! You've caught the spookie";
        setTimeout(() => {
            restartBtn.style.display = "block";
        }, 500);
    });

    restartBtn.addEventListener("click", () => {
        location.reload();
    });

// Spook en timer starten NA klikken op OK
    popupBtn.addEventListener("click", () => {
        popupOverlay.style.display = "none";
        startGame(); 
    });
});

