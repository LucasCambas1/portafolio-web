type ToastProps = {
  variant: 'success' | 'error'
  title: string
  message: string
  /** Cuánto tiempo se ve en pantalla (ms). Debe coincidir con el temporizador de quien lo muestra. */
  duration: number
}

const PARTICLES = 12

const palette = {
  success: {
    color: '#4ade9a',
    glow: 'from-accent/40 via-green/30 to-accent2/40',
    ring: 'border-green/30',
    icon: 'from-accent to-green',
    bar: 'from-accent via-green to-accent2',
  },
  error: {
    color: '#ff8a7a',
    glow: 'from-[#ff8a7a]/40 via-[#ff5d73]/30 to-violet/30',
    ring: 'border-[#ff8a7a]/30',
    icon: 'from-[#ff8a7a] to-[#ff5d73]',
    bar: 'from-[#ff8a7a] to-[#ff5d73]',
  },
} as const

/**
 * Aviso central moderno: el fondo se desenfoca, la tarjeta aparece con un rebote, el ícono late
 * con ondas, el tilde se dibuja y salen chispas. Se retira solo (todo con CSS); quien lo renderiza
 * lo quita del DOM pasado `duration`.
 */
export default function Toast({ variant, title, message, duration }: ToastProps) {
  const p = palette[variant]
  const exitDelay = Math.max(duration - 450, 0)
  const enter = (name: string, ms: number, delay = 0, ease = 'ease-out') =>
    `${name} ${ms}ms ${ease} ${delay}ms both`

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center p-5">
      {/* Fondo desenfocado */}
      <div
        className="absolute inset-0 bg-bg/60 backdrop-blur-sm"
        style={{ animation: `${enter('toast-fade-in', 300)}, toast-fade-out 450ms ease-in ${exitDelay}ms forwards` }}
      />

      <div
        role="status"
        aria-live="polite"
        style={{
          animation: `${enter('toast-pop', 600, 0, 'cubic-bezier(0.34, 1.56, 0.64, 1)')}, toast-leave 450ms ease-in ${exitDelay}ms forwards`,
        }}
        className="relative w-full max-w-[22rem]"
      >
        {/* Resplandor detrás de la tarjeta */}
        <div
          aria-hidden="true"
          className={`absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br ${p.glow} blur-3xl`}
          style={{ animation: 'toast-glow 2.4s ease-in-out infinite' }}
        />

        <div
          className={`relative overflow-hidden rounded-3xl border bg-surface/80 px-8 pb-10 pt-9 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl ${p.ring}`}
        >
          {/* Brillo que cruza la tarjeta */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ animation: 'toast-shine 1.1s ease-out 0.35s both' }}
          />

          {/* Ícono con ondas y chispas */}
          <div className="relative mx-auto mb-6 flex h-[76px] w-[76px] items-center justify-center">
            {[0, 1].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: p.color, animation: `toast-ring 1.5s ease-out ${0.2 + i * 0.35}ms both` }}
              />
            ))}

            {variant === 'success' &&
              Array.from({ length: PARTICLES }, (_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#22e3d0' : i % 3 === 1 ? '#6c7bff' : '#4ade9a',
                    ['--a' as string]: `${(360 / PARTICLES) * i}deg`,
                    animation: `toast-burst 0.9s ease-out ${0.3 + (i % 3) * 0.05}s both`,
                  }}
                />
              ))}

            <span
              className={`relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-[#04101a] ${p.icon}`}
              style={{
                animation:
                  variant === 'success'
                    ? 'toast-icon-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both'
                    : 'toast-icon-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both, toast-shake 0.5s ease-in-out 0.65s both',
                boxShadow: `0 10px 40px -8px ${p.color}`,
              }}
            >
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {variant === 'success' ? (
                  <path d="M5 12.5l4.5 4.5L19 7.5" style={{ strokeDasharray: 24, animation: 'toast-check 0.5s ease-out 0.45s both' }} />
                ) : (
                  <path d="M12 6.5v7M12 17.5h.01" />
                )}
              </svg>
            </span>
          </div>

          <h3
            className="font-display text-[22px] font-extrabold leading-tight tracking-tight text-ink"
            style={{ animation: enter('toast-rise', 500, 350) }}
          >
            {title}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted" style={{ animation: enter('toast-rise', 500, 450) }}>
            {message}
          </p>

          {/* Barra de progreso */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/5">
            <div
              className={`h-full origin-left bg-gradient-to-r ${p.bar}`}
              style={{ animation: `toast-progress ${duration}ms linear forwards` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
