// Script para limpar as configurações do localStorage
// Execute este script no console do navegador se o header ainda não estiver visível

console.log('Limpando configurações antigas...');

// Remove as configurações do ng-matero
localStorage.removeItem('ng-matero-settings');

// Remove outras possíveis configurações que podem afetar o layout
localStorage.removeItem('matero-settings');
localStorage.removeItem('layout-settings');

// Define as configurações padrão com header visível
const defaultSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'auto',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US'
};

localStorage.setItem('ng-matero-settings', JSON.stringify(defaultSettings));

console.log('Configurações limpas e redefinidas. Recarregue a página (F5)');
console.log('Configurações aplicadas:', defaultSettings);
