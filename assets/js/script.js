document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     LOGIN FORM
     ===================== */
  if (window.innerWidth <= 768) {
  document.body.classList.remove("flex");
}

  const form   = document.getElementById("loginForm");
  const btn    = document.getElementById("loginBtn");
  const text   = document.querySelector(".btn-text");
  const loader = document.getElementById("loader");

  if(form && btn && text && loader){
    form.addEventListener("submit", e => {
      e.preventDefault();

      text.innerText = "Authenticating...";
      loader.style.display = "inline-block";
      btn.disabled = true;

      setTimeout(() => {
        text.innerText = "Login Successful!";
        loader.style.display = "none";
        btn.style.background =
          "linear-gradient(135deg,#22c55e,#16a34a)";

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 700);

      }, 1500);
    });
  }

  /* =====================
     STAR BACKGROUND
     ===================== */
  const starsCanvas = document.getElementById("stars");
  if(starsCanvas){
    const ctx = starsCanvas.getContext("2d");

    function resize(){
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
    }
    resize();

    const stars = Array.from({length:80}, () => ({
      x:Math.random()*starsCanvas.width,
      y:Math.random()*starsCanvas.height,
      r:Math.random()*2+1,
      dx:(Math.random()-.5)*.4,
      dy:(Math.random()-.5)*.4
    }));

    function animate(){
      ctx.clearRect(0,0,starsCanvas.width,starsCanvas.height);
      stars.forEach(s=>{
        ctx.beginPath();
        ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle="rgba(99,102,241,.5)";
        ctx.fill();

        s.x+=s.dx; s.y+=s.dy;
        if(s.x<0||s.x>starsCanvas.width) s.dx*=-1;
        if(s.y<0||s.y>starsCanvas.height) s.dy*=-1;
      });
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", resize);
  }

  /* =====================
     PRODUCT TABLE
     ===================== */
  const table = document.getElementById('productTable');
  if(table){
    table.addEventListener('click', e => {
      const row = e.target.closest('tr');
      if(!row) return;

      if(e.target.classList.contains('btn-delete')){
        row.remove();
      }
      if(e.target.classList.contains('btn-edit')){
        const nameCell = row.children[1];
        const newName = prompt("Edit Product Name:", nameCell.textContent);
        if(newName) nameCell.textContent = newName;
      }
    });
  }

  /* =====================
     REPORTS CHART (SAFE)
     ===================== */
  const chartCanvas = document.getElementById('ordersChart');
  if(chartCanvas && window.Chart){
    const chartCtx = chartCanvas.getContext('2d');
    new Chart(chartCtx, {
      type:'bar',
      data:{
        labels:['Jan','Feb','Mar','Apr','May','Jun'],
        datasets:[{
          data:[12,19,8,15,22,17],
          backgroundColor:'#6366f1'
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{legend:{display:false}}
      }
    });
  }

  /* =====================
     INVOICE ANIMATION
     ===================== */
  const summary = document.querySelector(".invoice-summary");
  if(summary){
    summary.style.animation = "fadeIn .6s ease";
  }

  /* =====================
     BILLING ORDERS
     ===================== */
  document.querySelectorAll(".billing-orders-table tbody tr")
    .forEach((row,i)=>{
      row.style.animationDelay = `${i*0.08}s`;
    });

  /* =====================
     SETTINGS SAVE BUTTON
     ===================== */
  const saveBtn = document.querySelector(".as-save-btn");
  if(saveBtn){
    saveBtn.addEventListener("click", ()=>{
      saveBtn.innerText = "Saving...";
      saveBtn.style.opacity = ".7";

      setTimeout(()=>{
        saveBtn.innerText = "✔ Saved Successfully";
        saveBtn.style.background = "#10b981";
        saveBtn.style.opacity = "1";
      },1200);
    });
  }

});

/* Dummy filter */
function filterOrders(){
  alert('Filter functionality can be implemented later');
}

/* ===== MOBILE SIDEBAR LOCK (FINAL FIX) ===== */
(function () {
  function fixMobileSidebar(){
    if (window.innerWidth <= 768) {
      document.body.classList.remove("flex");
      document.body.style.display = "block";
    }
  }
  fixMobileSidebar();
  window.addEventListener("resize", fixMobileSidebar);
})();


