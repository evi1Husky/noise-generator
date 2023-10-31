class Knob extends HTMLElement {
  dialAngle = 125
  lastX = 0
  currentX = 0
  initialTickAngle = 0
  minAngle = 125
  maxAngle = 415
  dialRotationRate = 7
  ticksRadius = 45
  ticksOffsetRight = 1
  knobEventHandler: CallableFunction | null = null
  knob: HTMLElement | null
  knobDial: HTMLElement | null
  tickContainer: HTMLElement | null
  shadow: ShadowRoot

  constructor() {
    super()
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
      :host {
        --knobColor: #0b0e12;
        --knobShadow: 0 0px 3px #242e3b inset;
        --touch: #0e1217;
        --lightIntensity: 0.1px;
        --width: 60px;
        --height: 60px;
        --dialColor: rgba(214, 229, 255, 1);
        --dialHeight: 120%;
        --tickColor: rgba(214, 229, 255, 1);
        --tickLength: 7px;
        --tickWidth: 1.5px;
        --ticksMarginBottom: 3px;
        }

      .knob {
        position: relative;
        cursor: default;
        width: var(--width);
        height: var(--height);
        border-radius: 50%;
        background-color: var(--knobColor);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--knobShadow)
      }
      
      .knob-dial {
        width: 100%;
        height: 3px;
        background: transparent;
        border-radius: 5px;
        transform: rotate(0deg);
      }
      
      .dial {
        position: absolute;
        width: 20%;
        height: var(--dialHeight);
        margin-left: 76%;
        border-radius: 100px;
        background: var(--dialColor);
        box-shadow:  0 0 20px var(--lightIntensity) var(--dialColor);
      }
      
      .tick {
        position: absolute;
        width: var(--tickLength);
        height: var(--tickWidth);
        background-color: #3b3f48;
        border-radius: 10px;
        transform: rotate(0deg);
      }
      
      .lit-tick {
        background-color: var(--tickColor);
        box-shadow:  0 0 10px var(--lightIntensity) var(--tickColor);
      }
      
      .tick-container {
        background: transparent;
        position: absolute;
        transform: rotate(125deg);
        margin-bottom: var(--ticksMarginBottom);
      }
      </style>

      <div class='knob'>
        <div class='knob-dial'>
          <div class='dial'></div>
        </div>
        <div class='tick-container'></div>
      </div>`

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadowRoot!.appendChild(template.content.cloneNode(true))

    this.knob = this.shadow.querySelector('.knob')
    this.knobDial = this.shadow.querySelector('.knob-dial')
    this.tickContainer = this.shadow.querySelector('.tick-container')
  }

  connectedCallback() {
    this.knobDial!.style.transform = `rotate(${this.dialAngle}deg)`
    this.knob!.ontouchmove = (event: any) => {
      this.knob!.style.backgroundColor = '#0e1217'
      this.knobEvent(~~event.touches[0].clientX)
      this.makeTicks(this.currentValue, this.ticksRadius, this.ticksOffsetRight)
      if (this.knobEventHandler) {
        this.knobEventHandler()
      }
    }

    this.knob!.ontouchend = () => {
      this.knob!.style.backgroundColor = 'var(--knobColor)'
    }

    this.knob!.onmouseover = () => {
      this.style.setProperty('--lightIntensity', '0.3px')
    }

    this.knob!.onmouseleave = () => {
      this.style.setProperty('--lightIntensity', '0.1px')
    }

    this.knob!.onmousedown = () => {
      window.onmousemove = (event) => {
        this.knob!.style.backgroundColor = 'var(--touch)'
        this.knobEvent(event.x)
        this.makeTicks(this.currentValue, this.ticksRadius, this.ticksOffsetRight)
        if (this.knobEventHandler) {
          this.knobEventHandler()
        }
      }
    }

    window.onmouseup = () => {
      this.knob!.style.backgroundColor = 'var(--knobColor)'
      window.onmousemove = null
    }

    this.makeTicks(this.currentValue, this.ticksRadius, this.ticksOffsetRight)
  }

  knobEvent(x: number) {
    this.lastX = x
    if (this.lastX > this.currentX) {
      this.rotateRight(x)
    } else if (this.lastX < this.currentX) {
      this.rotateLeft(x)
    }
  }

  rotateRight(x: number) {
    if (this.dialAngle <= this.maxAngle) {
      if (this.dialAngle > this.maxAngle - 7) {
        this.dialRotationRate = 1
      } else {
        this.dialRotationRate = 7
      }
      this.dialAngle += this.dialRotationRate
      window.requestAnimationFrame(() => {
        this.knobDial!.style.transform = `rotate(${this.dialAngle}deg)`
      })
      this.currentX = x
    }
  }

  rotateLeft(x: number) {
    if (this.dialAngle >= this.minAngle) {
      if (this.dialAngle < this.minAngle + 7) {
        this.dialRotationRate = 1
      } else {
        this.dialRotationRate = 7
      }
      this.dialAngle -= this.dialRotationRate
      window.requestAnimationFrame(() => {
        this.knobDial!.style.transform = `rotate(${this.dialAngle}deg)`
      })
      this.currentX = x
    }
  }

  makeTicks(numberOfActiveTicks: number, ticksRadius: number, offsetRight: number) {
    window.requestAnimationFrame(() => {
      while (this.tickContainer!.firstChild) {
        this.tickContainer!.removeChild(this.tickContainer!.firstChild)
      }
      const numberOfTicksToLight = numberOfActiveTicks / 6.2
      const knob = 310 / 17
      const offset = this.tickContainer!.offsetWidth - offsetRight
      for (let i = 0; i < 17; ++i) {
        const tick = document.createElement('div')
        const y = Math.sin(knob * i * (Math.PI / 180)) * ticksRadius
        const x = Math.cos(knob * i * (Math.PI / 180)) * ticksRadius
        tick.style.top = `${y + offset}px`
        tick.style.left = `${x + offset}px`
        this.tickContainer!.appendChild(tick)
        if (i < numberOfTicksToLight) {
          tick.className = 'tick lit-tick';
        } else {
          tick.className = 'tick'
        }

        tick.style.transform = `rotate(${this.initialTickAngle}deg)`
        this.initialTickAngle += 18
      }
      this.initialTickAngle = 0
    })
  }

  get currentValue() {
    let knobValuePercent = Math.floor(((this.dialAngle - 125) * 143) / 415)
    if (knobValuePercent < 0) {
      knobValuePercent = 0
    } else if (knobValuePercent >= 99) {
      knobValuePercent = 100
    }
    return knobValuePercent;
  }

  set value(percent: number) {
    if (percent >= 0 && percent <= 100) {
      this.dialAngle =
        ((this.maxAngle - this.minAngle) / 99) * percent + this.minAngle
      this.knobDial!.style.transform = `rotate(${this.dialAngle}deg)`
      this.makeTicks(this.currentValue, this.ticksRadius, this.ticksOffsetRight)
    }
    if (percent === 100) {
      this.dialAngle = this.maxAngle - 1
      this.knobDial!.style.transform = `rotate(${this.maxAngle - 1}deg)`
    }
  }

  set knobSize(value: number) {
    this.style.setProperty('--width', `${value}px`)
    this.style.setProperty('--height', `${value}px`)
    this.style.setProperty('--dialHeight', `${value + 30}%`)
    this.ticksRadius = value / 1.6
    this.style.setProperty('--tickLength', `${value / 10}px`)
    this.style.setProperty('--tickWidth', `${value / 50}px`);
    this.style.setProperty('--ticksMarginBottom', `${value / 20}px`)
    if (value > 70) {
      this.ticksOffsetRight = 2
    }
    this.makeTicks(this.currentValue, this.ticksRadius, this.ticksOffsetRight)
  }

  static get observedAttributes() {
    return ['knob-color', 'knob-shadow', 'knob-light', 'knob-size',]
  }

  attributeChangedCallback(name: string, prevValue: string, newValue: string) {
    switch (name) {
      case 'knob-color':
        this.style.setProperty('--knobColor', newValue)
        break
      case 'knob-shadow':
        this.style.setProperty('--knobShadow', newValue)
        break
      case 'knob-light':
        this.style.setProperty('--dialColor', newValue)
        this.style.setProperty('--tickColor', newValue)
        break
      case 'touch-color':
        this.style.setProperty('--touch', newValue)
        break
      case 'knob-size':
        this.knobSize = Number(newValue)
    }
  }
}

customElements.define('control-knob', Knob)