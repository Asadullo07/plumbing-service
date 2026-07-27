/* ============================================================
   AquaPro Plumbing — modal.js
   ============================================================ */
'use strict';

const SERVICE_DATA = {
  emergency: {
    icon: 'fa-triangle-exclamation', iconClass: 'service-emergency',
    title: 'Emergency Plumbing',
    desc: 'Plumbing emergencies don\'t wait for business hours. Our 24/7 emergency team is dispatched within minutes of your call. We carry the equipment to handle burst pipes, major leaks, sewage backups, and no-water situations.',
    features: ['Average on-site time under 45 minutes', 'Burst pipe isolation and repair', 'Flood water extraction coordination', 'Temporary and permanent repairs', 'Insurance documentation support']
  },
  leak: {
    icon: 'fa-droplet-slash', iconClass: 'service-leak',
    title: 'Leak Detection & Repair',
    desc: 'Hidden leaks inside walls or under slabs can cause structural damage before you ever see them. Our thermal imaging and acoustic detection equipment finds the leak without tearing apart your home.',
    features: ['Thermal camera leak detection', 'Acoustic ground-microphone tracing', 'Slab leak isolation and repair', 'Pipe re-lining where suitable', 'Water meter verification']
  },
  drain: {
    icon: 'fa-sink', iconClass: 'service-drain',
    title: 'Drain Cleaning',
    desc: 'Slow or blocked drains are resolved with the right tool for the obstruction — from manual snaking of simple clogs to full hydro-jet treatment of grease-lined sewer lines.',
    features: ['Hydro-jet drain clearing', 'Main sewer line cleaning', 'Video inspection before and after', 'Grease trap cleaning', 'Bio-enzyme maintenance treatment']
  },
  heater: {
    icon: 'fa-fire-flame-curved', iconClass: 'service-heater',
    title: 'Water Heater Services',
    desc: 'Whether you need a straightforward tank replacement or an upgrade to an energy-efficient tankless system, our technicians are factory-certified on all major brands.',
    features: ['Tank and tankless installation', 'Gas and electric systems', 'Expansion tank installation', 'Anode rod replacement', 'Annual flushing and maintenance']
  },
  bathroom: {
    icon: 'fa-bath', iconClass: 'service-bath',
    title: 'Bathroom Installation',
    desc: 'From rough-in to the final connection of fixtures, we handle every aspect of bathroom plumbing — new builds, full remodels, and fixture upgrades.',
    features: ['Shower and tub rough-in', 'Toilet and bidet installation', 'Vanity and faucet connections', 'Exhaust fan venting', 'Waterproofing consultation']
  },
  kitchen: {
    icon: 'fa-faucet-drip', iconClass: 'service-kitchen',
    title: 'Kitchen Plumbing',
    desc: 'From a new faucet to a full kitchen plumbing redesign, we make sure your kitchen works as well as it looks.',
    features: ['Faucet and sink installation', 'Garbage disposal hookup', 'Dishwasher connection', 'Pot filler installation', 'Refrigerator ice line']
  },
  pipe: {
    icon: 'fa-pipe-valve', iconClass: 'service-pipe',
    title: 'Pipe Repair & Replacement',
    desc: 'Old galvanized, corroded copper, or cracked cast iron — we restore water flow and prevent future failures using trenchless techniques where possible.',
    features: ['Trenchless pipe lining (CIPP)', 'Pipe bursting replacement', 'Galvanized steel re-pipe', 'Main shutoff valve replacement', 'Backflow preventer installation']
  },
  commercial: {
    icon: 'fa-building', iconClass: 'service-commercial',
    title: 'Commercial Plumbing',
    desc: 'We work with property managers, general contractors, and business owners on projects ranging from single-floor TI work to multi-building campus builds.',
    features: ['New construction rough-in', 'Tenant improvement plumbing', 'Backflow preventer testing', 'Grease trap installation', 'Preventive maintenance contracts']
  }
};

window.openServiceModal = function(serviceKey) {
  const data = SERVICE_DATA[serviceKey];
  if (!data) return;
  const container = document.getElementById('service-modal-content');
  if (!container) return;
  container.innerHTML = `
    <div class="service-modal-icon ${data.iconClass}">
      <i class="fa-solid ${data.icon}"></i>
    </div>
    <h2>${data.title}</h2>
    <p>${data.desc}</p>
    <ul>
      ${data.features.map(f => `<li><i class="fa-solid fa-check"></i>${f}</li>`).join('')}
    </ul>
    <button class="btn-primary btn-full" onclick="closeModal('service-modal');openModal('quote-modal')">
      <i class="fa-solid fa-file-invoice"></i> Get a Quote for This Service
    </button>
  `;
  openModal('service-modal');
};

window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const focusable = modal.querySelector('button, [href], input, select, textarea');
  if (focusable) setTimeout(() => focusable.focus(), 100);
  modal.setAttribute('data-open', '1');
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = true;
  modal.removeAttribute('data-open');
  // Re-enable scroll only if no other modal is open
  if (!document.querySelector('.modal[data-open]')) {
    document.body.style.overflow = '';
  }
};

// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    const modal = e.target.closest('.modal');
    if (modal) closeModal(modal.id);
  }
});

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const open = document.querySelector('.modal[data-open]');
    if (open) closeModal(open.id);
  }
});
