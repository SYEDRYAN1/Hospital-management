document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const sidebar = document.getElementById('doctorSidebar');
  const doctorTitle = document.getElementById('doctorTitle');
  const timingEl = document.getElementById('timing');
  const patientInfo = document.getElementById('patientInfo');
  const addBtn = document.getElementById('addBtn');
  const addMenu = document.getElementById('addMenu');
  const searchInput = document.getElementById('doctorSearch');

  // Load doctor data from CSV
  fetch('Data/DoctorData.csv')
    .then(response => response.text())
    .then(data => {
      const doctors = data.split('\n').map(line => {
        const [name, specialty, timing] = line.split(';').map(item => item.trim());
        return { name, specialty, timing };
      });

      function renderDoctors(filterQuery = '') {
        const query = filterQuery.toLowerCase();
        sidebar.innerHTML = '';
        doctors.forEach(doctor => {
          if (doctor.name.toLowerCase().includes(query) || 
              doctor.specialty.toLowerCase().includes(query)) {
            const div = document.createElement('div');
            div.className = 'doctor-item';
            div.innerHTML = `
              <div>${doctor.name}</div>
              <div>${doctor.specialty}</div>
            `;
            div.onclick = () => showDoctorDetails(doctor);
            sidebar.appendChild(div);
          }
        });
      }

      function showDoctorDetails(doctor) {
        doctorTitle.textContent = doctor.name;
        timingEl.textContent = `Timing: ${doctor.timing}`;
        
        // Sample patient data - in real app, this would come from backend
        const patients = [
          { name: 'John Doe', age: 45, condition: 'Stable' },
          { name: 'Jane Smith', age: 32, condition: 'Improving' }
        ];

        patientInfo.innerHTML = `
          <div class="patient-list">
            ${patients.map(patient => `
              <div class="patient-item">
                <h3>${patient.name}</h3>
                <p>Age: ${patient.age}</p>
                <p>Condition: ${patient.condition}</p>
              </div>
            `).join('')}
          </div>
        `;
      }

      // Initial render
      renderDoctors();

      // Search functionality
      searchInput.addEventListener('input', (e) => {
        renderDoctors(e.target.value);
      });

      // Add button functionality
      addBtn.addEventListener('click', () => {
        addMenu.classList.toggle('show');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!addBtn.contains(e.target) && !addMenu.contains(e.target)) {
          addMenu.classList.remove('show');
        }
      });

      // Handle menu item clicks
      addMenu.addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        if (!type) return;
        
        addMenu.classList.remove('show');
        // Handle different add actions
        switch(type) {
          case 'doctor':
            alert('Add doctor functionality');
            break;
          case 'nurse':
            alert('Add nurse functionality');
            break;
          case 'patient':
            alert('Add patient functionality');
            break;
        }
      });
    })
    .catch(error => {
      console.error('Error loading doctor data:', error);
      sidebar.innerHTML = '<div class="error">Error loading doctors</div>';
    });
});
