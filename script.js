
const state = {
  teds: 0,
  tedsPerClick: 1,
  tedsPerSecond: 0,
  multiplier: 1,
  superPerSecond: 0,
  multiplierCount: 0,
  clickCount: 0,
  perSecondCount: 0,
  superCount: 0,
  luckychance: 0,
  clickPrice: 50,
  multiplierPrice: 500,
  perSecondPrice: 5,
  superPrice: 500,
  littletedPrice: 10000,
  megatedPrice: 250000,
  chinatedPrice: 25000000,
  gatoPrice: 1000000000000000,
  intetedPrice: 100000000000000000,
  sigmaPrice: 10000000000000000000,
  luckyPrice: 5000,
  rebirthprice: 100000000000000000000,
  rebirthCount: 0,
  littletedUnlocked: false,
  megatedUnlocked: false,
  chinaUnlocked: false,
  gatoUnlocked: false,
  fattedUnlocked: false,
  sigmaUnlocked: false,
  luckyClickUnlocked: false,
}

let resetting = false
document.getElementsByClassName("upgrades")[0].classList.toggle("hidden")

const dom = {
  teds: document.getElementById("teds"),
  tedsPerSec: document.getElementById("tedsPerSec"),
  clickPrice: document.getElementById("clickPrice"),
  multiplierPrice: document.getElementById("multiplierPrice"),
  perSecondPrice: document.getElementById("perSecondPrice"),
  superPrice: document.getElementById("superPrice"),
  tedsPerClick: document.getElementById("tedsPerClick"),
  tedsPerSecond: document.getElementById("tedsPerSecond"),
  multiplier: document.getElementById("multiplier"),
  multicounter: document.getElementById("multicounter"),
  superPerSecond: document.getElementById("superPerSecond"),
  luckychance: document.getElementById("luckychance"),
  luckyPrice: document.getElementById("luckyPrice"),
  rebirthCount: document.getElementById("rebirthCount"),
  rebirthprice: document.getElementById("rebirthprice"),
  ted: document.getElementById("ted"),
  palm: document.getElementById("palm"),
  clickFeedback: document.getElementById("clickFeedback"),
  goldenTed: document.getElementById("goldenTed"),
  gatoPrice: document.getElementById("pris7"),
  intetedPrice: document.getElementById("pris8"),
  sigmaPrice: document.getElementById("sigmaPriceTag"),
}
function removeByClass(className) {
  const elements = document.getElementsByClassName(className)
  for (let i = elements.length - 1; i >= 0; i--) {
    elements[i].remove()
  }
}

function formatNumber(num) {
  if (num >= 1e36) return (num / 1e36).toFixed(2) + "U"
  if (num >= 1e33) return (num / 1e33).toFixed(2) + "D"
  if (num >= 1e30) return (num / 1e30).toFixed(2) + "N"
  if (num >= 1e27) return (num / 1e27).toFixed(2) + "O"
  if (num >= 1e24) return (num / 1e24).toFixed(2) + "SP"
  if (num >= 1e21) return (num / 1e21).toFixed(2) + "S"
  if (num >= 1e18) return (num / 1e18).toFixed(2) + "QU"
  if (num >= 1e15) return (num / 1e15).toFixed(2) + "Q"
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T"
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
  if (num % 1 !== 0) return num.toFixed(2)
  return num.toString()
}

function save() {
  if (resetting) return
  if (guldActive) {
    let realMultiplier = state.multiplier
    state.multiplier = guldOgMulti
    localStorage.setItem("userData", JSON.stringify(state))
    state.multiplier = realMultiplier
  } else {
    localStorage.setItem("userData", JSON.stringify(state))
  }
}

function load() {
  const raw = localStorage.getItem("userData")
  if (!raw) return
  try {
    const data = JSON.parse(raw)
    for (let key in data) {
      state[key] = data[key]
    }
  } catch (e) {
    localStorage.removeItem("userData")
    return
  }

  
  if (state.littletedUnlocked) removeByClass("littleted")
  if (state.megatedUnlocked || state.chinaUnlocked || state.gatoUnlocked || state.fattedUnlocked || state.sigmaUnlocked) removeByClass("megated")
  if (state.chinaUnlocked || state.fattedUnlocked || state.sigmaUnlocked) removeByClass("chinated")
  if (state.gatoUnlocked || state.fattedUnlocked || state.sigmaUnlocked) removeByClass("gato")
  if (state.fattedUnlocked || state.sigmaUnlocked) removeByClass("inteted")
  if (state.sigmaUnlocked) removeByClass("sigmated")
  if (state.luckychance >= 0.50) removeByClass("luckyteds")

  updateUI()
}

let rebirthBaseMulti = 1

const rebirthRaw = localStorage.getItem("rebirthmulti")
if (rebirthRaw) {
  try {
    const rb = JSON.parse(rebirthRaw)
    rebirthBaseMulti = rb.multi
    state.rebirthprice = rb.price
    state.rebirthCount = rb.count || 0
    state.multiplier = rebirthBaseMulti
  } catch (e) {
    localStorage.removeItem("rebirthmulti")
  }

  dom.rebirthCount.innerText = state.rebirthCount
  dom.rebirthprice.innerText = formatNumber(state.rebirthprice)
}

