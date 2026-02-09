let teds = 0
let tedsPerClick = 1
let tedsPerSecond = 0
let multiplier = 1  
let multicounter = 1
let superPerSecond = 0
let m = 0
let k = 0
let s = 0
let st = 0
let pris = 100
let pris2 = 1500
let pris3 = 50
let pris4 = 5000
let pris5 = 5000000
let pris6 =100000000
let resetting=false
let megatedbutton = false
let china = false


const tedstag = document.getElementById("teds")
const pristag = document.getElementById("pris")
const pristag2 = document.getElementById("pris2")
const pristag3 = document.getElementById("pris3")
const pristag4 = document.getElementById("pris4")
const tpc = document.getElementById("tedsPerClick")
const tps = document.getElementById("tedsPerSecond")
const mc = document.getElementById("multiplier")
const multi = document.getElementById("multicounter")
const sps = document.getElementById("superPerSecond")
 

if (localStorage.getItem("userData")!=undefined){
    load()
}
 
function updateUI() {
  tedstag.textContent = "Total teds: " + Math.floor(teds)
  pristag.textContent = pris + " teds"
  pristag2.textContent = pris2 + " teds"
  pristag3.textContent = pris3 + " teds"
  pristag4.textContent = pris4 + " teds"
  tpc.textContent = k
  tps.textContent = s
  mc.textContent = m
  multi.textContent = "Multiplier: " + multiplier.toFixed(3) + "x"
  sps.textContent = st
}
 
function clicked() {
  teds += tedsPerClick * multiplier
  updateUI()
}
 
function upgrade() {
  if (teds >= pris) {
    teds -= pris
    tedsPerClick += 1
    pris = Math.floor(pris * 1.05)
    k++
    tpc.textContent = k
    updateUI()
  }
}
 
function upgrade2() {
  if (teds >= pris2) {
    teds -= pris2
    multiplier *= 1.2    
    multicounter *= 1.2
    pris2 = Math.floor(pris2 * 1.5)
    m++
    mc.textContent = m
    multi.textContent = "Multiplier: "+multicounter.toFixed(3)+"x"
    updateUI()
  }
}
 
function upgrade3() {
  if (teds >= pris3) {
    teds -= pris3
    tedsPerSecond += 1
    pris3 = Math.floor(pris3 * 1.12)
    s++
    tps.textContent = s
    updateUI()
  }
}
 
function upgrade4(){
    if (teds >= pris4) {
        teds -= pris4
        superPerSecond += 150
        pris4 = Math.floor(pris4 * 1.12)
        st++
        sps.textContent = st
        updateUI()
}
}





function load(){
  let data = localStorage.getItem("userData").split(",")
  tedsPerClick = +data[0]
  multiplier = +data[2]
  tedsPerSecond = +data[1]
  superPerSecond = +data[3]
  teds = +data[4]
  k = +data[5]
  m = +data[6]
  s = +data[7]
  st = +data[8]
  pris = +data[9]
  pris2 = +data[10]
  pris3 = +data[11]
  pris4 = +data[12]
  megatedbutton = data[13] === "true"
  if (megatedbutton === true) {
    let megadiv = document.getElementsByClassName("megated")
    for (let i = 0; i < megadiv.length; i++) {
      megadiv[i].remove()
    }
  }
  

  multicounter = multiplier
  updateUI()
}

function megated(){
    if(teds >= pris5) {
        teds -= pris5
        megatedbutton = true
        
        let megadiv = document.body.getElementsByClassName("megated")
        for(let i=0; i<megadiv.length;i++){
            megadiv[i].remove()
        }
        multiplier *= 10
        updateUI()
    }
} 
function chinated(){
  if (teds >= pris6){
    teds -=pris6
    china = true

  }
}

function deletesave() {
  if (confirm("vill du radera eller inte jao.")) {
    resetting=true
    localStorage.removeItem("userData")
    alert("Save deleted.");
    alert(localStorage.getItem("userData"))
    location.reload();
  }
}
 
function save(){
    if (resetting){return null}
  localStorage.setItem("userData",[tedsPerClick,tedsPerSecond,multiplier,superPerSecond,teds,k,m,s,st,pris,pris2,pris3,pris4, megatedbutton])
}

setInterval(() => {
    teds += tedsPerSecond * multiplier
    teds += superPerSecond * multiplier
    updateUI()
    if (teds >= 1000000) {
      document.getElementById("ted").src = "gojo.png"
      document.getElementById("palm").src = "void.png"
    }
    if(megatedbutton == true){
            document.getElementById("ted").src = "Nega.png"
            document.getElementById("palm").src = "jungle.png"
       
    }
    if(china == true){
      document.getElementById("ted").src = "ching.png"
      document.getElementById("palm").src = "chinahouse.png"
 
}
    save()
   
  }, 1000)
updateUI()