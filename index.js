import{a as l,S as p,i as n}from"./assets/vendor-BSTwZ_tR.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="https://pixabay.com/api/",y="52251600-fd545eaf39516c2667db2508b";l.defaults.baseURL=g;function h(s){return l.get("",{params:{key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const c=document.querySelector(".gallery"),u=document.querySelector(".loader"),L=new p(".gallery a",{captionsData:"alt",captionPosition:"bottom",captions:!0,captionDelay:250});function b(s){const r=s.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:i,comments:m,downloads:f})=>`<li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img class="gallery-image" src="${o}" alt="${e}" />
            <div class="card">
          <ul class="card-list">
            <li class="card-item">Likes<p class="text">${t}</p></li>
            <li class="card-item">Views <p class="text">${i}</p></li>
            <li class="card-item">Comments <p class="text">${m}</p> </li>
            <li class="card-item">Downloads <p class="text">${f}</p></li>
          </ul>
        </div>
          </a>
        </li>`).join("");c.innerHTML=r,L.refresh()}function S(){c.innerHTML=""}function P(){u.classList.remove("is-hidden")}function w(){u.classList.add("is-hidden")}const d=document.querySelector("form");d.addEventListener("submit",x);function x(s){s.preventDefault();const r=s.currentTarget.elements["search-text"].value.trim();if(!r){n.warning({message:"Please enter a search term!"});return}S(),P(),h(r).then(o=>{const a=o.hits;if(a.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#fff",backgroundColor:"#ef4040",icon:""});return}b(a)}).catch(o=>{console.log(o),n.error({title:"Error",message:"Something went wrong. Please try again!"})}).finally(()=>{w(),d.reset()})}
//# sourceMappingURL=index.js.map
