(function(){
  var h=document.getElementById('top'),b=document.getElementById('burger'),m=document.getElementById('menu');
  function onScroll(){h.classList.toggle('solid',window.scrollY>40)}
  onScroll();addEventListener('scroll',onScroll,{passive:true});
  function setMenu(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o));b.setAttribute('aria-label',o?'Close menu':'Open menu');document.documentElement.style.overflow=o?'hidden':''}
  b.addEventListener('click',function(){setMenu(!m.classList.contains('open'))});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  addEventListener('resize',function(){if(innerWidth>820)setMenu(false)});
 
  var i=document.getElementById('in'),o=document.getElementById('out');
  function iso(d){return d.toISOString().slice(0,10)}
  var t=new Date(),n=new Date(t.getTime()+864e5);
  i.min=iso(t);i.value=iso(t);o.min=iso(n);o.value=iso(n);
  i.addEventListener('change',function(){
    var next=new Date(new Date(i.value).getTime()+864e5);o.min=iso(next);
    if(!o.value||o.value<=i.value)o.value=iso(next);
  });
  document.getElementById('bookForm').addEventListener('submit',function(e){
    e.preventDefault();
    var g=document.getElementById('guests').value;
    var msg='Hello Shortlet Haven, I would like to book from '+i.value+' to '+o.value+' for '+g+' guest(s). Please confirm availability.';
    window.open('https://wa.me/2347031080961?text='+encodeURIComponent(msg),'_blank','noopener');
  });
  document.getElementById('yr').textContent=t.getFullYear();
})();

