// to load unofficial theme the user have to download LightWindCSS to local and do changes there in the lightTheme.json
import lightWindTheme from './lightTheme.json' assert {type: 'json'}

let LightJsClasses, lightWindCssConfig = lightWindTheme.default;

window.addEventListener('load', () => {
    // Init style tag where data = lightwindcss
    let styleLightWind = document.createElement('style');
    styleLightWind.setAttribute('data', 'lightwindcss');
    document.head.appendChild(styleLightWind);

    // Getting all classes
    LightJsClasses = getAllClasses()

    // create style tag with all the content
    for (let i in LightJsClasses) {
        let classParams = LightJsClasses[i].split(':');

        let styleStr = ``;
        let breakPointOpen = false;

        // getting the breakpoint

        for (let k in lightWindCssConfig.breakpoints.screens) {
            if (lightWindCssConfig.breakpoints.screens[k].name == classParams[0]) {
                if (lightWindCssConfig.breakpoints.screens[k].min == null) {
                    styleStr += `@media screen and (max-width: ${lightWindCssConfig.breakpoints.screens[k].max}) { `;
                    breakPointOpen = true;
                }
                else if (lightWindCssConfig.breakpoints.screens[k].max == null) {
                    styleStr += `@media screen and (min-width: ${lightWindCssConfig.breakpoints.screens[k].min}) { `;
                    breakPointOpen = true;
                }
                else {
                    styleStr += `@media screen and (min-width: ${lightWindCssConfig.breakpoints.screens[k].min}) and (max-width: ${lightWindCssConfig.breakpoints.screens[k].max}) {`;
                    breakPointOpen = true;
                }
                break;
            }
        }

        styleStr += `.${LightJsClasses[i].replace(/\:/g, '\\:').replace(/\[/g, '\\[').replace(/\]/g, '\\]')}`

        for (let j = 0; j < classParams.length - 1; j++) {
            // selectors
            if (breakPointOpen && j == 0)
                j++;
            
            for (let k = 0; k < lightWindCssConfig.selectors[':'].length; k++) {
                if (lightWindCssConfig.selectors[':'][k].name == classParams[j] || lightWindCssConfig.selectors[':'][k].alias.indexOf(classParams[j]) != -1) {
                    styleStr += `:${lightWindCssConfig.selectors[':'][k].selector}`
                }
            }
            for (let k = 0; k < lightWindCssConfig.selectors['::'].length; k++) {
                if (lightWindCssConfig.selectors['::'][k].name == classParams[j] || lightWindCssConfig.selectors['::'][k].alias.indexOf(classParams[j]) != -1) {
                    styleStr += `::${lightWindCssConfig.selectors['::'][k].selector}`
                }
            }
        }

        styleStr += "{"
        
        /* ==========================================================================================
        Proprieties defining statred
        ========================================================================================== */ 

        let isFound = false;
        for (let k = 0; k < lightWindCssConfig.proprieties.light.length; k++) {
            if (isFound)
                break;
            if (classParams[classParams.length - 1].split('-')[0] == lightWindCssConfig.proprieties.light[k].name) {
                let value = classParams[classParams.length - 1].split('-')[1]
                for (let l = 2; l < classParams[classParams.length - 1].split('-').length; l++) {
                    value += classParams[classParams.length - 1].split('-')[l]
                }
                value = value.substr(1, value.length - 2)

                lightWindCssConfig.proprieties.light[k].proprieties.forEach(el => {
                    styleStr += `${el}: ${value};`
                })

                isFound = true;
            }
        }

        for (let k = 0; k < lightWindCssConfig.proprieties.global.length; k++) {
            if (isFound)
                break;
            if (lightWindCssConfig.proprieties.global[k]["value-only"]) {
                if (lightWindCssConfig.proprieties.global[k].values.indexOf(classParams[classParams.length - 1].split('-')[0]) != -1) {
                    styleStr += `${lightWindCssConfig.proprieties.global[k].propriety}: ${classParams[classParams.length - 1].split('-')[0]}`
                    isFound = true;
                }
            }
            else {
                // with value to resolve
                if (classParams[classParams.length - 1].split('-')[0] == lightWindCssConfig.proprieties.global[k].propriety || lightWindCssConfig.proprieties.global[k].alias.indexOf(classParams[classParams.length - 1].split('-')[0]) != -1) {
                    let value = classParams[classParams.length - 1].split('-')[1]
                    for (let l = 2; l < classParams[classParams.length - 1].split('-').length; l++) {
                        value += classParams[classParams.length - 1].split('-')[l]
                    }
                    value = value.substr(1, value.length - 2)
                    styleStr += `${lightWindCssConfig.proprieties.global[k].propriety}: ${value}`
                    isFound = true;
                }
            }
        }

        if (!isFound) {
            let value = classParams[classParams.length - 1].split('-')[1]
            for (let l = 2; l < classParams[classParams.length - 1].split('-').length; l++) {
                value += classParams[classParams.length - 1].split('-')[l]
            }
            value = value.substr(1, value.length - 2)

            styleStr += `${classParams[classParams.length - 1].split('-')[0]}: ${value}`;
        }

        /* ==========================================================================================
        Proprieties defining ended
        ========================================================================================== */ 

        styleStr += ";}"

        if (breakPointOpen)
            styleStr += '}'

        styleLightWind.innerText += styleStr
    }

    // observing the DOM
    lightObserve(LightJsClasses)
})

