import {h,useLanguage} from './i18n.js?v=8';
import {useFlowLanguage} from './flow-i18n.js?v=3';
import {R as React} from './coin/index-DCXu2c-y.js';
import {FlowButton} from './coin-ui.js?v=5';

const benefits=[
 ['parking.svg','Автомобильные сервисы','Заправки, мойки, парковки и оплата услуг'],
 ['documents.svg','Данные автомобиля','Документы и история обслуживания всегда под рукой'],
 ['insurance.svg','Покупка и защита авто','Объявления, аренда, страхование и Автосигнал']
];
const compactBenefits=[
 ['parking.svg','Автомобильные сервисы','Заправки, мойки, парковки и оплата'],
 ['documents.svg','Данные автомобиля','Документы и история обслуживания'],
 ['insurance.svg','Покупка и защита авто','Объявления, аренда и страхование']
];
const localized={
 ru:{close:'Закрыть',heading:'Войдите в Click Avto',lead:'Автомобиль, документы и полезные сервисы — в одном приложении',fallbackLead:'Все возможности доступны после входа',cta:'Войти',benefits:compactBenefits},
 uz:{close:'Yopish',heading:'Click Avto’ga kiring',lead:'Avtomobil, hujjatlar va foydali xizmatlar — barchasi bir ilovada',fallbackLead:'Barcha imkoniyatlar tizimga kirgandan keyin mavjud',cta:'Kirish',benefits:[['parking.svg','Avtomobil xizmatlari','Yoqilg‘i quyish, avtoyuvish, avtoturargoh va to‘lovlar'],['documents.svg','Avtomobil ma’lumotlari','Hujjatlar va texnik xizmat tarixi'],['insurance.svg','Avtomobil xaridi va himoyasi','E’lonlar, ijara va sug‘urta']]},
 en:{close:'Close',heading:'Sign in to Click Avto',lead:'Your car, documents and useful services — all in one app',fallbackLead:'All features are available after you sign in',cta:'Sign in',benefits:[['parking.svg','Car services','Fuel, car washes, parking and payments'],['documents.svg','Vehicle information','Documents and service history'],['insurance.svg','Buying and protecting a car','Listings, rentals and insurance']]}
};

function DeviceShell(){return h('div',{className:'device-shell','aria-hidden':true},['mute','volume-up','volume-down','power'].map(name=>h('i',{key:name,className:'device-button device-'+name})));}

export function AuthBenefitsApp({boardId='auth-benefits',onAuth,initialVariant}={}){
 useLanguage();
 const language=useFlowLanguage(),copy=localized[language]||localized.ru;
 const phoneRef=React.useRef(null),contentRef=React.useRef(null);
 const [scale,setScale]=React.useState(1);
 const storageKey=`click-auth-benefits-variant-v2:${boardId}`;
 const [variant,setVariant]=React.useState(()=>{const saved=initialVariant||localStorage.getItem(storageKey);return['A','B','C'].includes(saved)?saved:'C'});
 React.useEffect(()=>localStorage.setItem(storageKey,variant),[storageKey,variant]);
 React.useEffect(()=>{const resize=()=>setScale(Math.max(.3,Math.min(1,(innerHeight-120)/872,(innerWidth<680?innerWidth-40:innerWidth-340)/418)));resize();addEventListener('resize',resize);return()=>removeEventListener('resize',resize)},[]);
 React.useLayoutEffect(()=>{
  const phone=phoneRef.current,content=contentRef.current;if(!phone||!content)return;
  const sync=()=>phone.style.setProperty('--auth-benefits-content-top',content.offsetTop+'px');sync();
  const observer=new ResizeObserver(sync);observer.observe(content);return()=>observer.disconnect();
 },[language,variant]);
 const figmaNode=variant==='A'?'753-24961':variant==='B'?'754-25046':'';
 const figmaLabel=figmaNode?figmaNode.replace('-',':'):'Авторская версия';
 const benefitItems=language==='ru'?(variant==='C'?compactBenefits:benefits):copy.benefits;
 return h('div',{className:'workspace auth-benefits-workspace','data-flow-languages':'ru uz en'},
  h('aside',{className:'sidebar'},
   h('div',{className:'brand'},h('span',{className:'workspace-logo',role:'img','aria-label':'Click'},h('img',{src:'/assets/click-logo.svg',alt:'',width:132,height:33}))),
   h('p',{className:'eyebrow'},'СТАТИЧНЫЙ ЭКРАН'),
   h('h2',null,'Авторизация'),
   h('p',{className:'intro'},'Мини-лендинг с преимуществами авторизации.'),
   h('nav',{'aria-label':'Экран'},h('button',{className:'selected',type:'button'},h('span',null,'01'),'Преимущества авторизации')),
   h('div',{className:'auth-benefits-variant-control'},h('span',null,'Вариант'),h('div',{className:'auth-benefits-variant-switch',role:'group','aria-label':'Вариант экрана преимуществ авторизации'},['A','B','C'].map(value=>h('button',{key:value,type:'button','aria-pressed':variant===value,onClick:()=>setVariant(value)},value)))),
   figmaNode?h('a',{className:'figma-link',href:`https://www.figma.com/design/BeSJi2GnjUPjOTHEBEaWcH/Click-Avto-App?node-id=${figmaNode}`,target:'_blank',rel:'noreferrer'},'Открыть макет ↗'):h('span',{className:'figma-link'},'Авторская версия')
  ),
  h('section',{className:'stage auth-benefits-stage',style:{'--preview-scale':scale}},
   h('div',{className:'stage-label'},h('span',{className:'live-dot'}),'Авторизация · Преимущества',h('span',{className:'dimensions'},'390 × 844')),
   h('div',{className:'phone-frame'},h(DeviceShell),
    h('div',{ref:phoneRef,className:`phone auth-benefits-phone auth-benefits-variant-${variant.toLowerCase()}`,'data-inspect-screen':`auth:auth-benefits-${variant.toLowerCase()}`},
     h('div',{className:'auth-benefits-status','aria-hidden':true},h('span',null,'9:41'),h('img',{src:'/assets/auth-benefits/status-icons.svg',alt:'',width:78.401,height:20})),
     h('section',{className:'auth-benefits-promo'},
      h('header',{className:'auth-benefits-promobar'},h('span',null,language==='ru'?'Авторизация':language==='uz'?'Avtorizatsiya':'Authorization'),h('button',{type:'button','aria-label':copy.close},h('img',{src:'/assets/auth-benefits/close-circle.svg',alt:'',width:32,height:32}))),
      h('div',{className:'auth-benefits-hero'},h('img',{src:'/assets/auth-benefits/hero-ru.png',alt:'',width:300}))
     ),
     h('main',{ref:contentRef,className:'auth-benefits-content'},
      h('div',{className:'auth-benefits-copy'},h('h1',null,copy.heading),h('p',null,variant==='C'?copy.lead:copy.fallbackLead)),
      h('div',{className:'auth-benefits-benefits'},benefitItems.map(([icon,title,description])=>h('div',{className:'auth-benefits-benefit',key:title},h('img',{src:'/assets/auth-benefits/'+icon,alt:'',width:32,height:32}),h('div',null,h('strong',null,title),h('p',null,description)))))
     ),
     h('footer',{className:'auth-benefits-footer'},h(FlowButton,{type:'button',onClick:onAuth},copy.cta),h('div',{className:'auth-benefits-home-indicator','aria-hidden':true}))
    )
   ),
   h('p',{className:'stage-note'},`${figmaNode?'Figma ':''}${figmaLabel} · Euclid Circular A`,h('br'),`Вариант ${variant} · переход к авторизации`)
  )
 );
}
