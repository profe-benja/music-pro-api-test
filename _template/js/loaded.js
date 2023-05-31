class LoaderHTML {
    constructor(templateFile, pageFile) {
        this.templateFile = templateFile;
        this.pageFile = pageFile;
    }
    
    loadHTML(url) {
        return fetch(url).then(response => response.text());
    }

    load() {
        Promise.all([
            this.loadHTML(this.templateFile.header),
            this.loadHTML(this.templateFile.body),
            this.loadHTML(this.pageFile)
        ]).then(([headerHTML, bodyHTML, contenidoHTML]) => {
            document.head.innerHTML = headerHTML;

            // const bodyElement = document.createElement('div');
            // bodyElement.innerHTML = bodyHTML;
            // document.body.appendChild(bodyElement);
            document.body.innerHTML = bodyHTML;

            const contenidoElement = document.createElement('div');
            contenidoElement.innerHTML = contenidoHTML;
            document.getElementById('app').appendChild(contenidoElement);
        }).catch(error => {
            console.error('Error al cargar los archivos HTML:', error);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const pageURL = url.origin;
    const _PAGE = '_'+ pathname.split('/').pop();

    const _TEMPLATE = {
        header: pageURL + '/_template/_header.html',
        body: pageURL + '/_template/_body.html'
    };


    const templateLoader = new LoaderHTML(_TEMPLATE,_PAGE);
    templateLoader.load();
});
