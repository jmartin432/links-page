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
        let linkContainer = document.createElement('div')
        linkContainer.setAttribute('id', link.id.concat('-container'))
        linkContainer.classList.add('link-container')
        let linkTag = document.createElement('a')
        linkTag.setAttribute('href', (mobile) ? link.mobileLink : link.link,)
        linkTag.setAttribute('target', '_blank')
        linkTag.classList.add('link')
        linkTag.innerHTML = link.text
        linkContainer.appendChild(linkTag)
        container.appendChild(linkContainer)
    });
}

window.onload = async (event) => {
    console.log('loaded')
    detectMobile.then(async (value) => {
        makeLinks(value)
    })
}
