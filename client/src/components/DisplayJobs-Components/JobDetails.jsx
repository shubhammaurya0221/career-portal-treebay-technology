import { MapPin, Heart, Share2, Upload } from "lucide-react";

const keyResponsibilities = [
  "Establish strategic goals for the piping department and secure the resources needed to achieve them.",
  "Manage departmental budgets and ensure alignment with financial expectations.",
  "Oversee the functional discipline, guiding the development and implementation of programs, processes, and policies that support organizational growth.",
  "Support proposal development.",
  "Ensure the technical quality, accuracy, and consistency of all piping deliverables.",
  "Set performance standards, enforce company procedures, and support continuous improvement initiatives.",
  "Ensure adherence to Human Resources policies and recommend updates when appropriate.",
  "Stay current with best practices relevant to piping and plant design.",
];

const technicalExperience = [
  "Extensive piping experience, including supervisory or management responsibility.",
  "Demonstrated ability to manage resources across multiple projects through effective delegation and oversight.",
  "Experience working with executive leadership on strategic initiatives that influence business performance.",
  "Ability to conceptualize, develop, and implement new ideas, processes, and organizational improvements.",
  "Strong communication and presentation skills, with the ability to convey technical information clearly.",
  "Proven leadership in multi-office and multicultural environments with a collaborative, team-oriented approach.",
  "Strong customer focus and commitment to delivering high-quality solutions.",
  "Deep expertise in piping, plant layout, equipment arrangement, and construction practices.",
  "Experience developing man-hour estimates and supporting business development.",
  "Strong understanding of project execution, delivery models, and problem-solving methodologies.",
  "Prior experience managing technical staff and developing engineering talent.",
];

const similarJobs = [
  { title: "Principal Piping Engineer", location: "Doha, Doha, QA", postedAgo: "6 months ago" },
  { title: "Senior Piping Engineer", location: "Doha, Doha, QA", postedAgo: "4 months ago" },
  { title: "Senior Piping Engineer", location: "Bogotá, Bogotá, CO", postedAgo: "19 days ago" },
];

const JobDetail = ({ job }) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Select a job to view details
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full px-6 py-5">
      {/* Priority Badge */}
      <div className="mb-3">
        <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 border border-yellow-300 rounded px-2 py-1">
          ★ Company Priority
        </span>
      </div>

      {/* Title Row */}
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{job.title}</h1>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-teal-600 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
        <MapPin className="w-4 h-4" />
        Baton Rouge, Louisiana, United States
        <span className="text-teal-600 font-medium ml-1 cursor-pointer hover:underline">+1 more</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors">
          Apply Now
        </button>
        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-md transition-colors">
          Add to cart
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mt-6">
        <button className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-2">
          Job description
        </button>
        <button className="text-sm text-gray-500 hover:text-gray-700 pb-2">Our Values</button>
      </div>

      {/* Meta Info Grid */}
      <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Requisition ID</p>
          <p className="text-gray-800 font-semibold mt-0.5">BAT00G2</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Reporting Location</p>
          <p className="text-gray-800 font-semibold mt-0.5">US Gulf Coast</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Job Field (Function / Discipline)</p>
          <p className="text-gray-800 font-semibold mt-0.5">Piping</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Primary Location</p>
          <p className="text-gray-800 font-semibold mt-0.5">Baton Rouge, Louisiana, United States, Baton Rouge, LA</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Date posted</p>
          <p className="text-gray-800 font-semibold mt-0.5">02/27/2026</p>
        </div>
      </div>

      {/* About Worley */}
      <div className="mt-6">
        <h2 className="text-base font-bold text-gray-900">Building on our past. Ready for the future</h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          Worley is a global professional services company of energy, chemicals and resources experts. We partner with customers to deliver projects and create value over the life of their assets. We're bridging two worlds, moving towards more sustainable energy sources, while helping to provide the energy, chemicals and resources needed now.
        </p>
      </div>

      {/* Purpose */}
      <div className="mt-5">
        <h2 className="text-base font-bold text-gray-900">Purpose:</h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          The Piping Engineering Department Manager serves as the technical and organizational leader for the Baton Rouge piping discipline. This role shapes the department's long-term direction, ensures the delivery of high-quality engineering work, and develops the people and processes that support Worley's success. The manager partners closely with project leadership, clients, and executive management to drive innovation, maintain compliance, and support business growth. This position requires a seasoned leader with deep piping expertise, strong communication skills, and a passion for developing teams.
        </p>
      </div>

      {/* Key Responsibilities */}
      <div className="mt-5">
        <h2 className="text-base font-bold text-gray-900">Key Responsibilities</h2>
        <ul className="mt-2 space-y-2">
          {keyResponsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* What You Will Bring */}
      <div className="mt-5">
        <h2 className="text-base font-bold text-gray-900">What You Will Bring</h2>
        <h3 className="text-sm font-semibold text-gray-700 mt-3">Technical and Industry Experience</h3>
        <ul className="mt-2 space-y-2">
          {technicalExperience.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Moving Forward Together */}
      <div className="mt-5">
        <h2 className="text-base font-bold text-gray-900">Moving forward together</h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          We're committed to building a diverse, inclusive and respectful workplace where everyone feels they belong, can bring themselves, and are heard. We provide equal employment opportunities to all qualified applicants and employees without regard to age, race, creed, color, religion, sex, national origin, ancestry, disability status, veteran status, sexual orientation, gender identity or expression, genetic information, marital status, citizenship status or any other basis as protected by law.
        </p>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          We want our people to be energized and empowered to drive sustainable impact. So, our focus is on a values-inspired culture that unlocks brilliance through belonging, connection and innovation.
        </p>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          And we're not just talking about it; we're doing it. We're reskilling our people, leveraging transferable skills, and supporting the transition of our workforce to become experts in today's low carbon energy infrastructure and technology.
        </p>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          Whatever your ambition, there's a path for you here. And there's no barrier to your potential career success. Join us to broaden your horizons, explore diverse opportunities, and be part of delivering sustainable change.
        </p>
      </div>

      {/* Similar Jobs */}
      <div className="mt-8 border-t border-gray-200 pt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Similar jobs</h2>
          <div className="flex gap-2">
            <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-500">‹</button>
            <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 text-gray-500">›</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {similarJobs.map((sj, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="text-sm font-semibold text-teal-600 hover:underline leading-snug">{sj.title}</h4>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                {sj.location}
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">Posted {sj.postedAgo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobDetail;