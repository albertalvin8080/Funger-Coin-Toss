"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector("#display");
    const source = display.querySelector("source");

    const options = document.querySelector(".options");
    const tails = document.querySelector("#tails");
    const heads = document.querySelector("#heads");

    let current = heads;
    let previous = tails;

    function changeSelected(evt) {
        if (evt?.target === current) return;

        const aux = previous;
        current.classList.remove("selected");
        aux.classList.add("selected");

        previous = current;
        current = aux;
    }

    function fire(evt, keyboard = false) {
        if (!keyboard) changeSelected(evt);

        options.classList.add("hidden");
        display.classList.remove("hidden");
        const option = current.id;

        const randomByte = new Uint8Array(1);
        crypto.getRandomValues(randomByte);
        // even = heads, odd = tails
        const isHeads = (randomByte[0] & 1) === 0;

        if (isHeads) {
            source.src = "assets/heads.mp4";
        } else {
            source.src = "assets/tails.mp4";
        }

        display.load();
        display.play().catch(err => {
            console.warn("Video couldn't autoplay:", err);
        });
        display.onended = () => {
            display.classList.add("hidden");
            options.classList.remove("hidden");
        };
    }

    heads.addEventListener("mouseenter", changeSelected);
    tails.addEventListener("mouseenter", changeSelected);
    heads.addEventListener("pointerdown", fire);
    tails.addEventListener("pointerdown", fire);

    window.addEventListener("keydown", (evt) => {
        if (evt.key === "ArrowDown" || evt.key === "ArrowUp") {
            changeSelected(evt);
        }
        else if (evt.key === "Enter") {
            fire(evt, true);
        }
    });
});