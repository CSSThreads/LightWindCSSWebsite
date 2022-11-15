<script>
    import './404.css'

    let h1Class = 'hvr:color>#E98EEA cursor>pointer'
</script>
<div id="container">
    <div class="w>100% h>100% display>flex justify-content>center align-items>center flex-direction>column">
        <div class="w>300px font-size>20px">&#60;<span class="color>#fa8e8e">h1</span> <span class="color>#fac68e">class</span>="<span class="color>#93fa8e outline>none" spellcheck="false" contenteditable="true" bind:innerHTML={h1Class}></span>"></div>
        <h1 class={h1Class.replaceAll('&gt;', '>')}>404 Not found</h1>
        <div class="w>300px font-size>20px">&#60;/<span class="color>#fa8e8e">h1</span>></div>
        <div class="flex gap>20px font-size>18px mt>30px"><a href="/">Home</a><a href="/documentation">Documentation</a></div>
    </div>
</div>