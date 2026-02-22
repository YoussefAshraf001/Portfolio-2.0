import adobeXd from '/skills/adobe-xd.svg'
import afterEffects from '/skills/after-effects.svg'
import api from '/skills/api.svg'
import angular from '/skills/angular.svg'
import azure from '/skills/azure.svg'
import django from '/skills/django.svg'
import figma from '/skills/figma.svg'
import firebase from '/skills/firebase.svg'
import git from '/skills/git.svg'
import html from '/skills/html.svg'
import java from '/skills/java.svg'
import javascript from '/skills/javascript.svg'
import lightroom from '/skills/lightroom.svg'
import microsoftOffice from '/skills/microsoftoffice.svg'
import mongoDB from '/skills/mongoDB.svg'
import mysql from '/skills/mysql.svg'
import nextJS from '/skills/nextJS.svg'
import nuxtJS from '/skills/nuxtJS.svg'
import php from '/skills/php.svg'
import python from '/skills/python.svg'
import pytorch from '/skills/pytorch.svg'
import react from '/skills/react.svg'
import ruby from '/skills/ruby.svg'
import css from '/skills/css.svg'
import scss from '/skills/scss.svg'
import strapi from '/skills/strapi.svg'
import tailwind from '/skills/tailwind.svg'
import typescript from '/skills/typescript.svg'
import vitejs from '/skills/vitejs.svg'
import vue from '/skills/vue.svg'
import wordpress from '/skills/wordpress.svg'

const iconMap = {
  'adobe xd': adobeXd,
  'after effects': afterEffects,
  api,
  angular,
  azure,
  django,
  figma,
  firebase,
  git,
  html,
  java,
  javascript,
  lightroom,
  'microsoft office': microsoftOffice,
  mongodb: mongoDB,
  mysql,
  'next js': nextJS,
  nextjs: nextJS,
  'nuxt js': nuxtJS,
  nuxtjs: nuxtJS,
  php,
  python,
  pytorch,
  react,
  reactjs: react,
  redux: react,
  ruby,
  css,
  scss,
  sass: scss,
  strapi,
  tailwind,
  'tailwind css': tailwind,
  typescript,
  vite: vitejs,
  'vite js': vitejs,
  vitejs,
  vue,
  wordpress,
  'node.js': javascript,
  'framer motion': afterEffects,
  express: api,
  'express js': api,
  'express.js': api,
  'rest api': api,
  'restful api': api,
  'ui/ux design': adobeXd,
}

export const skillsImage = (skill) => {
  if (!skill) return ''
  return iconMap[String(skill).trim().toLowerCase()] || ''
}


