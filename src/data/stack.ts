import type { Dictionary, Lang } from '../i18n';
import { techIcons as I } from './icons';

/** Nombre fijo (marcas) o traducido (conceptos). */
export type TechName = string | Record<Lang, string>;

export interface Tech {
  name: TechName;
  icon?: string;
}

export interface StackGroup {
  key: keyof Dictionary['stack']['groups'];
  file: string;
  items: Tech[];
}

export const techLabel = (name: TechName, lang: Lang) => (typeof name === 'string' ? name : name[lang]);

export const stackGroups: StackGroup[] = [
  {
    key: 'backend',
    file: 'api.cs',
    items: [
      { name: 'C#', icon: I.csharp },
      { name: '.NET 9 / Core / Framework 4.8', icon: I.dotnet },
      { name: 'ASP.NET MVC 5', icon: I.dotnet },
      { name: 'Windows Forms', icon: I.dotnet },
      { name: 'LINQ' },
      { name: 'RESTful APIs' },
      { name: 'JWT · Auth' },
      { name: { es: 'Jobs programados', en: 'Scheduled jobs' } },
      { name: 'Java', icon: I.java },
      { name: 'Spring Boot', icon: I.spring },
      { name: 'Node.js', icon: I.nodejs },
      { name: 'Express', icon: I.express },
    ],
  },
  {
    key: 'data',
    file: 'db.sql',
    items: [
      { name: 'SQL Server', icon: I.sqlserver },
      { name: 'PostgreSQL', icon: I.postgresql },
      { name: 'MongoDB', icon: I.mongodb },
      { name: 'Stored Procedures' },
      { name: 'Dapper' },
      { name: 'Entity Framework Core' },
      { name: 'DBeaver', icon: I.dbeaver },
    ],
  },
  {
    key: 'frontend',
    file: 'ui.tsx',
    items: [
      { name: 'HTML5', icon: I.html5 },
      { name: 'CSS3', icon: I.css3 },
      { name: 'Razor · MVC 5', icon: I.dotnet },
      { name: 'React', icon: I.react },
      { name: 'TypeScript', icon: I.typescript },
      { name: 'JavaScript', icon: I.javascript },
      { name: 'Material UI', icon: I.materialui },
      { name: 'DevExpress' },
    ],
  },
  {
    key: 'tools',
    file: 'tools.sh',
    items: [
      { name: 'Git', icon: I.git },
      { name: 'GitHub', icon: I.github },
      { name: 'Bitbucket', icon: I.bitbucket },
      { name: 'Postman', icon: I.postman },
      { name: 'Jira', icon: I.jira },
      { name: 'NLog' },
      { name: 'Power Automate' },
      { name: 'Scrum' },
      { name: 'Claude AI', icon: I.claude },
    ],
  },
  {
    key: 'architecture',
    file: 'clean.md',
    items: [
      { name: { es: 'Arquitectura por capas', en: 'Layered architecture' } },
      { name: 'Clean Architecture' },
      { name: { es: 'Patrones de diseño', en: 'Design patterns' } },
      { name: { es: 'Principios SOLID', en: 'SOLID principles' } },
      { name: 'Clean Code' },
      { name: 'Code Review' },
    ],
  },
];

/** Logos que desfilan en la cinta animada. */
export const marqueeTechs = [
  { name: 'C#', icon: I.csharp },
  { name: '.NET', icon: I.dotnet },
  { name: 'SQL Server', icon: I.sqlserver },
  { name: 'PostgreSQL', icon: I.postgresql },
  { name: 'MongoDB', icon: I.mongodb },
  { name: 'Java', icon: I.java },
  { name: 'Spring Boot', icon: I.spring },
  { name: 'TypeScript', icon: I.typescript },
  { name: 'React', icon: I.react },
  { name: 'HTML5', icon: I.html5 },
  { name: 'CSS3', icon: I.css3 },
  { name: 'JavaScript', icon: I.javascript },
  { name: 'Git', icon: I.git },
  { name: 'GitHub', icon: I.github },
  { name: 'Bitbucket', icon: I.bitbucket },
  { name: 'Postman', icon: I.postman },
  { name: 'Jira', icon: I.jira },
  { name: 'Claude', icon: I.claude },
];

/** Íconos que orbitan la foto en los dos anillos. */
export const orbitRings = {
  outer: [
    { name: 'C#', icon: I.csharp, delay: '0s' },
    { name: '.NET', icon: I.dotnet, delay: '-4s' },
    { name: 'SQL Server', icon: I.sqlserver, delay: '-8s' },
    { name: 'React', icon: I.react, delay: '-12s' },
  ],
  inner: [
    { name: 'TypeScript', icon: I.typescript, delay: '-3s' },
    { name: 'Git', icon: I.git, delay: '-10s' },
    { name: 'Postman', icon: I.postman, delay: '-17s' },
  ],
};
