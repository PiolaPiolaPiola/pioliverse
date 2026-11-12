import type { Dictionary } from '../i18n';
import { techIcons } from './icons';

export interface Tech {
  name: string;
  icon?: string;
}

export interface StackGroup {
  key: keyof Dictionary['stack']['groups'];
  file: string;
  items: Tech[];
}

export const stackGroups: StackGroup[] = [
  {
    key: 'backend',
    file: 'api.cs',
    items: [
      { name: 'C#', icon: techIcons.csharp },
      { name: '.NET 9 / Core / 4.8', icon: techIcons.dotnet },
      { name: 'ASP.NET MVC · Razor', icon: techIcons.dotnet },
      { name: 'LINQ' },
      { name: 'RESTful APIs' },
      { name: 'JWT · Auth' },
    ],
  },
  {
    key: 'data',
    file: 'db.sql',
    items: [
      { name: 'SQL Server', icon: techIcons.sqlserver },
      { name: 'PostgreSQL', icon: techIcons.postgresql },
      { name: 'Dapper' },
      { name: 'Entity Framework Core' },
      { name: 'Stored Procedures' },
      { name: 'DBeaver', icon: techIcons.dbeaver },
    ],
  },
  {
    key: 'frontend',
    file: 'ui.tsx',
    items: [
      { name: 'React', icon: techIcons.react },
      { name: 'TypeScript', icon: techIcons.typescript },
      { name: 'JavaScript', icon: techIcons.javascript },
      { name: 'DevExpress' },
    ],
  },
  {
    key: 'tools',
    file: 'tools.sh',
    items: [
      { name: 'Git', icon: techIcons.git },
      { name: 'Postman', icon: techIcons.postman },
      { name: 'Jira', icon: techIcons.jira },
      { name: 'NLog' },
      { name: 'Scrum' },
      { name: 'Claude AI', icon: techIcons.claude },
    ],
  },
  {
    key: 'architecture',
    file: 'clean.md',
    items: [{ name: 'SOLID' }, { name: 'Clean Code' }, { name: 'Clean Architecture' }],
  },
];

/** Logos que desfilan en la cinta animada. */
export const marqueeTechs: Required<Tech>[] = [
  { name: 'C#', icon: techIcons.csharp },
  { name: '.NET', icon: techIcons.dotnet },
  { name: 'SQL Server', icon: techIcons.sqlserver },
  { name: 'PostgreSQL', icon: techIcons.postgresql },
  { name: 'TypeScript', icon: techIcons.typescript },
  { name: 'React', icon: techIcons.react },
  { name: 'JavaScript', icon: techIcons.javascript },
  { name: 'Git', icon: techIcons.git },
  { name: 'Postman', icon: techIcons.postman },
  { name: 'Jira', icon: techIcons.jira },
  { name: 'DBeaver', icon: techIcons.dbeaver },
  { name: 'Claude', icon: techIcons.claude },
];

/** Íconos que orbitan la foto en los dos anillos. */
export const orbitRings = {
  outer: [
    { name: 'C#', icon: techIcons.csharp, delay: '0s' },
    { name: '.NET', icon: techIcons.dotnet, delay: '-4s' },
    { name: 'SQL Server', icon: techIcons.sqlserver, delay: '-8s' },
    { name: 'React', icon: techIcons.react, delay: '-12s' },
  ],
  inner: [
    { name: 'TypeScript', icon: techIcons.typescript, delay: '-3s' },
    { name: 'Git', icon: techIcons.git, delay: '-10s' },
    { name: 'Postman', icon: techIcons.postman, delay: '-17s' },
  ],
};
