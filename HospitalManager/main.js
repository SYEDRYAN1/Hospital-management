(function(){
  const addBtn = document.getElementById('addBtn');
  const addMenu = document.getElementById('addMenu');

  if (addBtn && addMenu) {
    function toggleMenu(e){
      e.stopPropagation();
      const show = addMenu.classList.toggle('show');
      addMenu.setAttribute('aria-hidden', (!show).toString());
    }

    addBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', function(e){
      if (!addMenu.contains(e.target) && e.target !== addBtn) {
        addMenu.classList.remove('show');
        addMenu.setAttribute('aria-hidden', 'true');
      }
    });

    addMenu.addEventListener('click', function(e){
      const item = e.target.closest('.add-menu-item');
      if (!item) return;
      const action = item.getAttribute('data-action');
      console.log('Action selected:', action);
      alert(`You selected to ${action.replace('-', ' ')}.`);
      addMenu.classList.remove('show');
      addMenu.setAttribute('aria-hidden', 'true');
    });
  }
})();

// Dynamically load doctor names from CSV
fetch('Data/DoctorData.csv')
  .then(response => response.text())
  .then(csv => {
    const sidebar = document.getElementById('doctorSidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';
    csv.split('\n').forEach((line, idx) => {
      const parts = line.split(';');
      if (parts[0].trim()) {
        const div = document.createElement('div');
        div.className = 'doctor-item' + (idx === 2 ? ' selected' : '');
        div.textContent = parts[0].trim();
        sidebar.appendChild(div);
      }
    });
  });
