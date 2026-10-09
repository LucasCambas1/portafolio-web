// Datos que no dependen del idioma. Editá acá tus enlaces y tus proyectos.

export const site = {
  name: 'Lucas Cambas Sánchez',
  brand: { first: 'lucas', highlight: 'cambas', tld: '.dev' },
  url: 'https://lucascambas-dev.com.ar/',
  email: 'lucascambas@gmail.com',
  linkedin: 'https://www.linkedin.com/in/lucas-cambas-sanchez/',
  linkedinHandle: 'lucas-cambas-sanchez',
  github: 'https://github.com/LucasCambas1',
  // WhatsApp: código de país + 9 + código de área + número, sin ceros, 15 ni signos.
  whatsapp: '5492216216577',
  whatsappDisplay: '+54 9 221 621-6577',
  photo: '/avatar.jpg',
  cv: '/cv/Lucas-Cambas-Sanchez-CV.pdf',
}

/** Enlace que abre el chat de WhatsApp con un mensaje ya escrito. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export type ProjectColor = 'accent' | 'violet' | 'amber'

export interface Project {
  /** Clave del texto en los archivos de idioma: projects.items.<id> */
  id: 'syscar' | 'expedientes' | 'deltabiz'
  tags: string[]
  color: ProjectColor
  /** Ruta de una captura en /public (ej. '/projects/syscar.png'). Opcional. */
  image?: string
  /** Enlace al detalle o al sitio. Si no está, no se muestra el botón. */
  href?: string
}

export const projects: Project[] = [
  { id: 'syscar', tags: ['.NET', 'React', 'PostgreSQL'], color: 'accent', image: '/projects/syscar.webp', href: 'https://www.carsys.com.ar/' },
  { id: 'expedientes', tags: ['Frontend', 'APIs'], color: 'violet', image: '/projects/expedientes.webp' },
  { id: 'deltabiz', tags: ['Diseño web', 'Responsive', 'Frontend'], color: 'amber', image: '/projects/deltabiz.webp', href: 'https://deltabiz.com.ar/' },
]
