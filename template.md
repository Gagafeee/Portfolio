## Project template
```HTML
<li id="project_$PROJECT$">
    <div class="card glassy">
        <header>
            <div>
                <img src="./assets/static/projects/$project$/icon.png" width="50" height="50"
                     alt="Icon du projet $PROJECT$">
                <h2>$PROJECT$</h2>
            </div>
            <div class="links-container">
                <a href="#project_$project$" onclick="copyCurrentURL()">
                    <i class="fi fi-rr-link"></i>
                </a>
            </div>
        </header>
        <div class="description">
            <p>Lorem ipsum dolor sit amet <a class="extend_button">Voir plus</a></p>
            <h3>Title : </h3>
        </div>
        <footer>
            <div class="info_container">
                <div class="time">
                    <i class="fi fi-rr-clock-five"></i>
                    <p>TIMEh</p>
                </div>
                <div class="date">
                    <i class="fi fi-rr-calendar"></i>
                    <p>YEAR</p>
                </div>
            </div>
            <div class="tech_container">
                <a href="https://typescriptlang.org" target="_blank">
                    <img src="./assets/static/technologies/TS.png" alt="Logo du language Typescript"
                         width="40" height="40"/></a>
            </div>
        </footer>
    </div>
    <img class="illustration" src="./assets/static/projects/$project$/illustration-min.png"
         alt="Illustration du projet $PROJECT$">
    <svg class="background" viewBox="0 0 100 100" preserveAspectRatio="xMidYMin slice">
        <circle class="light" cx="78" cy="35" r="25" style="fill: #fff; opacity: 0.6"/>
        <circle class="sphere" cx="78" cy="35" r="25"/>
    </svg>
</li>
```


## Techno templates

NextJs
```HTML
<a href="https://nextjs.org" target="_blank"><img src="./assets/static/technologies/nextjs.png" alt="Logo du framework Next.Js" width="40" height="40"/></a>
```
Antd
```HTML
<a href="https://ant.design" target="_blank"><img src="./assets/static/technologies/antdesign.png" alt="Logo de la librairie Ant Design" width="40" height="40"/></a>
```
TS
```HTML
<a href="https://typescriptlang.org" target="_blank"><img src="./assets/static/technologies/TS.png" alt="Logo du language Typescript" width="40" height="40"/></a>
```
## Techno card
Figma
```HTML
<a class="techno_card" href="https://www.figma.com/fr-fr/" target="_blank">
    <img src="./assets/static/technologies/figma.svg" height="23" alt="Icon du logiciel Figma">
    Figma
</a>
```
Nextjs
```HTML
<a class="techno_card" href="https://nextjs.org" target="_blank">
    <img src="./assets/static/technologies/nextjs.png" height="25" alt="Icon du framework Next.js">
    Next.js
</a>
```
React
```HTML
<a class="techno_card" href="https://react.com" target="_blank">
    <img src="./assets/static/technologies/react.png" height="25" alt="Icon du framework React">
    React
</a>
```
Node
```HTML
<a class="techno_card" href="https://nodejs.org/fr" target="_blank">
    <img src="./assets/static/technologies/nodejs.svg" height="25" alt="Icon de framework NodeJs">
    NodeJs
</a>
```
Github
```HTML
<a class="techno_card" href="https://github.com" target="_blank">
    <img src="./assets/static/technologies/github.svg" height="25" alt="Icon du site Github">
    Github
</a>
```
```HTML
<a class="techno_card" href="https://ant.design" target="_blank">
    <img src="./assets/static/technologies/antdesign.png" height="25"
         alt="Icon de la librairie Ant design">
    Ant design
</a>
```