// ====== CONFIGURAÇÃO: troque aqui ======
var WHATSAPP = '5511983234251';                          // 55 + DDD + número, só dígitos. Vazio = usa Instagram e e-mail
var EMAIL    = 'pedagogajoanadarcsilva@gmail.com';
var INSTAGRAM = 'joanadarcpedagoga';
// ======================================
document.documentElement.classList.add('js');
(function(){
  var temZap = WHATSAPP.replace(/\D/g,'').length >= 12;
  function zap(txt){ return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(txt); }
  var direct = 'https://ig.me/m/' + INSTAGRAM;
  var padrao = 'Olá, Joana! Vim pelo site e quero saber sobre formações.';
  var flut = document.getElementById('zap-flutuante');
  if (temZap){
    flut.href = zap(padrao);
  } else {
    flut.href = direct;
    flut.setAttribute('aria-label', 'Falar com a Joana pelo Instagram');
    flut.style.background = '#6B8BA4';
    flut.style.boxShadow = '0 8px 24px rgba(78,107,130,.35)';
    if (document.getElementById('form-dica')) document.getElementById('form-dica').textContent = 'Preencha e a mensagem abre pronta no seu e-mail, direto para a Joana.';
    if (document.getElementById('btn-enviar')) document.getElementById('btn-enviar').textContent = 'Enviar por e-mail';
  }
  var em = document.getElementById('email-txt'); if (em){ em.textContent = EMAIL; em.href = 'mailto:' + EMAIL; }

  // formulário -> WhatsApp (ou e-mail, se não houver WhatsApp)
  var form = document.getElementById('form-proposta');
  if (form){
  function val(id){ return document.getElementById(id).value.trim(); }
  function erro(id, msg){ document.getElementById('e-' + id).textContent = msg; }
  ['nome','escola'].forEach(function(id){ document.getElementById('p-' + id).addEventListener('input', function(){ erro(id, ''); }); });
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var ok = true;
    if (!val('p-nome')){ erro('nome', 'Informe seu nome.'); ok = false; }
    if (!val('p-escola')){ erro('escola', 'Informe a escola ou unidade.'); ok = false; }
    if (!ok) return;
    var linhas = ['Olá, Joana! Vim pelo site e gostaria de uma proposta de formação.', '',
      'Nome: ' + val('p-nome'), 'Cargo: ' + val('p-cargo'), 'Unidade: ' + val('p-escola')];
    if (val('p-local')) linhas.push('Cidade/DRE: ' + val('p-local'));
    if (val('p-qtd')) linhas.push('Participantes: ' + val('p-qtd'));
    linhas.push('Tema: ' + val('p-tema'));
    if (val('p-msg')) linhas.push('', val('p-msg'));
    var url;
    if (temZap){ url = zap(linhas.join('\n')); }
    else { url = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Proposta de formação - ' + val('p-escola')) + '&body=' + encodeURIComponent(linhas.join('\n')); }
    var a = document.createElement('a');
    a.href = url; if (temZap){ a.target = '_blank'; a.rel = 'noopener'; }
    document.body.appendChild(a); a.click(); a.remove();
  });

  }
  // topo com sombra
  var topo = document.querySelector('.topo');
  function sombra(){ topo.classList.toggle('rolou', window.scrollY > 8); }
  window.addEventListener('scroll', sombra, {passive:true}); sombra();

  // elementos surgindo ao rolar
  var itens = document.querySelectorAll('.revela');
  if (!('IntersectionObserver' in window)){ itens.forEach(function(e){ e.classList.add('visivel'); }); return; }
  var io = new IntersectionObserver(function(ents){
    ents.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('visivel'); io.unobserve(en.target); } });
  }, {rootMargin:'0px 0px -8% 0px'});
  itens.forEach(function(e, i){ e.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(e); });
})();
(function(){
  // filtros das fichas
  var chips = document.querySelectorAll('.chip');
  var fichas = document.querySelectorAll('#fichas .ficha');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      var f = chip.getAttribute('data-filtro');
      chips.forEach(function(c){ c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      fichas.forEach(function(el){
        var faixas = el.getAttribute('data-faixa');
        var todas = el.querySelector('.faixa').textContent.indexOf('Todas') !== -1;
        var bemPeq = el.querySelector('.faixa').textContent.indexOf('Bem pequenas e pequenas') !== -1;
        var mostra = f === 'todas' || todas || faixas.indexOf(f) !== -1 || (bemPeq && (f === 'bem' || f === 'pequenas'));
        el.hidden = !mostra;
      });
    });
  });

  // monte seu contexto
  var MATERIAIS = [
    ['caixas','Caixas de papelão'],['tecidos','Tecidos'],['lanternas','Lanternas'],['natureza','Elementos naturais'],
    ['agua','Água'],['potes','Potes e recipientes'],['livros','Livros'],['espelhos','Espelhos'],['madeira','Madeira e carretéis'],['papel','Papel e giz']
  ];
  var PROPOSTAS = [
    {t:'Cesto dos tesouros', idades:['bebes'], espacos:['sala'], mats:['natureza','madeira','tecidos','potes'],
     o:'Um cesto baixo com objetos variados e seguros, bebês sentados ao redor.', obs:'Escolhas, gestos de exploração e tempo de concentração.'},
    {t:'Espelhos e tecidos', idades:['bebes','bem'], espacos:['sala'], mats:['espelhos','tecidos'],
     o:'Espelhos fixos na altura das crianças e tecidos leves para esconder e aparecer.', obs:'Reconhecimento de si, brincadeiras de esconde-esconde e expressões.'},
    {t:'Luz e sombra', idades:['bem','pequenas'], espacos:['sala','patio'], mats:['lanternas','caixas','tecidos'],
     o:'Canto escurecido, lanternas ao alcance e uma superfície clara para projetar.', obs:'Hipóteses sobre tamanho e forma das sombras.'},
    {t:'Construções com largo alcance', idades:['bem','pequenas'], espacos:['sala','patio'], mats:['caixas','madeira','tecidos'],
     o:'Materiais separados por tipo em cestos, com espaço livre para construir.', obs:'Equilíbrios, faz de conta e negociações.'},
    {t:'Transvasar com água', idades:['bebes','bem','pequenas'], espacos:['patio'], mats:['agua','potes'],
     o:'Bacias com pouca água, potes de tamanhos diferentes, funis e colheres.', obs:'Encher, esvaziar, comparar quantidades.'},
    {t:'Laboratório de natureza', idades:['bem','pequenas'], espacos:['patio','sala'], mats:['natureza','potes'],
     o:'Elementos naturais em bacias separadas, com potes para colecionar.', obs:'Comparações, classificações e critérios criados pelas crianças.'},
    {t:'Canto de leitura aconchegante', idades:['bebes','bem','pequenas'], espacos:['sala','patio'], mats:['livros','tecidos'],
     o:'Livros com a capa à vista, tapete e tecidos formando uma cabana.', obs:'Livros preferidos, manuseio e histórias recontadas.'},
    {t:'Desenho de observação', idades:['pequenas'], espacos:['sala','patio'], mats:['papel','natureza'],
     o:'Elementos naturais sobre a mesa, papel e giz disponíveis.', obs:'Detalhes que as crianças notam e registram.'},
    {t:'Túneis e cabanas', idades:['bebes','bem','pequenas'], espacos:['sala','patio'], mats:['caixas','tecidos'],
     o:'Caixas grandes abertas e tecidos para cobrir, formando passagens.', obs:'Movimento, entrar e sair, faz de conta.'},
    {t:'Sons e ritmos', idades:['bebes','bem','pequenas'], espacos:['sala','patio'], mats:['potes','madeira','natureza'],
     o:'Potes, pedaços de madeira e sementes em recipientes fechados para explorar sons.', obs:'Descobertas sobre forte, fraco, rápido e devagar.'}
  ];
  var box = document.getElementById('mat-opcoes');
  if (!box) return;
  MATERIAIS.forEach(function(m, i){
    var lab = document.createElement('label');
    lab.innerHTML = '<input type="checkbox" id="mat-' + m[0] + '" value="' + m[0] + '"' + (i < 3 ? ' checked' : '') + '> ' + m[1];
    box.appendChild(lab);
  });
  var res = document.getElementById('resultado');
  function atualiza(){
    var idade = document.querySelector('input[name=idade]:checked').value;
    var espaco = document.querySelector('input[name=espaco]:checked').value;
    var tenho = Array.prototype.map.call(document.querySelectorAll('#mat-opcoes input:checked'), function(i){ return i.value; });
    if (!tenho.length){ res.innerHTML = '<p class="vazio">Marque pelo menos um material para ver as sugestões.</p>'; return; }
    var lista = PROPOSTAS.filter(function(p){ return p.idades.indexOf(idade) !== -1 && p.espacos.indexOf(espaco) !== -1; })
      .map(function(p){ var n = p.mats.filter(function(m){ return tenho.indexOf(m) !== -1; }).length; return {p:p, n:n}; })
      .filter(function(x){ return x.n > 0; })
      .sort(function(a,b){ return b.n - a.n; }).slice(0, 3);
    if (!lista.length){ res.innerHTML = '<p class="vazio">Nenhuma sugestão com essa combinação. Experimente marcar outros materiais ou trocar o espaço.</p>'; return; }
    var nomes = {}; MATERIAIS.forEach(function(m){ nomes[m[0]] = m[1].toLowerCase(); });
    var html = lista.map(function(x){
      var usa = x.p.mats.filter(function(m){ return tenho.indexOf(m) !== -1; }).map(function(m){ return nomes[m]; }).join(', ');
      return '<div class="sugestao"><h3>' + x.p.t + '</h3><p><strong>Com:</strong> ' + usa + '</p><p><strong>Como organizar:</strong> ' + x.p.o + '</p><p><strong>O que observar:</strong> ' + x.p.obs + '</p></div>';
    }).join('');
    if (idade === 'bebes') html += '<p class="aviso">Com bebês: apenas objetos grandes, sem partes pequenas, e acompanhamento de perto.</p>';
    res.innerHTML = html;
  }
  document.getElementById('form-contexto').addEventListener('change', atualiza);
  atualiza();
})();

(function(){
  var topo = document.querySelector('.topo'), btn = document.querySelector('.menu-btn');
  if (!btn) return;
  btn.addEventListener('click', function(){
    var aberto = topo.classList.toggle('aberto');
    btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && topo.classList.contains('aberto')){ topo.classList.remove('aberto'); btn.setAttribute('aria-expanded','false'); btn.focus(); } });
})();

(function(){var f=document.getElementById('form-contexto'); if(f) f.addEventListener('submit', function(e){ e.preventDefault(); });})();
