import Link from "next/link";

export const metadata = {
 title: "Resume",
};

export default function Resume() {
 return (
  <div className="mx-auto mb-16 flex max-w-7xl flex-col items-start justify-center">
   {/* Hero Section */}
   <div className="relative mb-12 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#6310ff] via-[#1491ff] to-[#64acff] p-8 text-white">
    <div className="absolute inset-0 opacity-10">
     <div className="h-full w-full bg-repeat" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
    </div>
    <div className="relative z-10">
     <h1 className="mb-4 bg-gradient-to-r from-white via-[#a2facf] to-[#64acff] bg-clip-text text-5xl font-bold text-transparent">SAKSHYAM BARAL</h1>
     <p className="mb-4 text-2xl font-light text-white/90">Creative Tech Enthusiast & Full-Stack Developer</p>
     <p className="mb-6 text-lg text-white/80">4 years of experience crafting digital experiences</p>{" "}
     <div className="mb-6 flex flex-wrap gap-4">
      <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
       <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
       </svg>
       <span className="text-sm">sakshyambaral07@gmail.com</span>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
       <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
       </svg>
       <span className="text-sm">Jhapa, Nepal</span>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
       <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
       </svg>
       <span className="text-sm">9761611651</span>
      </div>
     </div>
     <div className="flex flex-wrap gap-3">
      <Link href="https://github.com/SakshL" target="_blank" className="group flex items-center gap-2 rounded-lg bg-zinc-800/50 px-4 py-2 backdrop-blur-sm transition-all hover:scale-105 hover:bg-zinc-800/70 dark:bg-white/10 dark:hover:bg-white/20">
       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
       </svg>
       <span className="text-sm font-medium">GitHub</span>
      </Link>
      <Link href="#" target="_blank" className="group flex items-center gap-2 rounded-lg bg-[#1491ff]/50 px-4 py-2 backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#1491ff]/70">
       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path>
       </svg>
       <span className="text-sm font-medium">LinkedIn</span>
      </Link>
      <Link href="/" className="group flex items-center gap-2 rounded-lg bg-[#6310ff]/50 px-4 py-2 backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#6310ff]/70">
       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
       </svg>
       <span className="text-sm font-medium">Portfolio</span>
      </Link>
     </div>
    </div>
   </div>

   {/* Profile Section */}
   <div className="mb-8 w-full">
    <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:border dark:border-neutral-800 dark:bg-[#161617]">
     <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-[#6310ff] to-[#1491ff] opacity-5 transition-all group-hover:scale-125"></div>
     <h2 className="mb-4 flex items-center text-2xl font-bold text-zinc-800 dark:text-white">
      <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
       <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
       </svg>
      </div>
      PROFILE
     </h2>
     <p className="text-lg leading-relaxed text-zinc-600 dark:text-slate-400">
      Creative tech enthusiast with <span className="font-semibold text-[#6310ff] dark:text-[#64acff]">4 years of experience</span> in web development and multimedia production. Built and maintained a personal portfolio site, led a video editing team, and used <span className="font-semibold text-[#1491ff] dark:text-[#64acff]">Python and Node.js</span> to deliver engaging projects. Skilled in combining technical know-how with creative strategy to drive impactful results.
     </p>
    </div>
   </div>

   {/* Key Projects */}
   <div className="mb-8 w-full">
    <h2 className="mb-6 flex items-center text-2xl font-bold text-zinc-800 dark:text-white">
     <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7-3 11H9L6 4H3m1 1h3l2 11h10l2-7H7" />
      </svg>
     </div>
     KEY PROJECTS
    </h2>

    <div className="grid gap-6 md:grid-cols-2">
     {[
      {
       title: "Portfolio Website",
       period: "Jan 2021 — Present",
       desc: "Built to showcase skills, resume, and projects using React, Tailwind CSS",
       gradient: "from-blue-500 to-cyan-500",
       icon: "🌐",
      },
      {
       title: "Student Manager Web App",
       period: "May 2025 — Present",
       desc: "Feature-rich productivity tool for students with task manager, calendar, AI assistant, study organizer, and Pomodoro timer.",
       gradient: "from-purple-500 to-pink-500",
       icon: "📚",
      },
      {
       title: "Discord Shop Manager",
       period: "Jan 2023 — Mar 2023",
       desc: "Built a bot & web dashboard that manages digital in-game shops through Discord DMs or a browser interface.",
       gradient: "from-indigo-500 to-purple-500",
       icon: "🤖",
      },
      {
       title: "Real-time Chat Website",
       period: "Jan 2022 — Dec 2022",
       desc: "Developed with Flask & Socket.IO – Supports workspaces, live messaging, and user roles.",
       gradient: "from-green-500 to-emerald-500",
       icon: "💬",
      },
      {
       title: "Multi-language Dictionary API",
       period: "Jan 2021 — Mar 2025",
       desc: "Backend API for retrieving definitions and translations using a custom-built dictionary server.",
       gradient: "from-orange-500 to-red-500",
       icon: "📖",
      },
     ].map((project, index) => (
      <div key={index} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl dark:border dark:border-neutral-800 dark:bg-[#161617]">
       <div className="absolute inset-0 bg-gradient-to-br from-[#6310ff] to-[#1491ff] opacity-0 transition-opacity group-hover:opacity-5"></div>
       <div className="relative">
        <div className="mb-4 flex items-start justify-between">
         <div className="flex items-center gap-3">
          <span className="text-2xl">{project.icon}</span>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-white">{project.title}</h3>
         </div>
         <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">{project.period}</span>
        </div>
        <p className="text-zinc-600 dark:text-slate-400">{project.desc}</p>
       </div>
      </div>
     ))}
    </div>
   </div>

   {/* Experience and Skills Grid */}
   <div className="grid gap-8 lg:grid-cols-3">
    {/* Experience */}
    <div className="lg:col-span-2">
     <h2 className="mb-6 flex items-center text-2xl font-bold text-zinc-800 dark:text-white">
      <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
       <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
       </svg>
      </div>
      EXPERIENCE & LEADERSHIP
     </h2>

     <div className="space-y-6">
      {[
       {
        title: "Self-taught Student Developer",
        company: "",
        period: "",
        points: ["Built full-stack apps using Flask, Firebase, Node.js, and frontend tech", "Explored database integration, analytics, and UI/UX optimization"],
        color: "blue",
       },
       {
        title: "Event Organizer & Team Lead",
        company: "LFES",
        period: "",
        points: ["Led school's video production team using Adobe Premiere Pro", "Organized inter-school quiz competitions and cultural events"],
        color: "purple",
       },
       {
        title: "JCI Event Coordinator",
        company: "Birtamod",
        period: "Jun 2024 — Present",
        points: ["Active member of JCI Birata Junior Jaycees, contributing to youth empowerment", "Participated in The Biggest Education Fest 2025, received Certificate of Appreciation"],
        color: "green",
       },
       {
        title: "Peer Academic Support Volunteer",
        company: "Birtamod",
        period: "Jun 2025 — Present",
        points: ["Dedicated 3–4 hours per day to support fellow students in academic subjects", "Provided one-on-one and small group assistance with concept clarification"],
        color: "teal",
       },
      ].map((exp, index) => (
       <div key={index} className="relative rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-${exp.color}-400 to-${exp.color}-600`}></div>
        <div className="ml-4">
         <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
           {exp.company && <p className="text-sm text-gray-500 dark:text-gray-400">{exp.company}</p>}
          </div>
          {exp.period && <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">{exp.period}</span>}
         </div>
         <ul className="space-y-2">
          {exp.points.map((point, i) => (
           <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-${exp.color}-500 flex-shrink-0`}></div>
            {point}
           </li>
          ))}
         </ul>
        </div>
       </div>
      ))}
     </div>
    </div>

    {/* Education & Skills */}
    <div className="space-y-8">
     {/* Education */}
     <div className="rounded-2xl bg-white p-6 shadow-lg dark:border dark:border-neutral-800 dark:bg-[#161617]">
      <h3 className="mb-4 flex items-center text-xl font-bold text-zinc-800 dark:text-white">
       <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
       </div>
       EDUCATION
      </h3>
      <div className="rounded-lg border border-[#6310ff]/10 bg-gradient-to-br from-[#6310ff]/5 to-[#1491ff]/5 p-4 dark:from-[#1491ff]/10 dark:to-[#64acff]/10">
       <h4 className="font-semibold text-zinc-800 dark:text-white">Little Flowers' English School</h4>
       <p className="text-sm text-zinc-500 dark:text-slate-400">Aug 2023 — Jul 2025</p>
       <p className="mt-1 text-sm text-zinc-600 dark:text-slate-400">
        Higher Secondary Education
        <br />
        (Management With Computer Science)
       </p>
      </div>
     </div>

     {/* Skills */}
     <div className="rounded-2xl bg-white p-6 shadow-lg dark:border dark:border-neutral-800 dark:bg-[#161617]">
      <h3 className="mb-4 flex items-center text-xl font-bold text-zinc-800 dark:text-white">
       <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
       </div>
       SKILLS
      </h3>
      <div className="space-y-4">
       {[
        { category: "Programming", skills: ["Python", "JavaScript", "TypeScript"] },
        { category: "Web Tech", skills: ["HTML", "Tailwind CSS", "Firebase", "Flask", "Node.js"] },
        { category: "Tools", skills: ["Git", "GitHub", "Socket.IO", "Canva"] },
        { category: "Specializations", skills: ["Data Analysis", "Real-time Apps", "UI/UX"] },
       ].map((skillGroup, index) => (
        <div key={index} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
         <h5 className="mb-2 font-medium text-zinc-800 dark:text-white">{skillGroup.category}</h5>
         <div className="flex flex-wrap gap-1">
          {skillGroup.skills.map((skill, i) => (
           <span key={i} className="rounded-full bg-[#6310ff]/10 px-2 py-1 text-xs font-medium text-[#6310ff] dark:bg-[#1491ff]/20 dark:text-[#64acff]">
            {skill}
           </span>
          ))}
         </div>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>

   {/* Internships */}
   <div className="mt-8 w-full">
    <h2 className="mb-6 flex items-center text-2xl font-bold text-zinc-800 dark:text-white">
     <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2-2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
      </svg>
     </div>
     INTERNSHIPS
    </h2>

    <div className="grid gap-6 md:grid-cols-2">
     {[
      {
       title: "Architecture Solutions Architecture, AWS",
       location: "Remote",
       period: "Jun 2025 — Jul 2025",
       points: ["Designed scalable hosting architecture based on Elastic Beanstalk for client experiencing significant growth", "Described proposed architecture in plain language ensuring client understood costs and functionality"],
       logo: "☁️",
      },
      {
       title: "Tech Explorer, Commonwealth Bank",
       location: "Remote",
       period: "Jan 2025 — Jul 2025",
       points: ["Completed job simulation focused on technology roles across software engineering, tech analysis, cybersecurity, and data science", "Coordinated stakeholder needs in requirement gathering and identified demographics for banking app advertising"],
       logo: "🏦",
      },
     ].map((internship, index) => (
      <div key={index} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl dark:border dark:border-neutral-800 dark:bg-[#161617]">
       <div className="absolute inset-0 bg-gradient-to-br from-[#6310ff] to-[#1491ff] opacity-0 transition-opacity group-hover:opacity-5"></div>
       <div className="relative">
        <div className="mb-4 flex items-start gap-4">
         <span className="text-3xl">{internship.logo}</span>
         <div className="flex-1">
          <h3 className="text-lg font-bold text-zinc-800 dark:text-white">{internship.title}</h3>
          <p className="text-sm text-zinc-500 dark:text-slate-400">{internship.location}</p>
          <span className="mt-1 inline-block rounded-full bg-[#6310ff]/10 px-3 py-1 text-xs font-medium text-[#6310ff] dark:bg-[#1491ff]/20 dark:text-[#64acff]">{internship.period}</span>
         </div>
        </div>
        <ul className="space-y-2">
         {internship.points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-slate-400">
           <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1491ff]"></div>
           {point}
          </li>
         ))}
        </ul>
       </div>
      </div>
     ))}
    </div>
   </div>

   {/* Courses & Hobbies */}
   <div className="mt-8 grid gap-8 lg:grid-cols-2">
    {/* Courses */}
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
     <h3 className="mb-4 flex items-center text-xl font-bold text-gray-900 dark:text-white">
      <div className="mr-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 p-2">
       <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
       </svg>
      </div>
      COURSES & CERTIFICATIONS
     </h3>
     <div className="grid gap-3">
      {[
       { name: "Business Analysis Foundations", org: "LinkedIn", color: "blue" },
       { name: "GitHub Foundations", org: "GitHub", color: "gray" },
       { name: "Career Essentials in Data Analysis", org: "Microsoft", color: "green" },
       { name: "Complete Python Bootcamp", org: "Udemy", color: "yellow" },
       { name: "Node JS: Advanced Concepts", org: "Udemy", color: "green" },
       { name: "Social Media Marketing", org: "HubSpot", color: "orange" },
      ].map((course, index) => (
       <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
        <span className="text-sm font-medium text-zinc-800 dark:text-white">{course.name}</span>
        <span className="rounded-full bg-[#6310ff]/10 px-2 py-1 text-xs font-medium text-[#6310ff] dark:bg-[#1491ff]/20 dark:text-[#64acff]">{course.org}</span>
       </div>
      ))}
     </div>
    </div>

    {/* Hobbies */}
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:border dark:border-neutral-800 dark:bg-[#161617]">
     <h3 className="mb-4 flex items-center text-xl font-bold text-zinc-800 dark:text-white">
      <div className="mr-3 rounded-full bg-gradient-to-r from-[#6310ff] to-[#1491ff] p-2">
       <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
       </svg>
      </div>
      HOBBIES & INTERESTS
     </h3>
     <div className="grid gap-3">
      {[
       { hobby: "Building Web & AI Projects", icon: "🚀" },
       { hobby: "Exploring New Technologies", icon: "🔬" },
       { hobby: "Video Editing & Digital Design", icon: "🎬" },
       { hobby: "Strategy Games & Problem Solving", icon: "🎯" },
       { hobby: "Reading Tech Articles & Blogs", icon: "📚" },
       { hobby: "Community Engagement", icon: "🤝" },
      ].map((item, index) => (
       <div key={index} className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm text-zinc-600 dark:text-slate-400">{item.hobby}</span>
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Download CTA */}
   <div className="mt-12 w-full text-center">
    <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
     <h3 className="mb-4 text-2xl font-bold">Ready to Connect?</h3>
     <p className="mb-6 text-lg opacity-90">Download my resume or get in touch to discuss opportunities</p>
     <div className="flex flex-wrap justify-center gap-4">
      <Link href="/resume-sakshyam.pdf" target="_blank" className="group inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-[#6310ff] transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-lg">
       <svg className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
       </svg>
       Download PDF Resume
      </Link>
      <Link href="/contact" className="group inline-flex items-center rounded-xl bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30 hover:shadow-lg">
       <svg className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
       </svg>
       Get In Touch
      </Link>
     </div>
    </div>
   </div>
  </div>
 );
}
