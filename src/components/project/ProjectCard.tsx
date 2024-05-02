"use client";
import { Button } from "antd";
import { useState } from "react";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import ViewTeam from "./ViewTeam";

const ProjectCard = ({ project }: { project: any }) => {
  const [isViewModelOpen, setViewModelOpen] = useState(false);

  console.log("productCard", project.id);

  return (
    <div className=" hover:scale-[1.1] p-5  transition duration-1000 ease-in-out max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {project.name}
          </div>

          <p className="mt-2 text-slate-500">{project.details}</p>
          <Button className="font-semibold border px-2  mt-2 bg">Select</Button>
        </div>
      </div>
      <div className="flex items-center justify-center  gap-3 m-2">
        {/* view button for viewing all team members */}

        {/* edit project data */}
      </div>
    </div>
  );
};

export default ProjectCard;
