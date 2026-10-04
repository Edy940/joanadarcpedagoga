(function(){
  var el = document.getElementById('baixar'); if (!el) return;
  var pdf = el.getAttribute('data-pdf');
  setTimeout(function(){
    var a = document.createElement('a'); a.href = pdf; a.setAttribute('download', '');
    document.body.appendChild(a); a.click(); a.remove();
  }, 1200);
})();
