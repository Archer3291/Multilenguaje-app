fetch("js/lang.json").then(function (response) {
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    return response.json()
}).then(function (json) {
    var lang = localStorage.getItem("lang")

    if (!lang) {
        localStorage.setItem("lang", "en")
        lang = localStorage.getItem("lang")
        getImage(document) 
    }
    function translateElements() {
        document.querySelectorAll(".lang").forEach(function (element) {
            var key = element.getAttribute("key");
            var attr = element.getAttribute("lang-placeholder")
            if (json[lang] && json[lang][key]) {
                if(element.type === "text")
                {
                    element.placeholder = json[lang][attr];
                    element.value = json[lang][key];
                }
                element.textContent = json[lang][key];
            } else {
                console.error(`Translation not available for key: ${key} in language: ${lang}`);
            }
        })
    }
    
    function  getImage(e){
        let flagIcon = e.querySelector(`#img-${lang}`).cloneNode(true)
        document.getElementById("selectedFlag").innerHTML = ""
        document.getElementById("selectedFlag").appendChild(flagIcon)
        localStorage.setItem("flag", flagIcon.outerHTML)    
    }
    
    translateElements()
    document.querySelectorAll(".dropdown-item").forEach(function (item) {
        item.addEventListener("click", function (event) {
            event.preventDefault()
            var selectedLang = this.getAttribute("data-lang")
            localStorage.setItem("lang", selectedLang)
            lang = selectedLang
            translateElements()
            getImage(this)
        })
    })

    document.getElementById("selectedFlag").innerHTML = localStorage.getItem("flag")
}).catch(function (error) {
    console.error("There was a problem with the fetch operation: " + error.message)
})