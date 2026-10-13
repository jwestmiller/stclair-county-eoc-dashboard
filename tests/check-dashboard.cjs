const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(process.argv[2] || 'index.html','utf8'),scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
const source=scripts.map(m=>m[1]).join('\n');new vm.Script(source);
const elements=new Map();function el(id){if(!elements.has(id))elements.set(id,{innerHTML:'',innerText:'',textContent:'',className:'',classList:{add(){},remove(){},toggle(){}},insertAdjacentHTML(){},closest(){return {id:''}}});return elements.get(id);}
const storage=new Map();let report='';const ctx={console,Date,Intl,Number,String,Array,Object,Math,JSON,Set,structuredClone,URL,AbortSignal,setInterval(){},setTimeout(){},clearTimeout(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{getElementById:el,querySelector:()=>el('wrap'),querySelectorAll:()=>[],addEventListener(){},body:el('body')},window:{addEventListener(){},open:()=>({document:{write:s=>report=s,close(){}}})},navigator:{},location:{reload(){}},alert(){},confirm:()=>true};
vm.createContext(ctx);vm.runInContext(source.slice(0,source.lastIndexOf('initializeOperations();')),ctx);vm.runInContext('initializeOperations()',ctx);
function run(s){return vm.runInContext(s,ctx);}
assert.equal(run('CFG.activation.level'),'UNVERIFIED');assert.equal(run('CFG.esf.every(r=>r[2]==="s-unverified")'),true);
run('LAST_ALERTS=[];feedOK("alerts");updateStatusStrip()');assert.equal(el('ss-count').textContent,0);
el('alerts').innerHTML='<p>Last successful warning</p>';run('feedOK("alerts");feedDown("alerts")');assert(el('alerts').innerHTML.includes('Last successful warning'));assert.equal(el('ss-count').textContent,'Unknown');assert(el('ss-priority').textContent.includes('unavailable'));
run('feedOK("conditions",Date.now()-90*60000,60)');assert.equal(run('feedLabel("conditions")'),'Delayed');
run('feedOK("water");feedPartial("water","Missing station")');assert.equal(run('feedLabel("water")'),'Delayed / partial');
assert(run('floodContext("04160600",3)').includes('Threshold unavailable'));
run('CFG.thresholds["04160600"]={minor:2,source:"Official reference",datum:"Local ft",datumMatches:true,verifiedAt:new Date().toISOString()}');assert(run('floodContext("04160600",3)').includes('MINOR FLOOD'));
assert.equal(run('fromEasternInput("2026-10-13T14:00")'),'2026-10-13T18:00:00.000Z');assert.equal(run('fromEasternInput("2026-12-13T14:00")'),'2026-12-13T19:00:00.000Z');assert.throws(()=>run('fromEasternInput("2026-03-08T02:30")'));
ctx.openOpsDialog=(title,body)=>report=body;
run('OPS.overview.areas="<img src=x onerror=alert(1)>";OPS.esf["ESF-1"]={by:"Test agency",needs:"Test needs",confirmedAt:new Date().toISOString()};CFG.esf[0][2]="s-amber";persistOperations("Test update","Test agency");genSITREP()');assert(report.includes('&amp;lt;img'));assert(!report.includes('<img src=x'));for(const word of ['Test needs','Operational overview','Feed health and data gaps','Infrastructure, health, and shelter'])assert(report.includes(word));assert.equal(run('OPS.audit[0].action'),'Test update');
assert.throws(()=>run('validateShared({revision:1})'));
console.log('PASS: syntax, unverified migration, failed-feed retention, stale/partial feeds, threshold verification, Eastern Time/DST, audit persistence, and escaped SITREP content.');
