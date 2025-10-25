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

// Dynamically load doctor names and timings from CSV
fetch('Data/DoctorData.csv')
  .then(response => response.text())
  .then(csv => {
    const sidebar = document.getElementById('doctorSidebar');
    const timingEl = document.querySelector('.timing');
    const doctorTitleEl = document.querySelector('.doctor-title');
    if (!sidebar) return;

    // Parse CSV into array of objects
    const doctors = csv.split('\n').map(line => {
      const parts = line.split(';');
      return {
        name: parts[0].trim(),
        timing: parts[2] ? parts[2].trim() : '',
        specialty: parts[1] ? parts[1].trim() : ''
      };
    }).filter(d => d.name);

    sidebar.innerHTML = '';
    doctors.forEach((doctor, idx) => {
      const div = document.createElement('div');
      div.className = 'doctor-item' + (idx === 0 ? ' selected' : '');
      div.textContent = doctor.name;
      div.dataset.idx = idx;
      sidebar.appendChild(div);
    });

    // Initial timing and doctor title
    if (timingEl && doctors[0]) {
      timingEl.textContent = `Timing: ${doctors[0].timing}`;
    }
    if (doctorTitleEl && doctors[0]) {
      doctorTitleEl.textContent = doctors[0].name;
    }

    // Click handler for doctor selection
    sidebar.addEventListener('click', function(e) {
      const item = e.target.closest('.doctor-item');
      if (!item) return;
      // Remove selected from all
      sidebar.querySelectorAll('.doctor-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      const idx = parseInt(item.dataset.idx, 10);
      if (timingEl && doctors[idx]) {
        timingEl.textContent = `Timing: ${doctors[idx].timing}`;
      }
      if (doctorTitleEl && doctors[idx]) {
        doctorTitleEl.textContent = doctors[idx].name;
      }
    });
  });
