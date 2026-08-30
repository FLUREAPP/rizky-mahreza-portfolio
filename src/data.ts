export type CertificationCategory = 'regulatory' | 'technical' | 'training' | 'academic'

export const profile = {
  name: 'Rizky Mahreza',
  title: 'Health, Safety & Environment Professional',
  role: 'Senior HSE Specialist',
  location: 'Riau, Indonesia',
  email: 'rizkymahrezaweb@gmail.com',
  phone: '+62 812 7619 7045',
  linkedin: 'https://linkedin.com/in/rizky-mahreza',
  bio: 'AK3U and BNSP Oil & Gas HSE Supervisor with approximately seven years of experience across the Pertamina Hulu Rokan working area. Background in Public Health with an Occupational Health & Safety focus, with practical capability in HIRADC, JSA, Permit-to-Work, incident investigation and continuous improvement.',
  value: 'Driving operational excellence and an unshakable safety culture across the upstream oil & gas landscape — including the Pertamina Hulu Rokan working area.',
  specialisation: 'Upstream Oil & Gas HSE',
  workingArea: 'Pertamina Hulu Rokan — WK Rokan',
  education: 'Bachelor of Public Health (S.KM) — K3',
  leadCredentials: ['AK3U', 'Pengawas K3 Migas', 'Gas Tester'],
  languages: ['Bahasa Indonesia (Native)', 'English (Professional)'],
}

export const experience = [
  { period: 'Jan 2025 – Present', start: '2025-01-01', role: 'HSE Officer', company: 'KSO Catur Elang Perkasa – Sentra Multikarya Infrastruktur', location: 'Duri, Riau (PHR Working Area)', badge: 'CURRENT ROLE', bullets: ['Safety induction & K3 training', 'Manage HSE Plan, SOP and weekly reporting aligned with SMK3 & ISO 45001', 'HIRADC/JSA and Permit-to-Work validation', 'Incident investigation and CAPA follow-up'] },
  { period: 'Nov 2023 – Sep 2024', start: '2023-11-01', role: 'Operational Coordinator & Dispatcher', company: 'Pancaran Energi Transport (assigned to Baker Hughes Indonesia)', location: 'Petra Project', badge: 'MAJOR PROJECT', bullets: ['Workforce and logistics scheduling with document control', 'Client liaison and equipment readiness monitoring', 'Proactive document renewal to eliminate expiry-related downtime', 'Cost and dispatch optimisation'] },
  { period: 'Oct 2020 – Oct 2023', start: '2020-10-01', role: 'HSE Field Officer', company: 'PT Asrindo Citraseni Satria', location: 'Pertamina Hulu Rokan – WK Rokan', bullets: ['Implemented SMK3 standards in drilling and well-service operations', 'Daily inspections, safety audits and toolbox meetings', 'PPE and Permit-to-Work enforcement', 'Contributed to zero-LTI performance'] },
  { period: 'Mar 2019 – Mar 2020', start: '2019-03-01', role: 'Rig Drilling Clerk', company: 'PT Asrindo Citraseni Satria', location: 'Drilling Operations – WK Rokan', bullets: ['Operational documentation and personnel/inventory data', 'Rig administration supporting HSE standards', 'Administrative reporting to management'] },
  { period: 'Mar 2017 – Jan 2018', start: '2017-03-01', role: 'HSE Coop Student (Batch XIV)', company: 'PT Chevron Pacific Indonesia', location: 'Rumbai, Riau', badge: 'FOUNDATIONAL', bullets: ['Chevron–SKK Migas HSE Coop programme', 'Supported safety data collection and campaign rollout', 'Received Certificate of Appreciation from Chevron'] },
].sort((a, b) => b.start.localeCompare(a.start))

export const competencies = [
  ['HIRADC', 'Hazard identification, risk assessment and control selection across drilling, lifting and confined-space work.'],
  ['Job Safety Analysis (JSA)', 'Step-by-step task hazard breakdown aligned with field controls before work starts.'],
  ['Permit to Work', 'Issue, validate and field-assure cold, hot, confined-space and energized-work permits.'],
  ['ISO 45001 / 14001 / 9001', 'Integrated HSEQ management awareness, document control and internal audit readiness.'],
  ['Accident Investigation', 'Root-cause analysis using TapRoot / 5-Why with corrective and preventive follow-through.'],
  ['Gas Testing — Oil & Gas', 'Certified atmospheric gas testing for confined-space entry and hot-work readiness.'],
  ['Safety Leadership', 'Toolbox meetings, behaviour-based coaching and frontline HSE campaign communication.'],
  ['Emergency Response', 'Fire safety, first aid and emergency mustering drills following industry good practice.'],
]

