import type { Dictionary } from '../i18n';
import registreeShot from '../assets/registree.png';

export interface Project {
  id: keyof Dictionary['projects']['items'];
  level: number;
  name: string;
  image: string;
  tags: string[];
  links: { demo?: string; front?: string; back?: string };
}

/** Para agregar un proyecto: suma un objeto aquí y su descripción en i18n (projects.items). */
export const projects: Project[] = [
  {
    id: 'registree',
    level: 1,
    name: 'Registree',
    image: registreeShot,
    tags: ['React', 'TypeScript', 'MUI', 'Node + Express', 'MongoDB'],
    links: {
      demo: 'https://registree-ochre.vercel.app',
      front: 'https://github.com/PiolaPiolaPiola/registree-frontend',
      back: 'https://github.com/PiolaPiolaPiola/registree-backend',
    },
  },
];
