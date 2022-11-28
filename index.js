import {linksData} from "./links.js";
console.log(linksData)

const detectMobile = new Promise((resolve, reject) => {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    let mobile = toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
    resolve (mobile)
})

function makeLinks(mobile) {
    const links = linksData.filter(link => link.show)
    let container = document.getElementById('main')
    links.forEach(link => {
        let id = link.id.concat('link')
        let div = document.createElement('div')
        let linkTag = document.createElement('a')
        div.setAttribute('id', id)
        div.classList.add('link-container')
        linkTag.setAttribute('href', (mobile) ? link.mobileLink : link.link,)
        linkTag.setAttribute('target', '_blank')
        linkTag.innerHTML = link.text
        div.appendChild(linkTag)
        container.appendChild(div)
    });
}

window.onload = async (event) => {
    console.log('loaded')
    detectMobile.then(async (value) => {
        makeLinks(value)
    })
}
