import type { ReactNode } from 'react'
import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react'
import { motion, useReducedMotion } from 'framer-motion'

interface LiquidMetalHeroProps {
  badge?: string
  title: string
  subtitle: string
  primaryCtaLabel: string
  secondaryCtaLabel?: string
  onPrimaryCtaClick: () => void
  onSecondaryCtaClick?: () => void
  features?: string[]
  children?: ReactNode
}

const heroPreset = liquidMetalPresets[2]?.params ?? liquidMetalPresets[0]?.params

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
  children,
}: LiquidMetalHeroProps) {
  const reducedMotion = useReducedMotion()

  return (
    <section className="liquid-hero relative isolate overflow-hidden">
      <div className="liquid-hero-shader" aria-hidden="true">
        {heroPreset && <LiquidMetal {...heroPreset} style={{ width: '100%', height: '100%' }} />}
      </div>
      <div className="liquid-hero-vignette" aria-hidden="true" />
      <div className="liquid-hero-content">
        <motion.div
          className="liquid-hero-copy"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {badge && <span className="liquid-badge">{badge}</span>}
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="liquid-actions">
            <motion.button
              type="button"
              className="button primary liquid-button"
              onClick={onPrimaryCtaClick}
              whileHover={reducedMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            >
              {primaryCtaLabel}
            </motion.button>
            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.button
                type="button"
                className="button liquid-outline-button"
                onClick={onSecondaryCtaClick}
                whileHover={reducedMotion ? undefined : { scale: 1.03, y: -2 }}
                whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              >
                {secondaryCtaLabel}
              </motion.button>
            )}
          </div>
          {features.length > 0 && (
            <motion.div
              className="liquid-feature-card"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
            >
              {features.map((feature) => <span key={feature}>{feature}</span>)}
            </motion.div>
          )}
        </motion.div>
        {children && (
          <motion.div
            className="liquid-hero-side"
            initial={reducedMotion ? false : { opacity: 0, x: 30 }}
            animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
