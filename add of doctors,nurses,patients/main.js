document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('doctorSidebar');
  const doctorTitle = document.getElementById('doctorTitle');
  const timingEl = document.getElementById('timing');
  const patientInfo = document.getElementById('patientInfo');
  const addBtn = document.getElementById('addBtn');
  const addMenu = document.getElementById('addMenu');

  const doctors = [
    { name: "Dr. Qwerty", specialty: "Cardiologist", timing: "10 AM - 2 PM" },
    { name: "Dr. House", specialty: "Neurologist", timing: "2 PM - 6 PM" },
    { name: "Dr. Smith", specialty: "Surgeon", timing: "6 PM - 10 PM" }
  ];

  const patients = [
    { doctor: "Dr. Qwerty", name: "John Doe", age: 45, blood: "A+", gender: "Male", report: "High fever, awaiting tests." },
    { doctor: "Dr. Qwerty", name: "Sara Lee", age: 33, blood: "B+", gender: "Female", report: "Flu symptoms improving." },
    { doctor: "Dr. House", name: "Peter Jones", age: 62, blood: "O-", gender: "Male", report: "Mild concussion, resting." },
    { doctor: "Dr. House", name: "Jane Smith", age: 28, blood: "A-", gender: "Female", report: "Post-surgery recovery stable." },
    { doctor: "Dr. Smith", name: "Mark Kim", age: 51, blood: "B+", gender: "Male", report: "Preparing for minor surgery." }
  ];

  // Populate doctors list
  function renderDoctors() {
    sidebar.innerHTML = '';
    doctors.forEach((doc, idx) => {
      const div = document.createElement('div');
      div.className = 'doctor-item';
      div.textContent = doc.name;
      div.dataset.idx = idx;
      sidebar.appendChild(div);
    });
  }

  renderDoctors();

  function showDoctorDetails(doctor) {
    doctorTitle.textContent = doctor.name;
    timingEl.textContent = `Timing: ${doctor.timing}`;

    const filtered = patients.filter(p => p.doctor === doctor.name);
    if (filtered.length === 0) {
      patientInfo.innerHTML = `<em>No patients assigned to ${doctor.name}.</em>`;
      return;
    }

    let html = `
      <div class="patient-report-container">
        <div class="header-cards">
          <div class="info-card">Doctor: ${doctor.name}</div>
          <div class="info-card patient-count-card">Patients: ${filtered.length}</div>
        </div>
        <div class="patient-table">
          <div class="table-header">
            <div>Patient Name</div>
            <div>Age</div>
            <div>Blood GRP</div>
            <div>Gender</div>
            <div>Report Detail</div>
          </div>
    `;

    filtered.forEach(p => {
      html += `
        <div class="table-row-template">
          <div>${p.name}</div>
          <div>${p.age}</div>
          <div>${p.blood}</div>
          <div>${p.gender}</div>
          <div class="report-detail-cell">${p.report}</div>
        </div>
      `;
    });

    html += `</div></div>`;
    patientInfo.innerHTML = html;
  }

  // Doctor click
  sidebar.addEventListener('click', e => {
    const item = e.target.closest('.doctor-item');
    if (!item) return;
    sidebar.querySelectorAll('.doctor-item').forEach(el => el.classList.remove('selected'));
    item.classList.add('selected');
    showDoctorDetails(doctors[item.dataset.idx]);
  });

  // + button menu toggle
  addBtn.addEventListener('click', () => {
    addMenu.classList.toggle('show');
  });

  // Click outside closes menu
  document.addEventListener('click', e => {
    if (!addBtn.contains(e.target) && !addMenu.contains(e.target)) {
      addMenu.classList.remove('show');
    }
  });

  // Add new entries
  addMenu.addEventListener('click', e => {
    const type = e.target.dataset.type;
    if (!type) return;

    addMenu.classList.remove('show');

    if (type === 'doctor') {
      const name = prompt("Enter Doctor's Name:");
      const specialty = prompt("Enter Specialty:");
      const timing = prompt("Enter Timing:");
      if (name && specialty && timing) {
        doctors.push({ name: `Dr. ${name}`, specialty, timing });
        renderDoctors();
        alert(`Doctor ${name} added successfully!`);
      }
    } else if (type === 'patient') {
      const doctor = prompt("Assign to which doctor?");
      const name = prompt("Enter Patient Name:");
      const age = prompt("Enter Age:");
      const blood = prompt("Enter Blood Group:");
      const gender = prompt("Enter Gender:");
      const report = prompt("Enter Report Detail:");

      if (doctor && name && age && blood && gender && report) {
        if (isNaN(age)) return alert("Age must be an integer!");
        patients.push({ doctor: `Dr. ${doctor}`, name, age: Number(age), blood, gender, report });
        alert(`Patient ${name} assigned to Dr. ${doctor}`);
      }
    } else if (type === 'nurse') {
      const name = prompt("Enter Nurse Name:");
      const shift = prompt("Enter Shift Timing:");
      alert(`Nurse ${name} added for shift ${shift}.`);
    }
  });
});
