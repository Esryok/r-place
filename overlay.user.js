// ==UserScript==
// @name         r/place assistant
// @version      0.1
// @author       Esryok
// @namespace    http://tampermonkey.net/
// @description  Monitor and guide pixel placement
// @match        https://hot-potato.reddit.com/embed*
// @grant        none
// ==/UserScript==

// load from server?
const images = [{
    url: "https://raw.githubusercontent.com/Esryok/r-place/main/overlays/serials.png",
    left: 1765,
    top: 1385
},{
    url: "https://raw.githubusercontent.com/Esryok/r-place/main/overlays/pgte.png",
    left: 934,
    top: 519
}]

function overlayImage(elem, imageConfig) {
    const image = document.createElement("img");
    image.src = imageConfig.url;
    image.onload = () => {
        image.style = `position: absolute; left: ${imageConfig.left}; top: ${imageConfig.top}; width: ${image.width/3}px; height: ${image.height/3}px; image-rendering: pixelated; z-index: 1`;
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