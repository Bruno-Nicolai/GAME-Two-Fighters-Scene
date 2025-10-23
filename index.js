const gravidade = 0.9

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1440
canvas.height = 1024

c.fillRect(0, 0, canvas.width, canvas.height)

// =======================================================

class Combatente {

  constructor({ posicao, velocidade, cor }) {
    this.posicao = posicao
    this.velocidade = velocidade
    this.largura = 60
    this.altura = 300
    this.ultimaTecla
    this.cor = cor
    this.vida = 100
  }

  renderizar() {
    c.fillStyle = this.cor
    c.fillRect(this.posicao.x, this.posicao.y, this.largura, this.altura)
  }

  atualizar() {
    this.renderizar()

    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y

    if (this.posicao.y + this.altura + this.velocidade.y >= canvas.height) {
      this.velocidade.y = 0
    } else {
      this.velocidade.y += gravidade
    }
  }

}

// =======================================================

const jogador = new Combatente({
  posicao: {
    x: 64,
    y: 0,
  },
  velocidade: {
    x: 0,
    y: 0,
  },
  cor: "red",
})
jogador.renderizar()


const oponente = new Combatente({
  posicao: {
    x: 910,
    y: 100,
  },
  velocidade: {
    x: 0,
    y: 0,
  },
  cor: "blue",
})
oponente.renderizar()

// =======================================================

const teclas = {
  a: { pressed: false },
  d: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
}

window.addEventListener("keydown", (event) => {
  switch (event.key) {

    case "d":
      teclas.d.pressed = true
      jogador.ultimaTecla = "d"
      break

    case "a":
      teclas.a.pressed = true
      jogador.ultimaTecla = "a"
      break

    case "w":
      jogador.velocidade.y = -28
      break

    case "ArrowRight":
      teclas.ArrowRight.pressed = true
      oponente.ultimaTecla = "ArrowRight"
      break

    case "ArrowLeft":
      teclas.ArrowLeft.pressed = true
      oponente.ultimaTecla = "ArrowLeft"
      break

    case "ArrowUp":
      oponente.velocidade.y = -28
      break

  }
})

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      teclas.d.pressed = false
      break

    case "a":
      teclas.a.pressed = false
      break

    case "ArrowRight":
      teclas.ArrowRight.pressed = false
      break

    case "ArrowLeft":
      teclas.ArrowLeft.pressed = false
      break
  }
})

// =======================================================

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  jogador.atualizar()
  oponente.atualizar()

  // movimento jogador
  jogador.velocidade.x = 0
  if (teclas.a.pressed && jogador.ultimaTecla === "a") {
    jogador.velocidade.x = -7
  } else if (teclas.d.pressed && jogador.ultimaTecla === "d") {
    jogador.velocidade.x = 7
  }

  // movimento oponente
  oponente.velocidade.x = 0
  if (teclas.ArrowLeft.pressed && oponente.ultimaTecla === "ArrowLeft") {
    oponente.velocidade.x = -7
  } else if (
    teclas.ArrowRight.pressed &&
    oponente.ultimaTecla === "ArrowRight"
  ) {
    oponente.velocidade.x = 7
  }

}
animate()