let teds = 0
let tedsPerClick = 1
let tedsPerSecond = 0
let multiplier = 1  
let superPerSecond = 0
let multiplierCount = 0
let clickCount = 0
let perSecondCount = 0
let superCount = 0
let luckychance = 0
let clickPrice = 50   
let multiplierPrice = 500  
let perSecondPrice = 50  
let superPrice = 2500  
let littletedPrice = 100000
let megatedPrice = 5000000 
let chinatedPrice = 3000000000 
let gatoPrice = 600000000000
let intetedPrice = 5000000000000
let sigmaPrice = 500000000000000
let luckyPrice = 5000
let resetting = false
let littletedUnlocked = false
let megatedUnlocked = false
let chinaUnlocked = false
let gatoUnlocked = false
let fattedUnlocked = false
let sigmaUnlocked = false
let luckyClickUnlocked = false
document.getElementsByClassName("upgrades")[0].classList.toggle("hidden")

const tedstag = document.getElementById("teds")
const clickPriceTag = document.getElementById("clickPrice")
const multiplierPriceTag = document.getElementById("multiplierPrice")
const perSecondPriceTag = document.getElementById("perSecondPrice")
const superPriceTag = document.getElementById("superPrice")
const clickCountTag = document.getElementById("tedsPerClick")
const perSecondCountTag = document.getElementById("tedsPerSecond")
const multiplierCountTag = document.getElementById("multiplier")
const multiplierDisplayTag = document.getElementById("multicounter")
const superCountTag = document.getElementById("superPerSecond")
const luckyCountTag = document.getElementById("luckychance")
function removeByClass(className) {
  const elements = document.getElementsByClassName(className)
  for (let i = elements.length - 1; i >= 0; i--) {
    elements[i].remove()
  }
}

function formatNumber(num) {
  if (num >= 1e18) return (num / 1e18).toFixed(2) + "QU"
  if (num >= 1e15) return (num / 1e15).toFixed(2) + "Q"
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T"
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
  if (num % 1 !== 0) return num.toFixed(2)
  return num.toString()
}
 
if (localStorage.getItem("userData") !== null){
    load()
}
 
function updateUI() {
  tedstag.textContent = "Total teds: " + formatNumber(teds)
  clickPriceTag.textContent = formatNumber(clickPrice) + " teds"
  multiplierPriceTag.textContent = formatNumber(multiplierPrice) + " teds"
  perSecondPriceTag.textContent = formatNumber(perSecondPrice) + " teds"
  superPriceTag.textContent = formatNumber(superPrice) + " teds"
  clickCountTag.textContent = clickCount
  perSecondCountTag.textContent = perSecondCount
  multiplierCountTag.textContent = multiplierCount
  multiplierDisplayTag.textContent = "Multiplier: " + formatNumber(multiplier) + "x"
  superCountTag.textContent = superCount
  luckyCountTag.textContent = "Lucky Chance: " + Math.round(luckychance * 100) + "%"
  let luckyPriceTag = document.getElementById("luckyPrice")
  if (luckyPriceTag) {
    luckyPriceTag.textContent = formatNumber(luckyPrice) + " teds"
  }
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
  if (teds >= clickPrice) {
    teds -= clickPrice
    tedsPerClick += 1
    clickPrice = Math.floor(clickPrice * 1.2) 
    clickCount++
    updateUI()
  }
}
 
function upgrade2() {
  if (teds >= multiplierPrice) {
    teds -= multiplierPrice
    multiplier *= 1.2    
    multiplierPrice = Math.floor(multiplierPrice * 1.7) 
    multiplierCount++
    updateUI()
  }
}
 
function upgrade3() {
  if (teds >= perSecondPrice) {
    teds -= perSecondPrice
    tedsPerSecond += 1
    perSecondPrice = Math.floor(perSecondPrice * 1.25) 
    perSecondCount++
    updateUI()
  }
}
 
function upgrade4(){
    if (teds >= superPrice) {
        teds -= superPrice
        superPerSecond += 150
        superPrice = Math.floor(superPrice * 1.25) 
        superCount++
        updateUI()
    }
}

