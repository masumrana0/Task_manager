import { useProjectStore } from "@/Zustand/store";
import { Popconfirm, PopconfirmProps, Tooltip, message } from "antd";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteProject = ({ project }: { project: any }) => {
  const { deleteSpecificProject } = useProjectStore();

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    deleteSpecificProject(project);
    message.success("project delete successfull");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    message.error("project delete cancel");
  };
  return (
    <div>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
      >
        <Tooltip placement="topLeft" title={"delete project"}>
          <button className="text-xl hover:text-red-500 transition-colors duration-300">
            <AiOutlineDelete />
          </button>
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default DeleteProject;
