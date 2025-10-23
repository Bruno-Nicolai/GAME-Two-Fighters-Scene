const gravidade = 0.9

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1440
canvas.height = 1024

c.fillRect(0, 0, canvas.width, canvas.height)

// =======================================================

class Combatente {

  constructor({ posicao, velocidade, cor, areaDeslocamentoBraco }) {
    this.posicao = posicao
    this.velocidade = velocidade
    this.largura = 60
    this.altura = 300
    this.ultimaTecla
    this.espacoAtaque = {
      posicao: {
        x: this.posicao.x,
        y: this.posicao.y,
      },
      areaDeslocamentoBraco,
      largura: 120,
      altura: 75,
    }
    this.estaAtacando
    this.cor = cor
    this.vida = 100
  }

  renderizar() {
    c.fillStyle = this.cor
    c.fillRect(this.posicao.x, this.posicao.y, this.largura, this.altura)

    if (this.estaAtacando) {
      c.fillStyle = "green"
      c.fillRect(
        // area do soco
        this.espacoAtaque.posicao.x,
        this.espacoAtaque.posicao.y,
        this.espacoAtaque.largura,
        this.espacoAtaque.altura
      )
    }
  }

  atualizar() {
    this.renderizar()

    this.espacoAtaque.posicao.x =
      this.posicao.x + this.espacoAtaque.areaDeslocamentoBraco.x
    this.espacoAtaque.posicao.y = this.posicao.y

    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y

    if (this.posicao.y + this.altura + this.velocidade.y >= canvas.height) {
      this.velocidade.y = 0
    } else {
      this.velocidade.y += gravidade
    }
  }

  atacar() {
    this.estaAtacando = true
    setTimeout(() => {
      this.estaAtacando = false
    }, 150)
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
  areaDeslocamentoBraco: {
    x: 0,
    y: 0,
  },
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
  areaDeslocamentoBraco: {
    x: -60,
    y: 0,
  },
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

    case " ":
      jogador.atacar()
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

    case "0":
      oponente.atacar()
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

let temporizador = 20
let id_temporizador
function descrescerTemporizador() {
  if (temporizador > 0) {
    id_temporizador = setTimeout(descrescerTemporizador, 1000)
    temporizador--
    document.querySelector("#temporizador").innerHTML = temporizador
  }
  if (temporizador === 0) {
    definirVencedor({ 
      jogador, 
      oponente, 
      id_temporizador 
    })
  }
}
descrescerTemporizador()

// =======================================================

function definirVencedor({ jogador, oponente, id_temporizador }) {
  clearTimeout(id_temporizador)
  document.querySelector("#mostrarTexto").style.display = "flex"

  if (jogador.vida === oponente.vida) {
    document.querySelector("#mostrarTexto").innerHTML = "Empate"
  }
}

// =======================================================

function acertarSoco({ retangulo1, retangulo2 }) {
  // posicaoAtaqueX1 <= posicaoX2 + largura2(60) && posicaoAtaqueX1 + larguraAtaque1(120) >= posicaoX2
  // posicaoAtaqueY1 <= posicaoY2 + altura2(300) && posicaoAtaqueY1 + alturaAtaque1(75) >= posicaoY2
  return (
    retangulo1.espacoAtaque.posicao.x <=
      retangulo2.posicao.x + retangulo2.largura &&
    retangulo1.espacoAtaque.posicao.x + retangulo1.espacoAtaque.largura >=
      retangulo2.posicao.x &&
    retangulo1.espacoAtaque.posicao.y <=
      retangulo2.posicao.y + retangulo2.altura &&
    retangulo1.espacoAtaque.posicao.y + retangulo1.espacoAtaque.altura >=
      retangulo2.posicao.y
  )
}

// =======================================================

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  jogador.atualizar();
  oponente.atualizar();

  // movimento jogador 1
  jogador.velocidade.x = 0;
  if (teclas.a.pressed && jogador.ultimaTecla === "a") {
    jogador.velocidade.x = -7;
  } else if (teclas.d.pressed && jogador.ultimaTecla === "d") {
    jogador.velocidade.x = 7;
  }

  // movimento jogador 2
  oponente.velocidade.x = 0;
  if (teclas.ArrowLeft.pressed && oponente.ultimaTecla === "ArrowLeft") {
    oponente.velocidade.x = -7;
  } else if (
    teclas.ArrowRight.pressed &&
    oponente.ultimaTecla === "ArrowRight"
  ) {
    oponente.velocidade.x = 7;
  }

  // detecção de colisão
  if (
    acertarSoco({
      retangulo1: jogador,
      retangulo2: oponente,
    }) &&
    jogador.estaAtacando
  ) {
    jogador.estaAtacando = false;
    oponente.vida -= 20;
    document.querySelector("#oponenteVida").style.width = oponente.vida + "%";
  }

  if (
    acertarSoco({
      retangulo1: oponente,
      retangulo2: jogador,
    }) &&
    oponente.estaAtacando
  ) {
    oponente.estaAtacando = false;
    jogador.vida -= 20;
    document.querySelector("#jogadorVida").style.width = jogador.vida + "%";
  }
}
animate()