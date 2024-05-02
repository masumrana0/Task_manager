"use client";
import { useProjectStore } from "@/Zustand/store";
import TaskManagement from "@/components/ui/TaskManagement";
import { Button } from "antd";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const WorkSpacePage = () => {
  const { setOneProject, specificProject } = useProjectStore();
  const [isDetail, setDetail] = useState(false);

  const { projectId } = useParams();
  useEffect(() => {
    setOneProject(projectId);
  }, []);

  return (
    <div>
      <div className="flex gap-3">
        <button
          onClick={() => setDetail(false)}
          className={`px-3 py-1 border   rounded ${
            isDetail ? "text-gray-700 bg-gray-100" : "bg-blue-500 text-white"
          } `}
        >
          TaskManagement
        </button>

        <button
          onClick={() => setDetail(true)}
          className={`px-3 py-1 border  rounded ${
            isDetail ? "bg-blue-500 text-white" : "text-gray-700 bg-gray-100"
          } `}
        >
          Details
        </button>
      </div>

      {/* Render detail content conditionally based on isDetail state */}
      {isDetail ? (
        <div>
          {/* Your detail content here */}
          <p>Detail content goes here...</p>
        </div>
      ) : (
        <div>
          <TaskManagement />
        </div>
      )}
    </div>
  );
};

export default WorkSpacePage;
