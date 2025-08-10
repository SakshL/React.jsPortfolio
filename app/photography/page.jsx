import Link from "next/link";

export const metadata = {
 title: "Resume",
};

export default function Resume() {
 return (
  <div className="mx-auto mb-16 flex max-w-6xl flex-col items-start justify-center">
   <div className="mb-8">
    <h1 className="mb-4 flex items-center justify-center box-decoration-clone bg-clip-text text-center text-[2rem] font-semibold motion-reduce:transition-none">
     My resume
     <span className="bg-gradient-to-r from-[#6310ff] to-[#1491ff] box-decoration-clone bg-clip-text text-fill-transparent dark:from-[#a2facf] dark:to-[#64acff]">.</span>
    </h1>
    <p className="pb-2 text-slate-600 dark:text-slate-400">Here's my professional journey, experience, and skills as a creative tech enthusiast.</p>
    <p className="pb-6 text-slate-600 dark:text-slate-400">4 years of experience in web development and multimedia production, with a passion for building impactful projects.</p>
   </div>

   {/* Header Info */}
   <div className="mb-8 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <div className="text-center">
     <h2 className="text-3xl font-bold text-gray-900 dark:text-white">SAKSHYAM BARAL</h2>
     <p className="mt-2 text-gray-600 dark:text-gray-300">Jhapa District, Province No. 1, Nepal</p>
     <p className="mt-1 text-gray-600 dark:text-gray-300">9761611651 • sakshyambaral07@gmail.com</p>
     <div className="mt-3 flex justify-center space-x-4">
      <Link href="https://github.com/SakshL" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Github</Link>
      <Link href="#" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">LinkedIn</Link>
      <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Portfolio</Link>
     </div>
    </div>
   </div>

   {/* Profile */}
   <div className="mb-8 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">PROFILE</h3>
    <p className="text-gray-700 dark:text-gray-300">
     Creative tech enthusiast with 4 years of experience in web development and multimedia production. Built and maintained a
     personal portfolio site, led a video editing team, and used Python and Node.js to deliver engaging projects. Skilled in combining
     technical know-how with creative strategy to drive impactful results.
    </p>
   </div>

   {/* Key Projects */}
   <div className="mb-8 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">KEY PROJECTS</h3>
    <div className="space-y-4">
     <div>
      <div className="flex justify-between items-start">
       <h4 className="font-semibold text-gray-900 dark:text-white">Portfolio Website</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jan 2021 — Present</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">Built to showcase skills, resume, and projects using React, Tailwind CSS</p>
     </div>
     
     <div>
      <div className="flex justify-between items-start">
       <h4 className="font-semibold text-gray-900 dark:text-white">Student Manager Web App</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">May 2025 — Present</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">Feature-rich productivity tool for students with task manager, calendar, AI assistant, study organizer, and Pomodoro timer.</p>
     </div>
     
     <div>
      <div className="flex justify-between items-start">
       <h4 className="font-semibold text-gray-900 dark:text-white">Discord Shop Manager</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jan 2023 — Mar 2023</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">Built a bot & web dashboard that manages digital in-game shops through Discord DMs or a browser interface.</p>
     </div>
     
     <div>
      <div className="flex justify-between items-start">
       <h4 className="font-semibold text-gray-900 dark:text-white">Real-time Chat Website</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jan 2022 — Dec 2022</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">Developed with Flask & Socket.IO – Supports workspaces, live messaging, and user roles.</p>
     </div>
     
     <div>
      <div className="flex justify-between items-start">
       <h4 className="font-semibold text-gray-900 dark:text-white">Multi-language Dictionary API</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jan 2021 — Mar 2025</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">Backend API for retrieving definitions and translations using a custom-built dictionary server.</p>
     </div>
    </div>
   </div>

   <div className="grid gap-8 md:grid-cols-2">
    {/* Experience & Leadership */}
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
     <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">EXPERIENCE & LEADERSHIP</h3>
     <div className="space-y-4">
      <div>
       <h4 className="font-semibold text-gray-900 dark:text-white">Self-taught Student Developer</h4>
       <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
        <li>Built full-stack apps using Flask, Firebase, Node.js, and frontend tech</li>
        <li>Explored database integration, analytics, and UI/UX optimization</li>
       </ul>
      </div>
      
      <div>
       <h4 className="font-semibold text-gray-900 dark:text-white">Event Organizer & Team Lead - LFES</h4>
       <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
        <li>Led school's video production team using Adobe Premiere Pro</li>
        <li>Organized inter-school quiz competitions and cultural events</li>
       </ul>
      </div>
      
      <div>
       <h4 className="font-semibold text-gray-900 dark:text-white">JCI Event Coordinator</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jun 2024 — Present</span>
       <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Active member of JCI Birata Junior Jaycees, contributing to youth empowerment and educational outreach programs.</p>
      </div>
      
      <div>
       <h4 className="font-semibold text-gray-900 dark:text-white">Peer Academic Support Volunteer</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jun 2025 — Present</span>
       <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Dedicated 3–4 hours per day to support fellow students in academic subjects through one-on-one and group assistance.</p>
      </div>
     </div>
    </div>

    {/* Education & Skills */}
    <div className="space-y-8">
     {/* Education */}
     <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">EDUCATION</h3>
      <div>
       <h4 className="font-semibold text-gray-900 dark:text-white">Little Flowers' English School</h4>
       <span className="text-sm text-gray-500 dark:text-gray-400">Aug 2023 — Jul 2025</span>
       <p className="text-sm text-gray-700 dark:text-gray-300">Higher Secondary Education (Management With Computer Science)</p>
      </div>
     </div>

     {/* Skills */}
     <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">SKILLS</h3>
      <div className="grid grid-cols-1 gap-3">
       <div>
        <h5 className="font-medium text-gray-900 dark:text-white">Programming</h5>
        <p className="text-sm text-gray-700 dark:text-gray-300">Python, JavaScript, TypeScript</p>
       </div>
       <div>
        <h5 className="font-medium text-gray-900 dark:text-white">Web Technologies</h5>
        <p className="text-sm text-gray-700 dark:text-gray-300">HTML, Tailwind CSS, Firebase, Flask, Node.js</p>
       </div>
       <div>
        <h5 className="font-medium text-gray-900 dark:text-white">Tools & Technologies</h5>
        <p className="text-sm text-gray-700 dark:text-gray-300">Git, GitHub, Socket.IO, Canva</p>
       </div>
       <div>
        <h5 className="font-medium text-gray-900 dark:text-white">Specializations</h5>
        <p className="text-sm text-gray-700 dark:text-gray-300">Data Analysis, Real-time Apps, UI/UX Design</p>
       </div>
       <div>
        <h5 className="font-medium text-gray-900 dark:text-white">Soft Skills</h5>
        <p className="text-sm text-gray-700 dark:text-gray-300">Communication, Critical Thinking, Time Management</p>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Internships */}
   <div className="mt-8 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">INTERNSHIPS</h3>
    <div className="space-y-4">
     <div>
      <div className="flex justify-between items-start">
       <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Architecture Solutions Architecture, AWS</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">Remote</span>
       </div>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jun 2025 — Jul 2025</span>
      </div>
      <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
       <li>Designed scalable hosting architecture based on Elastic Beanstalk for client experiencing significant growth</li>
       <li>Described proposed architecture in plain language ensuring client understood costs and functionality</li>
      </ul>
     </div>
     
     <div>
      <div className="flex justify-between items-start">
       <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">Tech Explorer, Commonwealth Bank</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">Remote</span>
       </div>
       <span className="text-sm text-gray-500 dark:text-gray-400">Jan 2025 — Jul 2025</span>
      </div>
      <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
       <li>Completed job simulation focused on technology roles across software engineering, tech analysis, cybersecurity, and data science</li>
       <li>Coordinated stakeholder needs in requirement gathering and identified demographics for banking app advertising</li>
      </ul>
     </div>
    </div>
   </div>

   {/* Courses */}
   <div className="mt-8 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">COURSES & CERTIFICATIONS</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
     <div className="flex justify-between">
      <span className="text-gray-700 dark:text-gray-300">Business Analysis Foundations</span>
      <span className="text-gray-500 dark:text-gray-400">LinkedIn</span>
     </div>
     <div className="flex justify-between">
      <span className="text-gray-700 dark:text-gray-300">GitHub Foundations</span>
      <span className="text-gray-500 dark:text-gray-400">GitHub</span>
     </div>
     <div className="flex justify-between">
      <span className="text-gray-700 dark:text-gray-300">Career Essentials in Data Analysis</span>
      <span className="text-gray-500 dark:text-gray-400">Microsoft</span>
     </div>
     <div className="flex justify-between">
      <span className="text-gray-700 dark:text-gray-300">Complete Python Bootcamp</span>
      <span className="text-gray-500 dark:text-gray-400">Udemy</span>
     </div>
     <div className="flex justify-between">
      <span className="text-gray-700 dark:text-gray-300">Node JS: Advanced Concepts</span>
      <span className="text-gray-500 dark:text-gray-400">Udemy</span>
     </div>
     <div className="flex justify-between">
      <span className="text-gray-700 dark:text-gray-300">Social Media Marketing</span>
      <span className="text-gray-500 dark:text-gray-400">HubSpot</span>
     </div>
    </div>
   </div>

   {/* Hobbies */}
   <div className="mt-8 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
    <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">HOBBIES & INTERESTS</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
     <div>• Building Web & AI Projects</div>
     <div>• Exploring New Technologies</div>
     <div>• Video Editing & Digital Design</div>
     <div>• Strategy Games & Problem Solving</div>
     <div>• Reading Tech Articles & Blogs</div>
     <div>• Community Engagement</div>
    </div>
   </div>

   {/* Download Button */}
   <div className="mt-8 w-full text-center">
    <Link 
     href="/resume-sakshyam.pdf" 
     target="_blank"
     className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#6310ff] to-[#1491ff] px-6 py-3 text-white font-medium hover:shadow-lg transition-all duration-200"
    >
     <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
     </svg>
     Download PDF Resume
    </Link>
   </div>
  </div>
 );
}
