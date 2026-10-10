export const profile = {
  name: 'DuyKR',
  email: 'duylh2802@gmail.com',
  city: 'Ho Chi Minh City, VN',
  github: 'https://github.com/',
  facebook: 'https://facebook.com/',
  linkedin: 'https://linkedin.com/',
}

export const projects = [
  {
    number: '01', title: 'Atlas API', category: 'BACKEND SYSTEMS', status: 'CONCEPT PROJECT',
    description: 'A thoughtfully structured REST API blueprint for teams building reliable, maintainable services.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL'], accent: 'mint', visual: 'atlas',
    github: 'https://github.com/', demo: '',
  },
  {
    number: '02', title: 'Orbit Notes', category: 'FULL-STACK APPLICATION', status: 'CONCEPT PROJECT',
    description: 'A calm workspace concept for collecting research, connecting ideas, and finding your way back.',
    stack: ['React', 'TypeScript', 'Node.js'], accent: 'violet', visual: 'orbit',
    github: 'https://github.com/', demo: '',
  },
  {
    number: '03', title: 'Fieldwork', category: 'MOBILE APPLICATION', status: 'CONCEPT PROJECT',
    description: 'A mobile-first field journal concept designed to make observations easy to capture and revisit.',
    stack: ['Flutter', 'Dart', 'SQLite'], accent: 'amber', visual: 'field',
    github: 'https://github.com/', demo: '',
  },
]

export type TimelineEntry = {
  stage: string
  category: string
  icon: 'education' | 'mobile' | 'backend' | 'fullstack' | 'current'
  title: string
  description: string
  highlights: string[]
  technologies?: string[]
  exploring?: string[]
  status?: string
  current?: boolean
}

export const timeline: TimelineEntry[] = [
  {
    stage: '01', category: 'EDUCATION & FOUNDATIONS', icon: 'education', title: 'Building My Programming Foundations',
    description: 'Started exploring software engineering through programming fundamentals, algorithms, data structures, databases, and object-oriented programming.',
    highlights: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Design', 'Software Engineering Principles'],
    technologies: ['Java', 'C', 'SQL', 'Git'],
  },
  {
    stage: '02', category: 'MOBILE DEVELOPMENT', icon: 'mobile', title: 'Building My First Mobile Applications',
    description: 'Explored mobile development by building practical applications, working with local databases, state management, authentication, and user-friendly interfaces.',
    highlights: ['Flutter application development', 'Android development', 'State management with BLoC', 'Local storage & API integration'],
    technologies: ['Flutter', 'Dart', 'Android', 'SQLite', 'Firebase'],
  },
  {
    stage: '03', category: 'BACKEND DEVELOPMENT', icon: 'backend', title: 'Diving Deeper Into Backend Systems',
    description: 'Focused on designing RESTful APIs, database-driven applications, authentication systems, and maintainable backend architectures.',
    highlights: ['REST APIs & JWT authentication', 'Database modeling', 'Spring Data JPA & Hibernate', 'Backend application architecture'],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'PostgreSQL', 'JWT'],
  },
  {
    stage: '04', category: 'FULL-STACK ENGINEERING', icon: 'fullstack', title: 'From Writing Code to Shipping Products',
    description: 'Expanded into full-stack development and deployment, connecting frontend applications with backend services and learning how to operate applications in real environments.',
    highlights: ['React frontend development', 'REST API integration', 'Docker containerization', 'Linux deployment & GitHub Actions CI/CD'],
    technologies: ['React', 'TypeScript', 'Docker', 'Linux', 'GitHub Actions'],
  },
  {
    stage: '05', category: 'CURRENTLY EXPLORING', icon: 'current', title: 'Building More Scalable & Intelligent Systems',
    description: 'Currently exploring advanced backend engineering, system design, distributed systems, AI integration, and developer productivity.',
    highlights: ['System design', 'Distributed systems', 'AI integration', 'Scalable backend architecture & developer tools'],
    exploring: ['Docker', 'Redis', 'Kubernetes', 'Python', 'AI APIs'], status: 'IN PROGRESS', current: true,
  },
]

export const stack = [
  { category: '01 / INTERFACE', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'], symbol: '◈', color: 'violet' },
  { category: '02 / SERVER', items: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Python'], symbol: '⌘', color: 'cyan' },
  { category: '03 / MOBILE', items: ['Flutter', 'Dart'], symbol: '↗', color: 'blue' },
  { category: '04 / DATA', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis'], symbol: '⠿', color: 'amber' },
  { category: '05 / WORKFLOW', items: ['Docker', 'Git', 'GitHub', 'Linux', 'GitHub Actions'], symbol: '⌬', color: 'mint' },
]
