import * as adobeXd from "/public/svg/skills/adobe-xd.svg";
import afterEffects from "/public/svg/skills/after-effects.svg";
import api from "/public/svg/skills/api.svg";
import angular from "/public/svg/skills/angular.svg";
import azure from "/public/svg/skills/azure.svg";
import django from "/public/svg/skills/django.svg";
import figma from "/public/svg/skills/figma.svg";
import firebase from "/public/svg/skills/firebase.svg";
import git from "/public/svg/skills/git.svg";
import html from "/public/svg/skills/html.svg";
import java from "/public/svg/skills/java.svg";
import javascript from "/public/svg/skills/javascript.svg";
import lightroom from "/public/svg/skills/lightroom.svg";
import microsoftoffice from "/public/svg/skills/microsoftoffice.svg";
import mongoDB from "/public/svg/skills/mongoDB.svg";
import mysql from "/public/svg/skills/mysql.svg";
import nextJS from "/public/svg/skills/nextJS.svg";
import nuxtJS from "/public/svg/skills/nuxtJS.svg";
import php from "/public/svg/skills/php.svg";
import python from "/public/svg/skills/python.svg";
import pytorch from "/public/svg/skills/pytorch.svg";
import react from "/public/svg/skills/react.svg";
import ruby from "/public/svg/skills/ruby.svg";
import css from "/public/svg/skills/css.svg";
import scss from "/public/svg/skills/scss.svg";
import strapi from "/public/svg/skills/strapi.svg";
import tailwind from "/public/svg/skills/tailwind.svg";
import typescript from "/public/svg/skills/typescript.svg";
import vitejs from "/public/svg/skills/vitejs.svg";
import vue from "/public/svg/skills/vue.svg";
import wordpress from "/public/svg/skills/wordpress.svg";

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case "adobe xd":
      return adobeXd;
    case "after effects":
      return afterEffects;
    case "api":
      return api;
    case "angular":
      return angular;
    case "azure":
      return azure;
    case "django":
      return django;
    case "figma":
      return figma;
    case "firebase":
      return firebase;
    case "git":
      return git;
    case "html":
      return html;
    case "java":
      return java;
    case "javascript":
      return javascript;
    case "lightroom":
      return lightroom;
    case "microsoft office":
      return microsoftoffice;
    case "mongodb":
      return mongoDB;
    case "mysql":
      return mysql;
    case "next js":
      return nextJS;
    case "nuxt js":
      return nuxtJS;
    case "php":
      return php;
    case "python":
      return python;
    case "pytorch":
      return pytorch;
    case "react":
      return react;
    case "ruby":
      return ruby;
    case "css":
      return css;
    case "scss":
      return scss;
    case "strapi":
      return strapi;
    case "tailwind":
      return tailwind;
    case "typescript":
      return typescript;
    case "vitejs":
      return vitejs;
    case "vue":
      return vue;
    case "wordpress":
      return wordpress;
    default:
      break;
  }
};
