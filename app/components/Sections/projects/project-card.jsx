import * as React from "react";
import { CiPlay1 } from "react-icons/ci";
import { FaGithub } from "react-icons/fa6";

function ProjectCard({ project }) {
  return (
    <div className="relative bg-gradient-to-r from-[#0d1224] to-[#0a0d37] rounded-lg border border-[#1b2c68a0] w-full shadow-xl hover:shadow-2xl overflow-hidden">
      {/* Project Title */}
      <div className="px-6 py-4 lg:px-8 lg:py-6 relative">
        {/* Move dots to the left */}
        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400 absolute top-1/2 left-4 -translate-y-1/2"></div>
        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400 absolute top-1/2 left-8 -translate-y-1/2"></div>
        <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200 absolute top-1/2 left-12 -translate-y-1/2"></div>

        {/* Project Name (Center aligned) */}
        <h3 className="text-center text-[#16f2b3] text-xl lg:text-2xl font-semibold">
          {project.name}
        </h3>
      </div>

      {/* Project Image */}
      <div className="w-full h-56 lg:h-64">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="border-t-2 border-indigo-900 px-6 lg:px-8 py-6 lg:py-8">
        <div className="space-y-6">
          {/* Description */}
          <div className="flex items-center space-x-2">
            <p className="text-cyan-400 text-sm lg:text-base">
              <span className="text-white font-medium text-md">
                Description:
              </span>{" "}
              {project.description}
            </p>
          </div>

          {/* Role */}
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">Role:</span>
            <span className="text-amber-300">{project.role}</span>
          </div>

          {/* Tools */}
          <div className="flex justify-center items-center space-x-2 pb-8">
            <div className="flex flex-wrap gap-3">
              {project.tools.map((tag, i) => (
                <span
                  key={i}
                  className="text-white bg-gray-800 px-3 py-1 rounded-lg text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="border-t-2 border-indigo-900 px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex justify-center gap-6 py-4">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-white border-2 border-transparent py-3 px-6 rounded-lg text-center font-semibold bg-blue-500 hover:bg-transparent hover:border-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View Code
                <FaGithub className="text-xl lg:text-2xl" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 text-white border-2 border-transparent py-3 px-6 rounded-lg text-center font-semibold bg-green-500 hover:bg-transparent hover:border-green-500 hover:text-green-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Start Demo
                <CiPlay1 className="text-xl lg:text-2xl" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