function upgradeLucky(){
  if (teds >= luckyPrice){
    teds -= luckyPrice
    luckyClickUnlocked = true
    luckychance = Math.round((luckychance + 0.05) * 100) / 100
    luckyPrice = Math.floor(luckyPrice * 1.5)
    if (luckychance >= 0.50){
      alert("maximal tur!")
      removeByClass("luckyteds")
    }
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
  clickCount = +data[5]
  multiplierCount = +data[6]
  perSecondCount = +data[7]
  superCount = +data[8]
  clickPrice = +data[9]
  multiplierPrice = +data[10]
  perSecondPrice = +data[11]
  superPrice = +data[12]
  megatedUnlocked = data[13] === "true"
  chinaUnlocked = data[14] === "true"
  gatoUnlocked = data[15] === "true"
  fattedUnlocked = data[16] === "true"
  luckyClickUnlocked = data[17] === "true"
  luckyPrice = +data[18] || 5000
  luckychance = +data[19] || 0
  sigmaUnlocked = data[20] === "true"
  littletedUnlocked = data[21] === "true"
  if (littletedUnlocked) {
    removeByClass("littleted")
  }
  if (megatedUnlocked || chinaUnlocked || gatoUnlocked || fattedUnlocked || sigmaUnlocked) {
    removeByClass("megated")
  }
  if (chinaUnlocked || fattedUnlocked || sigmaUnlocked) {
    removeByClass("chinated")
  }
  if (gatoUnlocked || fattedUnlocked || sigmaUnlocked) {
    removeByClass("gato")
  }
  if (fattedUnlocked || sigmaUnlocked) {
    removeByClass("inteted")
  }
  if (sigmaUnlocked) {
    removeByClass("sigmated")
  }
  if (luckychance >= 0.50) {
    removeByClass("luckyteds")
  }
  updateUI()
}

function littleted(){
  if (teds >= littletedPrice){
    teds -= littletedPrice
    littletedUnlocked = true
    removeByClass("littleted")
    multiplier *= 5
    updateUI()
  }
}

function megated(){
    if(teds >= megatedPrice) {
        teds -= megatedPrice
        megatedUnlocked = true
        removeByClass("megated")
        multiplier *= 2
        updateUI()
    }
} 
function chinated(){
  if (teds >= chinatedPrice){
    teds -= chinatedPrice
    chinaUnlocked = true
    removeByClass("chinated")
    multiplier *= 50
    updateUI()
  }
}
function gatoted(){
  if (teds >= gatoPrice){
    teds -= gatoPrice
    gatoUnlocked = true
    removeByClass("gato")
    multiplier *= 200
    updateUI()
  }
}

function inteted(){
  if (teds >= intetedPrice){
    teds -= intetedPrice
    fattedUnlocked = true
    removeByClass("inteted")
    multiplier *= 1000
    updateUI()
  }
}

function sigmated(){
  if (teds >= sigmaPrice){
    teds -= sigmaPrice
    sigmaUnlocked = true
    removeByClass("sigmated")
    multiplier *= 5000
    updateUI()
  }
}

function deletesave() {
  if (confirm("vill du radera eller inte jao.")) {
    resetting = true
    clearInterval(gameLoop)
    localStorage.removeItem("userData")
    alert("Save deleted.")
    location.reload()
  }
}
 
function save(){
    if (resetting){return null}
  localStorage.setItem("userData",[tedsPerClick,tedsPerSecond,multiplier,superPerSecond,teds,clickCount,multiplierCount,perSecondCount,superCount,clickPrice,multiplierPrice,perSecondPrice,superPrice, megatedUnlocked, chinaUnlocked, gatoUnlocked, fattedUnlocked, luckyClickUnlocked, luckyPrice, luckychance, sigmaUnlocked, littletedUnlocked])
}

const gameLoop = setInterval(() => {
    let passive = (tedsPerSecond + superPerSecond) * multiplier
    if (luckyClickUnlocked && Math.random() < luckychance) {
      passive *= 10
    }
    teds += passive
    updateUI()
    
    if(littletedUnlocked == true){
      document.getElementById("ted").src = "little.png"
      document.getElementById("palm").src = "kinder.png"
    }

    if (teds >= 1000000) {
      document.getElementById("ted").src = "gojo.png"
      document.getElementById("palm").src = "void.png"
    }
 
    if(megatedUnlocked == true){
            document.getElementById("ted").src = "Nega.png"
            document.getElementById("palm").src = "jungle.png"
    }
    if(chinaUnlocked == true){
      document.getElementById("ted").src = "ching.png"
      document.getElementById("palm").src = "chinahouse.png"
    }
    if(gatoUnlocked == true){
      document.getElementById("ted").src = "gato.png"
      document.getElementById("palm").src = "swedish.png"
    }
    if(fattedUnlocked == true){
      document.getElementById("ted").src = "bigted.png"
      document.getElementById("palm").src = "donken.png"
    }
    if(sigmaUnlocked == true){
      document.getElementById("ted").src = "blackpill.png"
      document.getElementById("palm").src = "sigmabackground.png"
    }

    save()
}, 1000)
updateUI()
