import {R as React} from './coin/index-DCXu2c-y.js';
import {getLanguage} from './i18n.js?v=8';

let language='ru';
try{const saved=localStorage.getItem('click-avto-flow-language');if(['ru','uz','en'].includes(saved))language=saved;}catch{}
const listeners=new Set();

export function getFlowLanguage(){return language;}
export function setFlowLanguage(next){
 if(!['ru','uz','en'].includes(next)||next===language)return;
 language=next;
 try{localStorage.setItem('click-avto-flow-language',language);}catch{}
 listeners.forEach(fn=>fn());
 window.dispatchEvent(new Event('prototype:flow-language'));
}
export function useFlowLanguage(){return React.useSyncExternalStore(fn=>{listeners.add(fn);return()=>listeners.delete(fn)},getFlowLanguage,getFlowLanguage);}

const control=document.createElement('div');
control.className='workspace-flow-language';control.setAttribute('role','group');
const label=document.createElement('span');label.className='workspace-flow-language-label';label.textContent='Язык флоу';control.append(label);
const buttons=['ru','uz','en'].map(lang=>{
 const button=document.createElement('button');button.type='button';button.lang=lang;button.textContent=lang.toUpperCase();
 button.title=lang==='ru'?'Русский':lang==='uz'?'O‘zbekcha':'English';button.setAttribute('aria-label',button.title);
 button.onclick=()=>setFlowLanguage(lang);control.append(button);return button;
});
function update(){label.textContent=getLanguage()==='en'?'Flow language':'Язык флоу';control.setAttribute('aria-label',label.textContent);buttons.forEach((button,index)=>button.setAttribute('aria-pressed',String(['ru','uz','en'][index]===language)));}
function place(){
 const translatedFlow=document.querySelector('.canvas-board.is-active [data-flow-languages]')||document.querySelector('body>:not(#root) [data-flow-languages]')||document.querySelector('#root>[data-flow-languages]');
 const toolbar=document.querySelector('.workspace-tools');
 if(!translatedFlow||!toolbar){control.remove();return;}
 if(control.parentElement!==toolbar)toolbar.append(control);
}
update();place();
window.addEventListener('prototype:flow-language',update);
window.addEventListener('prototype:language',update);
window.addEventListener('prototype:canvas-moved',place);
document.addEventListener('pointerdown',()=>setTimeout(place),true);
new MutationObserver(place).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});

const style=document.createElement('style');style.textContent=`.workspace-tools .workspace-flow-language{display:flex;align-items:center;gap:2px;margin-left:4px;padding:3px;border-radius:9px;background:var(--workspace-bg);font:500 11px 'Euclid Circular A',sans-serif}.workspace-flow-language-label{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.workspace-tools .workspace-flow-language button{width:30px;min-width:30px;height:28px;padding:0;border:0;border-radius:6px;background:transparent;color:var(--workspace-muted);font:inherit;cursor:pointer}.workspace-tools .workspace-flow-language button:hover{color:var(--workspace-text)}.workspace-tools .workspace-flow-language button[aria-pressed=true]{background:var(--workspace-panel);color:var(--workspace-text);box-shadow:0 1px 3px var(--ui-shadow-soft)}.workspace-flow-language button:focus-visible{outline:2px solid var(--ui-accent);outline-offset:2px}`;document.head.append(style);