// classes observation functions
function lightObserve(classes) {
    new MutationObserver((mutations) => {
        let styleLightWind = document.head.querySelector("style[data=\"lightwindcss\"]")

        for (let i in mutations) {
            // in case of the element creation
            mutations[i].addedNodes.forEach(el => {
                el.classList.forEach(cel => {
                    if (classes.indexOf(cel) === -1) {
                        classes.push(cel)
                        let classParams = cel.split(':');
                        for (let j in cel.split(':')) {
                            let temp = cel.split(':')[j]
                            classParams = temp.split('-')
                        }
                        console.log(classParams)
                    }
                })
            })
            // in case of the element class addition
            mutations[i].target.classList.forEach(el => {
                if (classes.indexOf(el) === -1) {
                    classes.push(el)

                    // ========================================================================================================
                    // ========================================================================================================

                    let classParams = el.split(':');

                    let styleStr = ``;
                    let breakPointOpen = false;

                    // getting the breakpoint

                    for (let k in lightWindCssConfig.breakpoints.screens) {
                        if (lightWindCssConfig.breakpoints.screens[k].name == classParams[0]) {
                            if (lightWindCssConfig.breakpoints.screens[k].min == null) {
                                styleStr += `@media screen and (max-width: ${lightWindCssConfig.breakpoints.screens[k].max}) { `;
                                breakPointOpen = true;
                            }
                            else if (lightWindCssConfig.breakpoints.screens[k].max == null) {
                                styleStr += `@media screen and (min-width: ${lightWindCssConfig.breakpoints.screens[k].min}) { `;
                                breakPointOpen = true;
                            }
                            else {
                                styleStr += `@media screen and (min-width: ${lightWindCssConfig.breakpoints.screens[k].min}) and (max-width: ${lightWindCssConfig.breakpoints.screens[k].max}) {`;
                                breakPointOpen = true;
                            }
                            break;
                        }
                    }

                    styleStr += `.${el.replace(/\:/g, '\\:').replace(/\[/g, '\\[').replace(/\]/g, '\\]')}`

                    for (let j = 0; j < classParams.length - 1; j++) {
                        // selectors
                        if (breakPointOpen && j == 0)
                            j++;
                        
                        for (let k = 0; k < lightWindCssConfig.selectors[':'].length; k++) {
                            if (lightWindCssConfig.selectors[':'][k].name == classParams[j] || lightWindCssConfig.selectors[':'][k].alias.indexOf(classParams[j]) != -1) {
                                styleStr += `:${lightWindCssConfig.selectors[':'][k].selector}`
                            }
                        }
                        for (let k = 0; k < lightWindCssConfig.selectors['::'].length; k++) {
                            if (lightWindCssConfig.selectors['::'][k].name == classParams[j] || lightWindCssConfig.selectors['::'][k].alias.indexOf(classParams[j]) != -1) {
                                styleStr += `::${lightWindCssConfig.selectors['::'][k].selector}`
                            }
                        }
                    }

                    styleStr += "{"
                    
                    /* ==========================================================================================
                    Proprieties defining statred
                    ========================================================================================== */ 

                    let isFound = false;
                    for (let k = 0; k < lightWindCssConfig.proprieties.global.length; k++) {
                        if (isFound)
                            break;
                        if (lightWindCssConfig.proprieties.global[k]["value-only"]) {
                            if (lightWindCssConfig.proprieties.global[k].values.indexOf(classParams[classParams.length - 1].split('-')[0]) != -1) {
                                styleStr += `${lightWindCssConfig.proprieties.global[k].propriety}: ${classParams[classParams.length - 1].split('-')[0]}`
                                isFound = true;
                            }
                        }
                        else {
                            // with value to resolve
                            if (classParams[classParams.length - 1].split('-')[0] == lightWindCssConfig.proprieties.global[k].propriety || lightWindCssConfig.proprieties.global[k].alias.indexOf(classParams[classParams.length - 1].split('-')[0]) != -1) {
                                let value = classParams[classParams.length - 1].split('-')[1]
                                for (let l = 2; l < classParams[classParams.length - 1].split('-').length; l++) {
                                    value += classParams[classParams.length - 1].split('-')[l]
                                }
                                value = value.substr(1, value.length - 2)
                                styleStr += `${lightWindCssConfig.proprieties.global[k].propriety}: ${value}`
                                isFound = true;
                            }
                        }
                    }

                    if (!isFound) {
                        let value = classParams[classParams.length - 1].split('-')[1]
                        for (let l = 2; l < classParams[classParams.length - 1].split('-').length; l++) {
                            value += classParams[classParams.length - 1].split('-')[l]
                        }
                        value = value.substr(1, value.length - 2)

                        styleStr += `${classParams[classParams.length - 1].split('-')[0]}: ${value}`;
                    }

                    /* ==========================================================================================
                    Proprieties defining ended
                    ========================================================================================== */ 

                    styleStr += ";}"

                    if (breakPointOpen)
                        styleStr += '}'

                    styleLightWind.innerText += styleStr
                }
            })
        }
    }).observe(document.querySelector('body'), { attributes: true, subtree: true, childList: true });
}
function getAllClasses() {
    let allClasses = [];
    let allElements = document.querySelectorAll('*');
    for (let i = 0; i < allElements.length; i++) {
        allElements[i].classList.value.split(' ').forEach(e => {
            if (e != '')
                allClasses.push(e)
        })
    }
    return allClasses;
}
