import {R as React} from './coin/index-DCXu2c-y.js';
import {B as Button,N as Navbar} from './coin/TransferSelector-prototype-v4.js';
const h=React.createElement;
// The Figma flow uses text-only buttons. Coin's default icon is a plus.
export function FlowButton({children,className='',loading=false,...props}) {
 return h(Button,{...props,width:'full',size:'large',iconSlot:false,loading,className:['flow-button',className].filter(Boolean).join(' ')},loading?null:children);
}
// An explicit leftIcon replaces Coin's built-in button, so it must include its own handler.
export function FlowNavbar({title='',onBack}) {
 return h(Navbar,{title,titleWeight:'regular',rightIcon:false,leftIcon:h('button',{type:'button',className:'cds-navbar__icon-button','aria-label':'Назад',onClick:onBack},h('img',{src:'/assets/eaeb2.svg?v=3',alt:''}))});
}
