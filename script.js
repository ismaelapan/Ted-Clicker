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
let luckychance = 0.05
let pris = 50   
let pris2 = 500  
let pris3 = 50  
let pris4 = 2500  
let pris5 = 50000 
let pris6 = 500000 
let pris7 = 5000000
let pris8 = 50000000
let pris9 = 5000
let resetting=false
let megatedbutton = false
let china = false
let gato = false
let fatted = false
let luckyClickUnlocked = false

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

function removeByClass(className) {
  const elements = document.getElementsByClassName(className)
  for (let i = elements.length - 1; i >= 0; i--) {
    elements[i].remove()
  }
}
 
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
  let damage = tedsPerClick * multiplier
  

  if (luckyClickUnlocked && Math.random() < luckychance) {
    damage *= 10
  }
  
  teds += damage
  updateUI()
}
 
function upgrade() {
  if (teds >= pris) {
    teds -= pris
    tedsPerClick += 1
    pris = Math.floor(pris * 1.2) 
    k++
    updateUI()
  }
}
 
function upgrade2() {
  if (teds >= pris2) {
    teds -= pris2
    multiplier *= 1.2    
    multicounter *= 1.2
    pris2 = Math.floor(pris2 * 1.7) 
    m++
    updateUI()
  }
}
 
function upgrade3() {
  if (teds >= pris3) {
    teds -= pris3
    tedsPerSecond += 1
    pris3 = Math.floor(pris3 * 1.25) 
    s++
    updateUI()
  }
}
 
function upgrade4(){
    if (teds >= pris4) {
        teds -= pris4
        superPerSecond += 150
        pris4 = Math.floor(pris4 * 1.25) 
        st++
        updateUI()
    }
}

function upgradeLucky(){
  if (teds >= pris9){
    teds -= pris9
    luckyClickUnlocked = true
    luckychance += 0.05
    updateUI()
  }
}
     if (luckychance >= 0.50){
  alert("maximal tur!")
    removeByClass("luckyteds")
    updateUI()
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
  china = data[14] === "true"
  gato = data[15] === "true"
  fatted = data[16] === "true"
  luckyClickUnlocked = data[17] === "true"
  if (megatedbutton === true || china === true || gato === true || fatted === true) {
    removeByClass("megated")
  }
  if (china === true || fatted === true) {
    removeByClass("chinated")
  }
  if (gato === true || fatted === true) {
    removeByClass("gato")
  }
  if (fatted === true) {
    removeByClass("inteted")
  }
  multicounter = multiplier
  updateUI()
}

function megated(){
    if(teds >= pris5) {
        teds -= pris5
        megatedbutton = true
        removeByClass("megated")
        multiplier *= 2
        updateUI()
    }
} 
function chinated(){
  if (teds >= pris6){
    teds -=pris6
    china = true
    removeByClass("chinated")
    multiplier *= 5
    updateUI()
  }
}
function gatoted(){
  if (teds >= pris7){
    teds -=pris7
    gato = true
    removeByClass("gato")
    multiplier *= 20
    updateUI()
  }
}

function inteted(){
  if (teds >= pris8){
    teds -= pris8
    fatted = true
    removeByClass("inteted")
    multiplier *= 100
    updateUI()
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
  localStorage.setItem("userData",[tedsPerClick,tedsPerSecond,multiplier,superPerSecond,teds,k,m,s,st,pris,pris2,pris3,pris4, megatedbutton, china, gato, fatted, luckyClickUnlocked])
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
      megatedbutton = false
    }
    if(gato == true){
      document.getElementById("ted").src = "gato.png"
      document.getElementById("palm").src = "swedish.png"
      megatedbutton = false
      china = false
    }
    if(fatted == true){
      document.getElementById("ted").src = "bigted.png"
      document.getElementById("palm").src = "donken.png"
      megatedbutton = false
      china = false
      gato = false
    }

    save()
}, 1000)
updateUI()
