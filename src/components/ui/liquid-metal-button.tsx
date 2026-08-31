import { liquidMetalFragmentShader, ShaderMount } from '@paper-design/shaders'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

interface LiquidMetalButtonProps {
  label?: string
  onClick?: () => void
  href?: string
  viewMode?: 'text' | 'icon'
  icon?: React.ReactNode
  width?: number
  height?: number
  disabled?: boolean
  ariaLabel?: string
}

export function LiquidMetalButton({
  label = 'Get Started',
  onClick,
  href,
  viewMode = 'text',
  icon,
  width,
  height = 46,
  disabled = false,
  ariaLabel,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const shaderRef = useRef<HTMLDivElement>(null)
  const shaderMount = useRef<ShaderMount | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const rippleId = useRef(0)

  const dimensions = useMemo(() => {
    if (viewMode === 'icon') {
      const size = width ?? 46
      return { width: size, height, innerWidth: Math.max(size - 4, 1), innerHeight: Math.max(height - 4, 1) }
    }

    const textWidth = width ?? Math.max(142, Math.min(240, label.length * 8 + 42))
    return { width: textWidth, height, innerWidth: Math.max(textWidth - 4, 1), innerHeight: Math.max(height - 4, 1) }
  }, [height, label.length, viewMode, width])

  useEffect(() => {
    const styleId = 'liquid-metal-button-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .liquid-metal-button-shader canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes liquid-metal-button-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }

    if (shaderRef.current) {
      try {
        shaderMount.current?.dispose()
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6,
        )
      } catch (error) {
        console.error('[LiquidMetalButton] Failed to mount shader:', error)
      }
    }

    return () => {
      shaderMount.current?.dispose()
      shaderMount.current = null
    }
  }, [])

  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovered(true)
    shaderMount.current?.setSpeed?.(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
    shaderMount.current?.setSpeed?.(0.6)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    shaderMount.current?.setSpeed?.(2.4)
    window.setTimeout(() => shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6), 300)

    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const ripple = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current++ }
    setRipples((prev) => [...prev, ripple])
    window.setTimeout(() => setRipples((prev) => prev.filter((item) => item.id !== ripple.id)), 600)

    onClick?.()
  }

  const content = viewMode === 'icon' ? (
    icon ?? <span aria-hidden="true">✦</span>
  ) : (
    <span>{label}</span>
  )

  const sharedStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    background: 'transparent',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    zIndex: 40,
    transformStyle: 'preserve-3d',
    transform: 'translateZ(25px)',
    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease',
    overflow: 'hidden',
    borderRadius: '100px',
    opacity: disabled ? 0.55 : 1,
  }

  return (
    <div className="relative inline-block" style={{ width: dimensions.width, height: dimensions.height }}>
      <div style={{ perspective: '1000px', perspectiveOrigin: '50% 50%', width: '100%', height: '100%' }}>
        <div
          style={{
            position: 'relative',
            width: dimensions.width,
            height: dimensions.height,
            transformStyle: 'preserve-3d',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: dimensions.width,
              height: dimensions.height,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(20px)',
              zIndex: 30,
              pointerEvents: 'none',
              color: '#666666',
              fontSize: 14,
              fontWeight: 400,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
              whiteSpace: 'nowrap',
            }}
          >
            {content}
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: dimensions.width,
              height: dimensions.height,
              transformStyle: 'preserve-3d',
              transform: `translateZ(10px) ${isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)'}`,
              zIndex: 20,
            }}
          >
            <div
              style={{
                width: dimensions.innerWidth,
                height: dimensions.innerHeight,
                margin: 2,
                borderRadius: 100,
                background: 'linear-gradient(180deg, #202020 0%, #000000 100%)',
                boxShadow: isPressed ? 'inset 0 2px 4px rgba(0,0,0,.4), inset 0 1px 2px rgba(0,0,0,.3)' : 'none',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: dimensions.width,
              height: dimensions.height,
              transformStyle: 'preserve-3d',
              transform: `translateZ(0px) ${isPressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)'}`,
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: dimensions.width,
                height: dimensions.height,
                borderRadius: 100,
                boxShadow: isPressed
                  ? '0 0 0 1px rgba(0,0,0,.5), 0 1px 2px rgba(0,0,0,.3)'
                  : isHovered
                    ? '0 0 0 1px rgba(0,0,0,.4), 0 12px 6px rgba(0,0,0,.05), 0 8px 5px rgba(0,0,0,.1), 0 4px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.2)'
                    : '0 0 0 1px rgba(0,0,0,.3), 0 36px 14px rgba(0,0,0,.02), 0 20px 12px rgba(0,0,0,.08), 0 9px 9px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.15)',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'rgb(0 0 0 / 0)',
              }}
            >
              <div
                ref={shaderRef}
                className="liquid-metal-button-shader"
                style={{ position: 'relative', width: dimensions.width, height: dimensions.height, borderRadius: 100, overflow: 'hidden' }}
              />
            </div>
          </div>

          {href ? (
            <a
              ref={anchorRef}
              href={disabled ? undefined : href}
              aria-label={ariaLabel ?? label}
              aria-disabled={disabled || undefined}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={() => !disabled && setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              style={{ ...sharedStyle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {ripples.map((ripple) => (
                <span key={ripple.id} style={{ position: 'absolute', left: ripple.x, top: ripple.y, width: 20, height: 20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.4) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none', animation: 'liquid-metal-button-ripple .6s ease-out' }} />
              ))}
            </a>
          ) : (
            <button
              ref={buttonRef}
              type="button"
              disabled={disabled}
              aria-label={ariaLabel ?? label}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={() => !disabled && setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              style={sharedStyle}
            >
              {ripples.map((ripple) => (
                <span key={ripple.id} style={{ position: 'absolute', left: ripple.x, top: ripple.y, width: 20, height: 20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.4) 0%, rgba(255,255,255,0) 70%)', pointerEvents: 'none', animation: 'liquid-metal-button-ripple .6s ease-out' }} />
              ))}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
