// ==UserScript==
// @name         r/place assistant
// @version      0.2
// @author       Esryok
// @run-at       document-ready
// @namespace    http://tampermonkey.net/
// @description  Monitor and guide pixel placement
// @match        https://hot-potato.reddit.com/embed*
// @grant        none
// @updateURL    https://github.com/Esryok/r-place/raw/main/overlay.user.js
// @downloadURL  https://github.com/Esryok/r-place/raw/main/overlay.user.js
// ==/UserScript==

// load from server?
const images = [{
    url: "https://raw.githubusercontent.com/Esryok/r-place/main/overlays/serials.png",
    left: 1724,
    top: 1255
},{
    url: "https://raw.githubusercontent.com/Esryok/r-place/main/overlays/pgte.png",
    left: 934,
    top: 519
}]

function overlayImage(elem, imageConfig) {
    console.log(elem, imageConfig)
    const image = document.createElement("img");
    image.src = imageConfig.url;
    image.onload = () => {
        image.style = `position: absolute; left: ${imageConfig.left}px; top: ${imageConfig.top}px; width: ${image.width/3}px; height: ${image.height/3}px; image-rendering: pixelated; z-index: 1`;
    };
    elem.appendChild(image);
}

if (window.top !== window.self) {
    window.addEventListener('load', () => {
        // find root container
        const root = document.querySelector("mona-lisa-embed")
            .shadowRoot.querySelector("mona-lisa-camera")
            .querySelector("mona-lisa-canvas")
            .shadowRoot.querySelector('.container');

        // Add the image as overlay
        for (var config of images) {
            overlayImage(root, config);
        }
    }, false);
}