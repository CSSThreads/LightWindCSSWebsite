<script>
  let scrollTop = 0;
  let top = -80;
  let content = print('<span class="color>red">Write your HTML here!</span>')
  let lines = [content]

  function print(line) {
    let l = line, newl = [], tag = false;
    
    for (let args of l.split(' ')) {
      let tnewl = []
      args = args.replaceAll('<', ' &#60;').replaceAll('>', '> ')
      for (let arg of args.split(' ')) {
        if (arg.startsWith('&#60;/')) {
          if (arg.endsWith('>')) {
            tnewl.push()
          }
        }
      }
      newl.push(tnewl)
    }

    //print
    //l.replaceAll(' ', '<span class="white-space>pre"> </span>')
    return l;
  }
  function scrollPage() {
    //scrollTop = window.innerHeight * (document.getElementById('container').scrollTop / (document.querySelector('main').offsetHeight + document.querySelector('header').offsetHeight - window.innerHeight)) + 80;

    scrollTop = document.getElementById('container').scrollTop / (document.querySelector('main').offsetHeight + document.querySelector('header').offsetHeight - window.innerHeight) * 100

    top = document.getElementById('container').scrollTop - 80
  }
  function copyText() {
    navigator.clipboard.writeText(document.getElementById('include').innerText);
  }
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

      <h2 id="h2-Playground" class="cursor>pointer"><a href="{window.location.href.split('#')[0]}#h2-Playground">Playground</a></h2>
      <p>Test LightWindCSS here! Change the classes with the next syntax: <b><i>(screen-selector:)(selector:)</i>&#60;value-only|key>value></b></p>
      <div id="demoBox" class="counter-reset>i grid gap>20px grid-template-columns>1fr_1fr p>20px background>#422271 w>calc(100%_-_65px) h>700px border-radius>20px">
        <div class="overflow>hidden relative w>100%">
          <textarea id="editor" class="pl>51px white-space>normal resize>none absolute z-index>10 w>calc(100%_-_65px) h>calc(100%_-_10px) color>#000 opacity>0.3 text-align>left" bind:value={content} on:input={() => lines = content.split('\n')}></textarea>
          <div class="absolute mt>3px ml>3px w>100%">
            {#each lines as line, i}
              <div class="w>calc(100%_-_15px) grid grid-template-columns>50px_1fr"><span class="text-align>right pr>10px w>40px display>inline-block opacity>0.5">{i + 1}</span><div class="w>100%">{@html print(line)}</div></div>
            {/each}
          </div>
        </div>
        <div id="demoHtmlResult" class="relative overflow>auto">
          {@html content}
        </div>
      </div>
    </main>
  </div>
</div>
