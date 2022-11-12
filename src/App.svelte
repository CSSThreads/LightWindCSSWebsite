<script>
  let scrollTop = 80;
  function scrollPage() {
    scrollTop = window.innerHeight * (document.getElementById('container').scrollTop / (document.querySelector('main').offsetHeight + document.querySelector('header').offsetHeight - window.innerHeight)) + 80;

    if (window.innerHeight <= scrollTop + 150)
      scrollTop = window.innerHeight
  }

  function copyText() {
    navigator.clipboard.writeText(document.getElementById('include').innerText);
  }
</script>
<div id="container" on:scroll={scrollPage} on:loadeddata={() => scrollTop = document.getElementById('container').scrollTop + 80}>
  <div class="w>calc(100%_-_50px) sm:w>calc(100%_-_250px) max-width>1000px absolute l>50% transform>translateX(-50%) h>100% pl>50px sm:pr>0px pr>50px">
    <div class="absolute w>4px h>100% l>0">
      <div class="relative w>100% h>{scrollTop}px max-width>300px background>#E98EEA border-radius>0px_0px_10px_10px display>none sm:display>flex"></div>
    </div>
    <header>
      <h1 class="flex flex-direction>column font-weight>400 italic"><span class="font-size>1.7em font-weight>700">Welcome</span> to the LightWindCSS documentation!</h1>
    </header>
    <main class="pb>20px">
      <h2>Getting started!</h2>
      <p>Before start it could be cool to know what LightWindCSS is. So it's a interpreted class generator, you write classes with a config file of shortcuts and it generate a style tag with all of your style in the head of your document.</p>
      <p>If you what to use it you can simply copy this line of code:</p>

      <div class="grid grid-template-columns>1fr_60px align-items>center gap>20px background>#422271 p>20px border-radius>20px w>calc(100%_-_65px)">
        <div id="include" class="overflow>auto">
          &#60;<span class="color>#fa8e8e">script</span> <span class="color>#fac68e">src</span>=<span class="color>#93fa8e">"https://lightwindcss.github.io/LightWindCSS/src/index.js"</span> <span class="color>#fac68e">lightwindsrc</span>=<span class="color>#93fa8e">"https://raw.githubusercontent.com/LightWindCss/LightWindCSS/main/src/lightTheme.json"</span>>&#60;/<span class="color>#fa8e8e">script</span>>
        </div>
        <span class="p>10px background>#E98EEA border-radius>10px cursor>pointer" on:click={copyText}><b>Copy</b></span>
      </div>

      <h2>dsdfs</h2>
    </main>
  </div>
</div>