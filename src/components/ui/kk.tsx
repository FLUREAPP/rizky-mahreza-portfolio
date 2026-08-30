import { useEffect, useRef } from 'react'

const vertexShaderSource = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}`
const fragmentShaderSource = `precision mediump float;uniform vec2 u_resolution;uniform float u_time;uniform vec2 u_mouse;uniform float u_presence;void main(){vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec2 p=(uv-.5);p.x*=u_resolution.x/u_resolution.y;float t=u_time*.18;float d=length(p);float a=atan(p.y,p.x);float wave=.5+.5*sin(a*4.0+t*1.7+d*8.0);float glow=exp(-d*2.2);vec3 navy=vec3(.018,.055,.10);vec3 blue=vec3(.025,.20,.34);vec3 cyan=vec3(.30,.64,.76);vec3 col=mix(navy,blue,wave*.75);col=mix(col,cyan,glow*(.22+.18*sin(t+d*4.0)));vec2 m=u_mouse;float md=length(p-m);float cursor=exp(-md*16.0)*u_presence;col+=vec3(.10,.22,.28)*cursor;float v=smoothstep(1.15,.25,d);col*=v;gl_FragColor=vec4(col,1.0);}`

export function ShaderBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!context) return
    const gl: WebGLRenderingContext = context

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) throw new Error('Unable to create shader')
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader) || 'Shader compilation failed'
        gl.deleteShader(shader)
        throw new Error(message)
      }
      return shader
    }

    const program = gl.createProgram()
    if (!program) return
    let raf = 0
    let disposed = false

    try {
      const vs = compile(gl.VERTEX_SHADER, vertexShaderSource)
      const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSource)
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
      gl.useProgram(program)

      const buffer = gl.createBuffer()
      if (!buffer) throw new Error('Unable to create buffer')
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'a_position')
      if (position < 0) throw new Error('Missing a_position attribute')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      const resolution = gl.getUniformLocation(program, 'u_resolution')
      const time = gl.getUniformLocation(program, 'u_time')
      const mouse = gl.getUniformLocation(program, 'u_mouse')
      const presence = gl.getUniformLocation(program, 'u_presence')
      if (resolution === null || time === null || mouse === null || presence === null) throw new Error('Missing shader uniforms')

      let width = 1
      let height = 1
      let targetX = 0
      let targetY = 0
      let mouseX = 0
      let mouseY = 0
      let targetPresence = 0
      let currentPresence = 0
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const start = performance.now()
      let lastNow = start

      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        width = Math.max(1, Math.round(rect.width * dpr))
        height = Math.max(1, Math.round(rect.height * dpr))
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
          gl.viewport(0, 0, width, height)
        }
      }

      const onMove = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect()
        if (!rect.width || !rect.height) return
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom
        targetPresence = inside ? 1 : 0
        targetX = inside ? ((event.clientX - rect.left) / rect.width) * 2 - 1 : 0
        targetY = inside ? -(((event.clientY - rect.top) / rect.height) * 2 - 1) : 0
      }
      const onLeave = () => { targetPresence = 0 }
      const render = (now: number) => {
        if (disposed) return
        const dt = 1 - Math.exp(-12 * Math.min(0.05, (now - lastNow) / 1000))
        lastNow = now
        mouseX += (targetX - mouseX) * dt
        mouseY += (targetY - mouseY) * dt
        currentPresence += (targetPresence - currentPresence) * dt
        resize()
        gl.uniform2f(resolution, width, height)
        gl.uniform1f(time, reduced ? 0 : (now - start) / 1000)
        gl.uniform2f(mouse, mouseX * 0.5, mouseY * 0.5)
        gl.uniform1f(presence, reduced ? 0 : currentPresence)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        raf = requestAnimationFrame(render)
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      window.addEventListener('resize', resize)
      resize()
      raf = requestAnimationFrame(render)

      return () => {
        disposed = true
        cancelAnimationFrame(raf)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('resize', resize)
        gl.deleteBuffer(buffer)
        gl.deleteProgram(program)
      }
    } catch (error) {
      console.error('ShaderBackground failed:', error)
      gl.deleteProgram(program)
      return
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
