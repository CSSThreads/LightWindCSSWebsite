{
    // Init style tag where data = lightwindcss
    let styleLightWind = document.createElement('style');
    styleLightWind.setAttribute('data', 'lightwindcss');
    styleLightWind.textContent = ''
    document.head.appendChild(styleLightWind);

    let allClasses = [];

    async function resolveClass(className, res) {
        let classSubParams = className.split(':'), screenBreakPointOpen = false;

        for (i in classSubParams) {
            if (i == classSubParams.length - 1) {
                if (i == 0) 
                    styleLightWind.textContent += `.${className.replace(/\:/g, '\\:').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\>/g, '\\>').replace(/\//g, '\\/').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\%/g, '\\%').replace(/\-/g, '\\-').replace(/\+/g, '\\+').replace(/\*/g, '\\*').replace(/\,/g, '\\,').replace(/\|/g, '\\|')}`
                // value
                let name = classSubParams[i].split('>')[0], value = classSubParams[i].split('>')[1]
                try {
                    styleLightWind.textContent += `{`
                    if (typeof(value) == 'undefined') {
                        // value only
                        styleLightWind.textContent += `${res.proprieties.valueOnly[name].css}}`
                    }
                    else {
                        try {                                    
                            res.proprieties.valueKey[name].propriety.forEach(prop => {
                                styleLightWind.textContent += `${prop}:${res.values[res.proprieties.valueKey[name].values][value]};`
                            });

                            styleLightWind.textContent += `}`
                        }
                        catch {                                    
                            res.proprieties.valueKey[name].propriety.forEach(prop => {
                                styleLightWind.textContent += `${prop}:${value};`
                            });

                            styleLightWind.textContent += `}`
                        }
                    }
                } catch {
                    styleLightWind.textContent += `${name}:${value};}`
                }

                if (screenBreakPointOpen)
                    styleLightWind.textContent += '}'
            }
            else if (i == 0) {
                // screen + selector
                try {
                    // screen
                    if (res.screens[classSubParams[i]].min != null && res.screens[classSubParams[i]].max != null) 
                        styleLightWind.textContent += `@media screen and (min-width: ${res.screens[classSubParams[i]].min}) and (max-width: ${res.screens[classSubParams[i]].max}) {`
                    else if (res.screens[classSubParams[i]].min != null) 
                        styleLightWind.textContent += `@media screen and (min-width: ${res.screens[classSubParams[i]].min}) {`
                    else if (res.screens[classSubParams[i]].max != null) 
                        styleLightWind.textContent += `@media screen and (min-width: ${res.screens[classSubParams[i]].max}) {`

                    styleLightWind.textContent += `.${className.replace(/\:/g, '\\:').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\>/g, '\\>').replace(/\//g, '\\/').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\%/g, '\\%').replace(/\-/g, '\\-').replace(/\+/g, '\\+').replace(/\*/g, '\\*').replace(/\,/g, '\\,').replace(/\|/g, '\\|')}`
                    screenBreakPointOpen = true
                }
                catch {
                    // selector
                    styleLightWind.textContent += `.${className.replace(/\:/g, '\\:').replace(/\[/g, '\\[').replace(/\]/g, '\\]').replace(/\>/g, '\\>').replace(/\//g, '\\/').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/\%/g, '\\%').replace(/\-/g, '\\-').replace(/\+/g, '\\+').replace(/\*/g, '\\*').replace(/\,/g, '\\,').replace(/\|/g, '\\|')}`
                    try {
                        styleLightWind.textContent += `${res.selectors[classSubParams[i]].selector}`
                    } catch {}
                }
            }
            else {
                // selector
                try {
                    styleLightWind.textContent += `${res.selectors[classSubParams[i]].selector}`
                } catch {}
            }
        }
    }

    // mutations
    (async () => {
        var styleHttpReq = new XMLHttpRequest();
        styleHttpReq.open("GET", document.querySelector('[lightwindsrc]').getAttribute('lightwindsrc'), false);
        styleHttpReq.send(null);
        let res = JSON.parse(styleHttpReq.responseText)

        new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                try {
                    mutation.addedNodes.forEach(node => {
                        if (typeof(node.classList) != 'undefined') {
                            node.classList.forEach(elClass => {
                                if (allClasses.indexOf(elClass) == -1) {
                                    resolveClass(elClass, res)
                                    allClasses.push(elClass)
                                }
                            })
                        }
                    })
                } catch {}
            })
        }).observe(document, { subtree: true, childList: true });

        new MutationObserver(function(mutations) {
            try {
                mutations.forEach(mutation => {
                    mutation.target.classList.forEach(elClass => {
                        if (allClasses.indexOf(elClass) == -1) {
                            resolveClass(elClass, res)
                            allClasses.push(elClass)
                        }
                    })
                })
            } catch {}
        }).observe(document, { attributes: true, attributeFilter: ["class"], subtree: true });
    })()
}
