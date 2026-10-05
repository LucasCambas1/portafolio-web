interface Props {
  size?: number
  className?: string
}

/** Logo de WhatsApp: usa el archivo SVG que está en /public (WhatsApp_Logo_green.svg). */
export default function WhatsAppLogo({ size = 24, className = '' }: Props) {
  return (
    <img
      src="/WhatsApp_Logo_green.svg"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    />
  )
}