if (localStorage.getItem("userData") !== null) {
  load()
}

state.gatoPrice = 1000000000000000
state.intetedPrice = 100000000000000000
state.sigmaPrice = 10000000000000000000

function updateUI() {
  dom.teds.textContent = "Total teds: " + formatNumber(state.teds)
  const perSec = (state.tedsPerSecond + state.superPerSecond) * state.multiplier
  dom.tedsPerSec.textContent = formatNumber(perSec) + " teds/sec"
  dom.clickPrice.textContent = formatNumber(state.clickPrice) + " teds"
  dom.multiplierPrice.textContent = formatNumber(state.multiplierPrice) + " teds"
  dom.perSecondPrice.textContent = formatNumber(state.perSecondPrice) + " teds"
  dom.superPrice.textContent = formatNumber(state.superPrice) + " teds"
  dom.tedsPerClick.textContent = state.clickCount
  dom.tedsPerSecond.textContent = state.perSecondCount
  dom.multiplier.textContent = state.multiplierCount
  dom.multicounter.textContent = "Multiplier: " + formatNumber(state.multiplier) + "x"
  dom.superPerSecond.textContent = state.superCount
  dom.luckychance.textContent = "Lucky Chance: " + Math.round(state.luckychance * 100) + "%"
  if (dom.luckyPrice) {
    dom.luckyPrice.textContent = formatNumber(state.luckyPrice) + " teds"
  }
  if (dom.gatoPrice) dom.gatoPrice.textContent = formatNumber(state.gatoPrice) + " teds"
  if (dom.intetedPrice) dom.intetedPrice.textContent = formatNumber(state.intetedPrice) + " teds"
  if (dom.sigmaPrice) dom.sigmaPrice.textContent = formatNumber(state.sigmaPrice) + " teds"
  document.title = formatNumber(state.teds) + " teds — Ted Clicker"
}
 
function clicked() {
  let damage = state.tedsPerClick * state.multiplier
  let isLucky = state.luckyClickUnlocked && Math.random() < state.luckychance
  if (isLucky) {
    damage *= 10
  }
  state.teds += damage
  showClickFeedback(damage)
  updateUI()
}

function showClickFeedback(amount) {
  let el = document.createElement("span")
  el.className = "click-text"
  el.textContent = typeof amount === "string" ? amount : "+" + formatNumber(amount)
  el.style.left = (Math.random() * 60 + 20) + "%"
  dom.clickFeedback.appendChild(el)
  el.addEventListener("animationend", function () { el.remove() })
}
 
function buyUpgrade(priceKey, scaleFactor, onPurchase) {
  if (state.teds >= state[priceKey]) {
    state.teds -= state[priceKey]
    state[priceKey] = Math.floor(state[priceKey] * scaleFactor)
    onPurchase()
    updateUI()
  }
}

function upgrade() {
  if (state.teds >= state.clickPrice) {
    state.teds -= state.clickPrice
    state.clickPrice = Math.floor(state.clickPrice * 1.2)
    state.tedsPerClick += 1
    state.clickCount++
    updateUI()
  }
}

function upgrade2() {
  buyUpgrade("multiplierPrice", 1.7, () => {
    state.multiplier *= 1.2
    if (guldActive) {
      guldOgMulti *= 1.2
    }
    state.multiplierCount++
  })
}

function upgrade3() {
  if (state.teds >= state.perSecondPrice) {
    state.teds -= state.perSecondPrice
    state.perSecondPrice = Math.floor(state.perSecondPrice * 1.25)
    state.tedsPerSecond += 1
    state.perSecondCount++
    updateUI()
  }
}

function upgrade4() {
  buyUpgrade("superPrice", 1.25, () => {
    state.superPerSecond += 150
    state.superCount++
  })
}

function upgradeLucky() {
  if (state.teds >= state.luckyPrice) {
    state.teds -= state.luckyPrice
    state.luckyClickUnlocked = true
    state.luckychance = Math.round((state.luckychance + 0.05) * 100) / 100
    state.luckyPrice = Math.floor(state.luckyPrice * 1.5)
    if (state.luckychance >= 0.50) {
      alert("maximal tur!")
      removeByClass("luckyteds")
    }
    updateUI()
  }
}
function rebirth() {
  if (state.teds >= state.rebirthprice) {
    resetting = true
    clearInterval(gameLoop)
    localStorage.removeItem("userData")

    let baseMulti = 1
    let price = state.rebirthprice
    let count = 0
    const old = localStorage.getItem("rebirthmulti")
    if (old) {
      try {
        const parsed = JSON.parse(old)
        baseMulti = parsed.multi
        price = parsed.price
        count = parsed.count || 0
      } catch (e) {}
    }
    count++
    baseMulti *= 2
    price *= 2.5

    localStorage.setItem("rebirthmulti", JSON.stringify({ multi: baseMulti, price: price, count: count }))
    alert("Game WIPED!")
    location.reload()
  }
}


