/*!
	PURE Unobtrusive Rendering Engine for HTML

	Licensed under the MIT licenses.
	More information at: http://www.opensource.org

	Copyright (c) 2012 Michael Cvilic - BeeBole.com

	Thanks to Rog Peppe for the functional JS jump
	revision: 2.75
*/
var $p,pure=$p=function(b,c){var f=b,k=!1;"string"===typeof f?k=c||!1:f&&(!f[0]&&!f.length)&&(f=[f]);return $p.core(f,k)};
$p.core=function(b,c,f){function k(a){if("undefined"!==typeof console){console.log(a);debugger}throw"pure error: "+a;}function K(){var a=$p.plugins,d=function(){};d.prototype=a;d.prototype.compile=a.compile||L;d.prototype.render=a.render||M;d.prototype.autoRender=a.autoRender||N;d.prototype.find=a.find||O;d.prototype._compiler=x;d.prototype._error=k;return new d}function C(a){var d;if(!(d=a.outerHTML))d=document.createElement("div"),d.appendChild(a.cloneNode(!0)),d=d.innerHTML;return d}function y(a,
d){return function(b){return a(""+d.call(b.item||b.context,b))}}function O(a,d){"string"===typeof a&&(d=a,a=!1);return"undefined"!==typeof document.querySelectorAll?(a||document).querySelectorAll(d):k("You can test PURE standalone with: iPhone, FF3.5+, Safari4+ and IE8+\n\nTo run PURE on your browser, you need a JS library/framework with a CSS selector engine")}function D(a,d){return function(b){var e=[a[0]],c=a.length,g,j,i,h;try{for(var m=1;m<c;m++){g=d[m].call(this,b);j=a[m];if(""===g&&(i=e[e.length-
1],-1<(h=i.search(/[^\s]+=\"?$/))))e[e.length-1]=i.substring(0,h),j=j.substr(1);e[e.length]=g;e[e.length]=j}return e.join("")}catch(f){return console&&console.log&&console.log(f.stack?f.stack:f.message+" ("+f.type+", "+f.arguments.join("-")+"). Use Firefox or Chromium/Chrome to get a full stack of the error. "),""}}}function Q(a){var d=a.match(/^(\w+)\s*<-\s*(\S+)?$/);null===d&&k('bad loop spec: "'+a+'"');"item"===d[1]&&k('"item<-..." is a reserved word for the current running iteration.\n\nPlease choose another name for your loop.');
!d[2]||"context"===d[2].toLowerCase()?d[2]=function(a){return a.context}:d[2]&&0===d[2].indexOf("context")&&(d[2]=v(d[2].replace(/^context\.?/,"")));return{name:d[1],sel:d[2]}}function v(a){if("function"===typeof a)return function(d){d=a.call(d.item||d.context||d,d);return!d&&0!==d?"":d};var d=a.match(/^[\da-zA-Z\$_\@][\w\$:-]*(\.[\w\$:-]*[^\.])*$/);if(null===d){var b=!1,e=a,c=[],g=[],j=0,i;if(/\'|\"/.test(e.charAt(0))){if(/\'|\"/.test(e.charAt(e.length-1)))return i=e.substring(1,e.length-1),function(){return i}}else for(;null!==
(d=e.match(/#\{([^{}]+)\}/));)b=!0,c[j++]=e.slice(0,d.index),g[j]=v(d[1]),e=e.slice(d.index+d[0].length,e.length);if(!b)return function(){return a};c[j]=e;return D(c,g)}d=a.split(".");return function(a){var b=a.context||a,e=a[d[0]],a=0;if(e&&"undefined"!==typeof e.item){a+=1;if("pos"===d[a])return e.pos;b=e.item}for(var e=d.length,c;a<e&&b;a++)c=b[d[a]],b="function"===typeof c?b[d[a]].call(b):c;return!b&&0!==b?"":b}}function z(a,d,b){var e,c,g,j,i,h=[];if("string"===typeof d){if(e=d,(i=d.match(E))||
k("bad selector syntax: "+d),c=i[1],g=i[2],j=i[3],i=i[4],"."===g||!g&&j?h[0]=a:h=f.find(a,g),!h||0===h.length)return k('The node "'+d+'" was not found in the template:\n'+C(a).replace(/\t/g,"  "))}else c=d.prepend,j=d.attr,i=d.append,h=[a];if(c||i)c&&i?k("append/prepend cannot take place at the same time"):b?k("no append/prepend/replace modifiers allowed for loop target"):i&&b&&k("cannot append with loop (sel: "+e+")");var m,n,w,o,p;j?(w=/^style$/i.test(j),p=(o=/^class$/i.test(j))?"className":j,m=
function(a,d){a.setAttribute(F+j,d);if(p in a&&!w)try{a[p]=""}catch(b){}1===a.nodeType&&(a.removeAttribute(j),o&&a.removeAttribute(p))},n=w||o?w?function(a){return a.style.cssText}:function(a){return a.className}:function(a){return a.getAttribute(j)},a=function(a){return a.replace(/\"/g,"&quot;")},c=c?function(a,d){m(a,d+n(a))}:i?function(a,d){m(a,n(a)+d)}:function(a,d){m(a,d)}):(c=b?function(a,d){var b=a.parentNode;b&&(b.insertBefore(document.createTextNode(d),a.nextSibling),b.removeChild(a))}:c?
function(a,d){a.insertBefore(document.createTextNode(d),a.firstChild)}:i?function(a,d){a.appendChild(document.createTextNode(d))}:function(a,d){for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(d))},a=function(a){return a});return{attr:j,nodes:h,set:c,sel:e,quotefn:a}}function A(a,d){for(var b=G+d+":",e=0;e<a.nodes.length;e++)a.set(a.nodes[e],b)}function H(a,d,b,e,c){return function(g){var j=d(g),i=g[a],h={items:j},f=0,n,w=[],o=function(a,d,e,c){var h=g.pos,i=g.item,
P=g.items;g.pos=d.pos=a;g.item=d.item=j[a];g.items=j;"undefined"!==typeof c&&(g.length=c);"function"===typeof e&&!1===e.call(g.item,g)?f++:(w.push(b.call(g.item,g)),g.pos=h,g.item=i,g.items=P)};g[a]=h;if(B(j)){n=j.length||0;"function"===typeof e&&j.sort(e);for(var p=0;p<n;p++)o(p,h,c,n-f)}else for(n in j&&"undefined"!==typeof e&&k("sort is only available on arrays, not objects"),j)j.hasOwnProperty(n)&&o(n,h,c);"undefined"!==typeof i?g[a]=i:delete g[a];return w.join("")}}function I(a,d,b,e){var c=
!1,g,f,i,h;for(h in b)b.hasOwnProperty(h)&&("sort"===h?f=b.sort:"filter"===h?i=b.filter:(c&&k("cannot have more than one loop on a target"),g=h,c=!0));g||k("Error in the selector: "+d+"\nA directive action must be a string, a function or a loop(<-)");c=b[g];if("string"===typeof c||"function"===typeof c)return b={},b[g]={root:c},I(a,d,b,e);b=Q(g);g=v(b.sel);a=z(a,d,!0);d=a.nodes;for(r=0;r<d.length;r++){h=d[r];var m=x(h,c);e[e.length]=y(a.quotefn,H(b.name,g,m,f,i));a.nodes=[h];A(a,e.length-1)}return a}
function x(a,d,b,c){var f=[],g,j,i,h,m,n,k,o,p,r=[];if(!(h=c))if(h=b){h=a.getElementsByTagName("*");c=[];i=[];n={};var l,s,t;g=-1;for(j=h.length;g<j;g++)if(o=-1<g?h[g]:a,1===o.nodeType&&""!==o.className){t=o.className.split(" ");m=0;for(k=t.length;m<k;m++){l=t[m];a:{s=o.tagName;var u=l.match(E);l={prepend:!!u[1],prop:u[2],attr:u[3]||R[s],append:!!u[4],sel:l};var q=u=s=void 0,q=void 0;for(s=i.length-1;0<=s;s--)if(u=i[s],q=(q=u.l[0])&&q[l.prop],"undefined"!==typeof q){l.prop=u.p+"."+l.prop;!0===n[l.prop]&&
(q=q[0]);break}if("undefined"===typeof q&&(q=v(l.prop)(B(b)?b[0]:b),""===q)){l=!1;break a}B(q)?(i.push({l:q,p:l.prop}),n[l.prop]=!0,l.t="loop"):l.t="str"}if(!1!==l){s=/nodevalue/i.test(l.attr);if(-1<l.sel.indexOf("@")||s)o.className=o.className.replace("@"+l.attr,""),s&&(l.attr=!1);c.push({n:o,cspec:l})}}}h=c}c=h;if(b)for(;0<c.length;)if(i=c[0].cspec,h=c[0].n,c.splice(0,1),"str"===i.t)h=z(h,i,!1),A(h,f.length),f[f.length]=y(h.quotefn,v(i.prop));else{n=v(i.sel);h=z(h,i,!0);m=h.nodes;g=0;for(j=m.length;g<
j;g++)k=m[g],o=x(k,!1,b,c),f[f.length]=y(h.quotefn,H(i.sel,n,o)),h.nodes=[k],A(h,f.length-1)}for(p in d)if(d.hasOwnProperty(p)){b=0;c=d[p];i=p.split(/\s*,\s*/);n=i.length;do"function"===typeof c||"string"===typeof c?(p=i[b],h=z(a,p,!1),A(h,f.length),f[f.length]=y(h.quotefn,v(c))):I(a,p,c,f);while(++b<n)}a=C(a);a=a.replace(/<([^>]+)\s(value\=""|selected)\s?([^>]*)>/ig,"<$1 $3>");a=a.split(F).join("");a=a.split(G);for(b=1;b<a.length;b++)d=a[b],r[b]=f[parseInt(d,10)],a[b]=d.substring(d.indexOf(":")+
1);return D(a,r)}function L(a,b,c){var e=x((c||this[0]).cloneNode(!0),a,b);return function(a){return e({context:a})}}function M(a,b){for(var c="function"===typeof b&&b,e=0,k=this.length;e<k;e++)this[e]=J(this[e],(c||f.compile(b,!1,this[e]))(a,!1));context=null;return this}function N(a,b){for(var c=f.compile(b,a,this[0]),e=0,k=this.length;e<k;e++)this[e]=J(this[e],c(a,!1));context=null;return this}function J(a,b){var c,e=a.parentNode,f=0;e||(e=document.createElement("DIV"),e.appendChild(a));switch(a.tagName){case "TBODY":case "THEAD":case "TFOOT":b=
"<TABLE>"+b+"</TABLE>";f=1;break;case "TR":b="<TABLE><TBODY>"+b+"</TBODY></TABLE>";f=2;break;case "TD":case "TH":b="<TABLE><TBODY><TR>"+b+"</TR></TBODY></TABLE>",f=3}tmp=document.createElement("SPAN");tmp.style.display="none";document.body.appendChild(tmp);tmp.innerHTML=b;for(c=tmp.firstChild;f--;)c=c.firstChild;e.insertBefore(c,a);e.removeChild(a);document.body.removeChild(tmp);return c}var t=[],f=f||K();switch(typeof b){case "string":t=f.find(c||document,b);0===t.length&&k('The template "'+b+'" was not found');
break;case "undefined":k("The root of the template is undefined, check your selector");break;default:t=b}for(var r=0,b=t.length;r<b;r++)f[r]=t[r];f.length=b;var G="_s"+Math.floor(1E6*Math.random())+"_",F="_a"+Math.floor(1E6*Math.random())+"_",E=/^(\+)?([^\@\+]+)?\@?([^\+]+)?(\+)?$/,R={IMG:"src",INPUT:"value"},B=Array.isArray?function(a){return Array.isArray(a)}:function(a){return"[object Array]"===Object.prototype.toString.call(a)};return f};$p.plugins={};
$p.libs={dojo:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,c){return dojo.query(c,b)})},domassistant:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,c){return $(b).cssSelect(c)});DOMAssistant.attach({publicMethods:["compile","render","autoRender"],compile:function(b,c){return $p([this]).compile(b,c)},render:function(b,c){return $($p([this]).render(b,c))[0]},autoRender:function(b,c){return $($p([this]).autoRender(b,c))[0]}})},
jquery:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,c){return jQuery(b).find(c)});jQuery.fn.extend({directives:function(b){this._pure_d=b;return this},compile:function(b,c){return $p(this).compile(this._pure_d||b,c)},render:function(b,c){return jQuery($p(this).render(b,this._pure_d||c))},autoRender:function(b,c){return jQuery($p(this).autoRender(b,this._pure_d||c))}})},mootools:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,
c){return $(b).getElements(c)});Element.implement({compile:function(b,c){return $p(this).compile(b,c)},render:function(b,c){return $p([this]).render(b,c)},autoRender:function(b,c){return $p([this]).autoRender(b,c)}})},prototype:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,c){b=b===document?b.body:b;return"string"===typeof b?$$(b):$(b).select(c)});Element.addMethods({compile:function(b,c,f){return $p([b]).compile(c,f)},render:function(b,c,f){return $p([b]).render(c,
f)},autoRender:function(b,c,f){return $p([b]).autoRender(c,f)}})},sizzle:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,c){return Sizzle(c,b)})},sly:function(){"undefined"===typeof document.querySelector&&($p.plugins.find=function(b,c){return Sly(c,b)})},yui:function(){"undefined"===typeof document.querySelector&&YUI().use("node",function(b){$p.plugins.find=function(c,f){return b.NodeList.getDOMNodes(b.one(c).all(f))}});YUI.add("pure-yui",function(b){b.Node.prototype.directives=
function(b){this._pure_d=b;return this};b.Node.prototype.compile=function(b,f){return $p([this._node]).compile(this._pure_d||b,f)};b.Node.prototype.render=function(c,f){return b.one($p([this._node]).render(c,this._pure_d||f))};b.Node.prototype.autoRender=function(c,f){return b.one($p([this._node]).autoRender(c,this._pure_d||f))}},"0.1",{requires:["node"]})}};
(function(){var b="undefined"!==typeof dojo&&"dojo"||"undefined"!==typeof DOMAssistant&&"domassistant"||"undefined"!==typeof jQuery&&"jquery"||"undefined"!==typeof MooTools&&"mootools"||"undefined"!==typeof Prototype&&"prototype"||"undefined"!==typeof Sizzle&&"sizzle"||"undefined"!==typeof Sly&&"sly"||"undefined"!==typeof YUI&&"yui";b&&$p.libs[b]();"undefined"!==typeof exports&&(exports.$p=$p)})();