export const certifications = [
  ['Ahli K3 Umum (AK3U)', 'General Occupational Safety Expert', 'Kementerian Ketenagakerjaan RI', '2025-01-17', '2028-01-17', '0060170125/Q-AK3U/31/I/2025', 'regulatory'],
  ['Gas Testing Operator — Oil & Gas', 'Pengoperasian Gas Tester Industri Migas', 'BNSP – LSP Energi Indonesia', '2025-08-01', '2028-08-01', '06100 32570017478 2025', 'technical'],
  ['Pengawas K3 Migas', 'Oil & Gas OHS Supervisor', 'BNSP – LSP Pengembangan Energi & Mineral Indonesia', '2024-09-13', '2027-09-13', '78429 3257 0009150 2024', 'regulatory'],
  ['ISO 45001:2018', 'Occupational Health & Safety Management System', 'PT Duta Selaras Solusindo', '2021-02-17', null, '022/291/ISO-45001/DSS/II/2021', 'technical'],
  ['ISO 14001:2015', 'Environmental Management System', 'PT Duta Selaras Solusindo', '2021-02-17', null, '022/291/ISO-14001/DSS/II/2021', 'technical'],
  ['ISO 9001:2015', 'Quality Management System', 'PT Duta Selaras Solusindo', '2021-02-17', null, '022/291/ISO-9001/DSS/II/2021', 'technical'],
  ['Pembinaan Pengawasan Norma K3', 'Calon Ahli Keselamatan & Kesehatan Kerja', 'Kemnaker RI – Ditjen Binwasnaker & K3', '2021-04-22', null, 'S/2752/AS.02.04/IV/2021', 'regulatory'],
  ['Safety Leadership Workshop', 'Frontline Safety Leadership', 'PT Sigma Energi Indonesia', '2023-10-07', null, 'SEI.DR.L.VI.06.10.23.4279', 'training'],
  ['Forum Komunikasi HSSE Mitra Kerja', 'WK Rokan Operational Safety Initiative', 'PT Pertamina Hulu Rokan', '2023-12-13', null, null, 'training'],
  ['Certificate of Appreciation', 'HSE Coop Student Batch XIV', 'Chevron Pacific Indonesia & SKK Migas', '2018-01-30', null, null, 'training'],
  ['Bachelor of Public Health (S.KM)', 'Occupational Health & Safety', 'Institut Kesehatan Payung Negeri Pekanbaru', '2019-09-20', null, '13012019000251', 'academic'],
  ['Hiperkes & K3', '—', 'Dinas Tenaga Kerja dan Transmigrasi DKI Jakarta / Pusat Hiperkes & Kesehatan Kerja', '2018-04-19', null, '0119/PHKK-DKI/PLT/IV/2018', 'training'],
] as const

export const projects = [
  ['UPSTREAM OPERATIONS', 'Contractor HSE Programme — WK Rokan', 'Zero-LTI execution across a multi-year well-service campaign in the Pertamina Hulu Rokan working area, embedding daily pre-job briefings, JSA validation and HIRADC review.', ['Zero LTI streak', 'Multi-rig coverage', 'ISO 45001 aligned']],
  ['PETRA PROJECT — BAKER HUGHES', 'Artificial Lift Systems Logistics', 'Dispatch, workforce scheduling and document control for Baker Hughes Artificial Lift Systems, reducing permit-related downtime through proactive renewal tracking.', ['24/7 dispatch', 'Document SLA 100%', 'Cross-org liaison']],
  ['CHEVRON — COOP BATCH XIV', 'HSE Field Exposure', 'Early-career HSE exposure through the Chevron–SKK Migas Coop programme, supporting field data collection and safety campaign rollout.', ['Chevron–SKK Migas', 'HSE programme']],
  ['INTEGRATED MANAGEMENT SYSTEM', 'HSEQ Management Awareness', 'Practical exposure to integrated management-system controls, documentation and field briefing practices.', ['ISO 45001', 'ISO 14001', 'ISO 9001']],
  ['PHR WORKING AREA', 'Field Safety Operations', 'Ongoing HSE execution in the WK Rokan environment, covering induction, training, risk assessment, work permits and incident follow-up.', ['SMK3 aligned', 'HIRADC / JSA', 'CAPA follow-up']],
]

export const stats = [
  ['7+', 'Years in HSE'],
  [String(projects.length), 'Major Projects'],
  ['9+', 'Active Certifications'],
]
