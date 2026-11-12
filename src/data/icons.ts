import csharp from '../assets/icons/csharp.svg';
import dotnet from '../assets/icons/dot-net.svg';
import java from '../assets/icons/java.svg';
import spring from '../assets/icons/spring.svg';
import nodejs from '../assets/icons/nodejs.svg';
import express from '../assets/icons/express.svg';
import sqlserver from '../assets/icons/microsoftsqlserver.svg';
import postgresql from '../assets/icons/postgresql.svg';
import mongodb from '../assets/icons/mongodb.svg';
import html5 from '../assets/icons/html5.svg';
import css3 from '../assets/icons/css3.svg';
import typescript from '../assets/icons/typescript.svg';
import javascript from '../assets/icons/javascript.svg';
import react from '../assets/icons/react.svg';
import materialui from '../assets/icons/materialui.svg';
import git from '../assets/icons/git.svg';
import github from '../assets/icons/github.svg';
import bitbucket from '../assets/icons/bitbucket.svg';
import jira from '../assets/icons/jira.svg';
import postman from '../assets/icons/postman.svg';
import dbeaver from '../assets/icons/dbeaver.svg';
import claude from '../assets/icons/claude.svg';

/** Logos oficiales de cada tecnología (Devicon / Simple Icons). */
export const techIcons = {
  csharp, dotnet, java, spring, nodejs, express, sqlserver, postgresql, mongodb, html5, css3,
  typescript, javascript, react, materialui, git, github, bitbucket, jira, postman, dbeaver, claude,
} as const;

/** Logos negros que se invierten en modo oscuro para que se vean. */
export const monoIcons = new Set<string>([github, express]);
