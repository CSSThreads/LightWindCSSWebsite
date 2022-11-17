<script>
    import { onMount } from 'svelte';
    import './page.css'
  
    let scrollTop = 0;
    let top = -80;

    
    var HttpReq = new XMLHttpRequest();
    HttpReq.open("GET", 'https://api.github.com/orgs/LightWindCSS/repos', false);
    HttpReq.send(null);
    let githubStats = JSON.parse(HttpReq.responseText)
    githubStats =  githubStats.filter((e) => e.name == 'LightWindCSS')[0]

    let content = `<h1 class="font-size>60px"> Hello </h1> 
  
<b class="color>#fa8e8e mr>20px font-size>40px hvr:color>#8ed2fa cursor>none transition>0.5s"> Welcome! </b>  In the LIghtWindCSS <a class="text-decoration>none font-size>20px hover:font-size>25px transition>0.5s" href="/documentation"><i class="color>#93fa8e cursor>pointer">documentation</i></a> here you will be able to learn new things.`
    let lines = content.split('\n')
  
    function Update() {
      var lines = content.split('\n')
      document.querySelector('#template').innerHTML = ''
      for (let i = 0; i < lines.length; i++) {
        let l = lines[i].split(' '), newl = [], tag = false
        for (let args of l) {
          args = args.replaceAll('<', '&#60;')
          for (let arg of args.split(' ')) {
            if (arg.startsWith('&#60;/')) {
              if (arg.endsWith('>')) {
                newl.push(`&#60;/<span class="color>#fa8e8e">${arg.slice(6, arg.length - 1)}</span>>`)
              }
              else {
                newl.push(`&#60;/<span class="color>#fa8e8e">${arg.slice(6, arg.length)}</span>`)
                tag = true
              }
            }
            else if (arg.startsWith('&#60;')) {
              if (arg.endsWith('>')) {
                newl.push(`&#60;<span class="color>#fa8e8e">${arg.slice(5, arg.length - 1)}</span>>`)
              }
              else {
                newl.push(`&#60;<span class="color>#fa8e8e">${arg.slice(5, arg.length)}</span>`)
                tag = true
              }
            }
            else if (tag) {
              if (!arg.includes('=')) {
                if (arg.endsWith('>')) {
                  newl.push(`<span class="color>#fac68e">${arg.slice(0, arg.length - 1)}</span>>`)
                  tag = false
                }
                else {
                  newl.push(`<span class="color>#fac68e">${arg}</span>`)
                }
              }
              else {
                if (arg.endsWith('>')) {
                  newl.push(`<span class="color>#fac68e">${arg.split('=')[0]}</span>=<span class="color>#93fa8e">${arg.split('=')[1].slice(0, arg.split('=')[1].length - 1)}</span>>`)
                  tag = false
                }
                else {
                  newl.push(`<span class="color>#fac68e">${arg.split('=')[0]}</span>=<span class="color>#93fa8e">${arg.split('=')[1]}</span>`)
                }
              }
            }
            else {
              newl.push(arg)
            }
          }
        }
        document.querySelector('#template').innerHTML += `<div class="min-height>38px mb>-19px w>100% relative grid grid-template-columns>50px_1fr"><span class="counter">${i + 1}</span><div class="w>calc(100%_-_0px)">
          <pre class="align>right" style="max-width: ${document.querySelector('textarea').offsetWidth - 53}px">
${newl.join(' ')}
          </pre>
        </div></div>`
      }
    }
    function scrollPage() {
  
      scrollTop = document.getElementById('container').scrollTop / (document.querySelector('main').offsetHeight + document.querySelector('header').offsetHeight - window.innerHeight) * 100
  
      top = document.getElementById('container').scrollTop - 80
    }
    function copyText() {
      navigator.clipboard.writeText(document.getElementById('include').innerText);
    }
  
    async function UpdateHeight(e) {
      document.querySelector('textarea').style.height = "1px"; 
      document.querySelector('textarea').style.height = (25+document.querySelector('textarea').scrollHeight)+"px";
    }
    async function UpdateSize() {
      for (let el of document.querySelectorAll('pre')) {
        el.style.maxWidth = `${document.querySelector('textarea').offsetWidth - 53}px`
      }
      UpdateHeight();
    }
  
    onMount(() => {
        Update()
        new ResizeObserver(() => { UpdateSize() }).observe(document.querySelector('textarea'))
    });
  </script>
  <div id="container" on:scroll={scrollPage} on:loadeddata={scrollPage}>
    <div class="w>calc(100%_-_50px) sm:w>calc(100%_-_250px) max-width>1000px absolute l>50% transform>translateX(-50%) h>100% pl>50px sm:pr>0px pr>50px">
      <div class="absolute top>{top}px l>0 w>5px h>calc({Math.floor(scrollTop)}%_+_160px) max-height>100% background>#E98EEA border-radius>0px_0px_10px_10px display>none sm:display>flex"></div>
      <header>
        <h1 id="h1-Welcome" class="flex flex-direction>column font-weight>400 italic"><span class="font-size>1.7em font-weight>700">Welcome</span> to the LightWindCSS documentation!</h1>
      </header>
      <main class="pb>20px">
        <h2 id="h2-GettingStarted" class="cursor>pointer"><a href="{window.location.href.split('#')[0]}#h2-GettingStarted">Getting started!</a></h2>
        <p>Before start it could be cool to know what LightWindCSS is. So it's a interpreted class generator, you write classes with a config file of shortcuts and it generate a style tag with all of your style in the head of your document.</p>
        <p>If you what to use it you can simply copy this line of code:</p>
  
        <div class="grid grid-template-columns>1fr_60px align-items>center gap>20px background>#422271 p>20px border-radius>20px w>calc(100%_-_60px)">
          <div id="include" class="overflow>auto">
            &#60;<span class="color>#fa8e8e">script</span> <span class="color>#fac68e">src</span>=<span class="color>#93fa8e">"https://lightwindcss.github.io/LightWindCSS/src/index.js"</span> <span class="color>#fac68e">lightwindsrc</span>=<span class="color>#93fa8e">"https://raw.githubusercontent.com/LightWindCss/LightWindCSS/main/src/lightTheme.json"</span>>&#60;/<span class="color>#fa8e8e">script</span>>
          </div>
          <span class="p>10px background>#E98EEA border-radius>10px cursor>pointer" on:click={copyText}><b>Copy</b></span>
        </div>

        <h2 id="h2-GithubStats" class="cursor>pointer"><a href="{window.location.href.split('#')[0]}#h2-GithubStats">Github stats</a></h2>
        <p>If the project have intressed you, go star the project on Github to let people know about LightWindCSS. You can view our repository by clicking on the star link just below, in the stats section.</p>
        <div class="background>#422271 w>calc(100%_-_65px) border-radius>20px pl>25px pr>25px pt>5px pb>27px grid gap>20px grid-template-columns>1fr_1fr">
          <div>
            <h3 class="text-align>center">Stats</h3>
            <div class="flex justify-content>space-around pt>5px pb>5px"><b class="cursor>pointer"><a href="https://github.com/LightWindCss/LightWindCSS/stargazers" target="_blank" rel="noopener noreferrer">{githubStats.stargazers_count} stars</a> ⭐</b><b class="cursor>pointer"><a href="https://github.com/LightWindCss/LightWindCSS/issues" target="_blank" rel="noopener noreferrer">{githubStats.open_issues_count} open issues</a> 📕</b><b class="cursor>pointer"><a href="https://github.com/LightWindCss/LightWindCSS/network/members" target="_blank" rel="noopener noreferrer">{githubStats.forks_count} forks</a> ✨</b></div>
          </div>
          <div>
            <h3 class="text-align>center">Topics</h3>
            <div class="flex justify-content>center gap>25px pt>5px pb>5px">
              {#each githubStats.topics as topic}
              <div class="p>10px border>2px_dashed_#E98EEA border-radius>10px cursor>pointer"><a href="https://github.com/topics/{topic}" target="_blank" rel="noopener noreferrer">{topic}</a></div>
              {/each}
            </div>
          </div>
        </div>
  
        <h2 id="h2-Playground" class="cursor>pointer"><a href="{window.location.href.split('#')[0]}#h2-Playground">Playground</a></h2>
        <p>Test LightWindCSS here! Use the classes as explained in the <a href="/documentation">documentation</a>. On the left side write your Html and use the class propriety to add your style classes. The result will be rendered on the right side.
        <div id="demoBox" class="counter-reset>i grid gap>20px grid-template-columns>1fr_1fr p>20px background>#422271 w>calc(100%_-_65px) h>700px border-radius>20px">
          <div class="overflow>auto relative w>100%">
            <textarea spellcheck="false" id="editor" class="pl>51px white-space>normal resize>none absolute z-index>10 w>calc(100%_-_65px) resize>none opacity>1 color>transparent background>transparent outline>none border>none caret-color>white text-align>left" style="min-height: 200px;" bind:value={content} on:input={() => { Update() }} on:keydown={UpdateHeight}></textarea>
            <div id="template" class="absolute mt>3px white-space>normal ml>3px w>calc(100%_-_17px)">
            </div>
          </div>
          <div id="demoHtmlResult" class="relative overflow>auto">
            {@html content}
          </div>
        </div>
      </main>
    </div>
  </div>
