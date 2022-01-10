const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Nucleon {
    constructor(x, y, color, velocity){
        this.x = x
        this.y = y
        this.radius = 3
        this.color = color
        this.velocity = velocity
    }

    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

    stop() {
        this.velocity = {x: 0, y: 0}
    }
}

class Proton extends Nucleon {
    constructor(x, y, velocity){
        super(x, y, '#bc2a2b', velocity)
    }

    draw(){
        super.draw()
    }

    update() {
        super.update()
    }

    stop() {
        super.stop()
    }
}

class Neutron extends Nucleon {
    constructor(x, y, velocity){
        super(x, y, '#274ca4', velocity)
    }

    draw(){
        super.draw()
    }

    update() {
        super.update()
    }

    stop() {
        super.stop()
    }
}

class Nuke {
    constructor(protonsno, neutronsno, radius, x, y, velocity, initialized){
        this.protonsno = protonsno
        this.neutronsno = neutronsno
        this.radius = radius
        this.x = x
        this.y = y
        this.velocity = velocity
        this.nucleons = []
        this.initialized = initialized
    }

    initialize() {
        for (let i = 0; i < this.protonsno; i++) {
            var a = (Math.random() - 0.5) * 2 * this.radius
            var b = (Math.random() - 0.5) * 2 * Math.sqrt((this.radius * this.radius) - (a * a))
            this.nucleons.push(new Proton(this.x + a, this.y + b, this.velocity))
          }

        for (let i = 0; i < this.neutronsno; i++) {
            var a = (Math.random() - 0.5) * 2 * this.radius
            var b = (Math.random() - 0.5) * 2 * Math.sqrt((this.radius * this.radius) - (a * a))
            this.nucleons.push(new Neutron(this.x + a, this.y + b, this.velocity))
        }

        this.initialized = true
    }

    draw(){
        this.nucleons.forEach((nucleon) => {
            nucleon.draw()
        })
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y

        this.nucleons.forEach((nucleon) => {
            nucleon.update()
        })
    }

    fission(protonsNo, neutronsNo, uranNo, bariumNo, kryptonNo) {
        for (let i = 0; i < protonsNo; i++) {
            var a = (Math.random() - 0.5) * 40
            var b = Math.sqrt(400 - (a * a))
            if (Math.round(Math.random()) == 0) {
                var b = -b
            }
            freeNucleons.push(new Proton(this.x + a, this.y + b, {x: this.velocity.x + a, y: this.velocity.y + b}))
        }

        for (let i = 0; i < neutronsNo; i++) {
            var a = (Math.random() - 0.5) * 40
            var b = Math.sqrt(400 - (a * a))
            if (Math.round(Math.random()) == 0) {
                var b = -b
            }
            freeNucleons.push(new Neutron(this.x + a, this.y + b, {x: this.velocity.x + a, y: this.velocity.y + b}))
        }

        for (let i = 0; i < uranNo; i++) {
            var a = (Math.random() - 0.5) * 6
            var b = Math.sqrt(9 - (a * a))
            if (Math.round(Math.random()) == 0) {
                var b = -b
            }
            nukes.push(new Uran(this.x + a, this.y + b, {x: this.velocity.x + a, y: this.velocity.y + b}))
        }

        for (let i = 0; i < bariumNo; i++) {
            var a = (Math.random() - 0.5) * 12
            var b = Math.sqrt(36 - (a * a))

            nukes.push(new Barium(this.x + a, this.y + b, {x: this.velocity.x + a, y: this.velocity.y + b}))
        }

        for (let i = 0; i < kryptonNo; i++) {
            var a = -a * (8 / 5)
            var b = -b * (8 / 5)

            nukes.push(new Krypton(this.x + a, this.y + b, {x: this.velocity.x + a, y: this.velocity.y + b}))
        }
    }

}


class Uran extends Nuke {
    constructor(x, y, velocity){
        super(92, 144, 40, x, y, velocity, false)
    }

    initialize(){
        super.initialize()
    }

    draw(){
        super.draw()
    }

    update() {
        super.update()
    }

    fission(neutron){
        console.log('uran fission')
        freeNucleons.splice(freeNucleons.indexOf(neutron), 1)
        nukes.splice(nukes.indexOf(this), 1)
        super.fission(0, 3, 0, 1, 1)
    }
}

class Barium extends Nuke {
    constructor(x, y, velocity){
        super(56, 85, 31, x, y, velocity, false)
    }

    initialize(){
        super.initialize()
    }

    draw(){
        super.draw()
    }

    update() {
        super.update()
    }
}

class Krypton extends Nuke {
    constructor(x, y, velocity){
        super(36, 56, 25, x, y, velocity, false)
    }

    initialize(){
        super.initialize()
    }

    draw(){
        super.draw()
    }

    update() {
        super.update()
    }
}

const freeNucleons = []
const nukes = []

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    freeNucleons.forEach((nucleon) => {
        nucleon.update()
    })
    nukes.forEach((nuke) => {
        if (nuke.initialized == false) {
            nuke.initialize()
        }

        nuke.update()
    })

    nukes.forEach((uran) => {
        freeNucleons.forEach((neutron) => {
            const dist = Math.hypot(uran.x - neutron.x, uran.y - neutron.y)
            if (dist < 30) {
                uran.fission(neutron)

            }
        })
    })
}

var mode = 0

addEventListener('click', (event) => {
    if (mode == 0) {
        nukes.push(new Uran(event.clientX, event.clientY, {x: 0, y: 0})) //nieruchomy uran
    }
    if (mode == 1) {
        nukes.push(new Uran(event.clientX, event.clientY, {x: Math.random() - 0.5, y: Math.random() - 0.5})) //uran z losowa predkoscia
    }
    if (mode == 2) {
        freeNucleons.push(new Neutron(event.clientX, event.clientY, {x: 10, y: 0})) //neutron z nadana predkoscia
    }
    if (mode == 3) {
        freeNucleons.push(new Neutron(event.clientX, event.clientY, {x: Math.random() - 0.5, y: Math.random() - 0.5})) //neutron z losowa predkoscia
    }
    if (mode == 4) {
        freeNucleons.push(new Neutron(event.clientX, event.clientY, {x: 0, y: 0})) //neutron nieruchomy
    }
    if (mode == 5) {
        freeNucleons.push(new Proton(event.clientX, event.clientY, {x: 0, y: 0})) //proton nieruchomy
    }
    if (mode == 6) {
        nukes.push(new Barium(event.clientX, event.clientY, {x: 0, y: 0})) //bar nieruchomy
    }
    if (mode == 7) {
        nukes.push(new Krypton(event.clientX, event.clientY, {x: 0, y: 0})) //krypton nieruchomy
    }
})

addEventListener('keyup', event => {
    if (event.code === 'Space' || event.code === 'KeyU') {
        mode = 0
    }
    if (event.code === 'ShiftLeft') {
        mode = 1
    }
    if (event.code === 'ControlLeft') {
        mode = 2
    }
    if (event.code === 'AltLeft') {
        mode = 3
    }
    if (event.code === 'KeyN') {
        mode = 4
    }
    if (event.code === 'KeyP') {
        mode = 5
    }
    if (event.code === 'KeyB') {
        mode = 6
    }
    if (event.code === 'KeyK') {
        mode = 7
    }
})

//debugger
animate()
