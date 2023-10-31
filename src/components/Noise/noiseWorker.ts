(() => {
  /* 
    algorythms for procedural noise generation, producing
    audio buffers for web audio api nodes
  */

  const whiteNoise = (sampleRate: number): Float32Array => {
    const channel = new Float32Array(sampleRate)
    for (let i = 0; i < sampleRate; i++) {
      channel[i] = Math.random() * 2 - 1
    }
    return channel
  }

  const pinkNoise = (sampleRate: number): Float32Array => {
    const channel = new Float32Array(sampleRate)
    let b0, b1, b2, b3, b4, b5, b6
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0
    for (let i = 0; i < sampleRate; i++) {
      const whiteNoise = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + whiteNoise * 0.0555179
      b1 = 0.99332 * b1 + whiteNoise * 0.0750759
      b2 = 0.96900 * b2 + whiteNoise * 0.1538520
      b3 = 0.86650 * b3 + whiteNoise * 0.3104856
      b4 = 0.55000 * b4 + whiteNoise * 0.5329522
      b5 = -0.7616 * b5 - whiteNoise * 0.0168980
      channel[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + whiteNoise * 0.5362
      channel[i] *= 0.16 // gain compensation
      b6 = whiteNoise * 0.115926
    }
    return channel
  }

  const brownianNoise = (sampleRate: number): Float32Array => {
    const channel = new Float32Array(sampleRate)
    let lastOut: number | undefined;
    lastOut = 0.0
    for (let i = 0; i < sampleRate; i++) {
      const whiteNoise = Math.random() * 2 - 1
      channel[i] = (lastOut! + (0.02 * whiteNoise)) / 1.02
      lastOut = channel[i]
      channel[i] *= 4.5 // gain compensation
    }
    return channel
  }

  self.onmessage = (e: any) => {
    let noise: Float32Array
    switch (e.data.type) {
      case 'white':
        noise = whiteNoise(e.data.sampleRate)
        break
      case 'pink':
        noise = pinkNoise(e.data.sampleRate)
        break
      case 'brown':
        noise = brownianNoise(e.data.sampleRate)
        break
    }
    // @ts-ignore
    postMessage(noise, [noise.buffer])
  }
})()