function buySpecialUpgrade(priceKey, unlockKey, className, multiplierBoost) {
  if (state.teds >= state[priceKey]) {
    state.teds -= state[priceKey]
    state[unlockKey] = true
    removeByClass(className)
    state.multiplier *= multiplierBoost
    updateUI()
  }
}

function littleted() { buySpecialUpgrade("littletedPrice", "littletedUnlocked", "littleted", 2) }
function megated()   { buySpecialUpgrade("megatedPrice", "megatedUnlocked", "megated", 5) }
function chinated()  { buySpecialUpgrade("chinatedPrice", "chinaUnlocked", "chinated", 50) }
function gatoted()   { buySpecialUpgrade("gatoPrice", "gatoUnlocked", "gato", 100) }
function inteted()   { buySpecialUpgrade("intetedPrice", "fattedUnlocked", "inteted", 250) }

function sigmated() {
  buySpecialUpgrade("sigmaPrice", "sigmaUnlocked", "sigmated", 1000)
  if (state.sigmaUnlocked) {
    alert("sigma grind complete, you are now a true gamer.")
  }
}

function deletesave() {
  if (confirm("vill du radera eller inte jao.")) {
    resetting = true
    clearInterval(gameLoop)
    localStorage.removeItem("userData")
    localStorage.removeItem("rebirthmulti")
    alert("Save deleted.")
    location.reload()
  }
}


let currentTheme = ""

function updateTheme() {
  let newTheme = "default"
  if (state.sigmaUnlocked)      newTheme = "sigma"
  else if (state.fattedUnlocked) newTheme = "fatted"
  else if (state.gatoUnlocked)   newTheme = "gato"
  else if (state.chinaUnlocked)  newTheme = "china"
  else if (state.megatedUnlocked) newTheme = "mega"
  else if (state.teds >= 1000000) newTheme = "million"
  else if (state.littletedUnlocked) newTheme = "little"

  if (newTheme === currentTheme) return
  currentTheme = newTheme

  const themes = {
    sigma:   ["blackpill.png", "sigmabackground.png"],
    fatted:  ["bigted.png", "donken.png"],
    gato:    ["gato.png", "swedish.png"],
    china:   ["ching.png", "chinahouse.png"],
    mega:    ["Nega.png", "jungle.png"],
    million: ["gojo.png", "void.png"],
    little:  ["little.png", "kinder.png"],
    default: ["Image.png", "palm.png"],
  }
  const imgs = themes[newTheme]
  dom.ted.src = imgs[0]
  dom.palm.src = imgs[1]
}

let goldenTedTimer = null
let goldenTedDespawn = null

function spawnGoldenTed() {
  let x = Math.random() * (window.innerWidth - 100) + 10
  let y = Math.random() * (window.innerHeight - 200) + 50
  dom.goldenTed.style.left = x + "px"
  dom.goldenTed.style.top = y + "px"
  dom.goldenTed.classList.remove("hidden")

  goldenTedDespawn = setTimeout(() => {
    dom.goldenTed.classList.add("hidden")
    scheduleGoldenTed()
  }, 10000)
}


let guldActive = false
let guldTimer = null
let guldTick = null
let guldSeconds = 0
let gammalMulti = 0

function clickGoldenTed() {

  clearTimeout(goldenTedDespawn)
  dom.goldenTed.classList.add("hidden")

  
  if (guldActive) {
    clearTimeout(guldTimer)
    clearInterval(guldTick)
    guldSeconds = 60
  } else {
   
    gammalMulti = state.multiplier
    state.multiplier = gammalMulti * 50
    guldActive = true
    guldSeconds = 60
  }
  updateUI()
  guldBar()
  guldGo()
  scheduleGoldenTed()
}

function guldGo() {
  guldTick = setInterval(function () {
    guldSeconds--
    guldBar()
    if (guldSeconds <= 0) {
      clearInterval(guldTick)
    }
  }, 1000)
  guldTimer = setTimeout(function () {
    clearInterval(guldTick)
    state.multiplier = gammalMulti
    guldActive = false
    guldhide()
    updateUI()
  }, 60000)
}

function guldBar() {
  let bar = document.getElementById("goldenBonusBar")
  if (!bar) {
    bar = document.createElement("div")
    bar.id = "goldenBonusBar"
    document.body.appendChild(bar)
  }
  bar.style.display = "block"
  bar.textContent = "guldig ted: 50x for " + guldSeconds + "s"
}

function guldhide() {
  let bar = document.getElementById("goldenBonusBar")
  if (bar) {
    bar.style.display = "none"
  }
}

function scheduleGoldenTed() {
  let wait = (Math.random() * 120 + 540) * 1000
  goldenTedTimer = setTimeout(spawnGoldenTed, wait)
}

scheduleGoldenTed()

const gameLoop = setInterval(() => {
  let passive = (state.tedsPerSecond + state.superPerSecond) * state.multiplier
  if (state.luckyClickUnlocked && Math.random() < state.luckychance) {
    passive *= 10
  }
  state.teds += passive
  updateUI()
  updateTheme()
  save()
}, 1000)

updateUI()
updateTheme()
