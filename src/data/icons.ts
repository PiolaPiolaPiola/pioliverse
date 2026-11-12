import csharp from '../assets/icons/csharp.svg';
import dotnet from '../assets/icons/dot-net.svg';
import sqlserver from '../assets/icons/microsoftsqlserver.svg';
import postgresql from '../assets/icons/postgresql.svg';
import typescript from '../assets/icons/typescript.svg';
import javascript from '../assets/icons/javascript.svg';
import react from '../assets/icons/react.svg';
import git from '../assets/icons/git.svg';
import jira from '../assets/icons/jira.svg';
import postman from '../assets/icons/postman.svg';
import dbeaver from '../assets/icons/dbeaver.svg';
import claude from '../assets/icons/claude.svg';

/** Logos oficiales de cada tecnología (Devicon / Simple Icons). */
export const techIcons = {
  csharp, dotnet, sqlserver, postgresql, typescript, javascript, react, git, jira, postman, dbeaver, claude,
} as const;

export type TechIconKey = keyof typeof techIcons;
