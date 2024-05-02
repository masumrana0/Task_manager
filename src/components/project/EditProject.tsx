"use client";
import { useStateStore } from "@/Zustand/store";
import { Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Form, Input, Button, List, message, Spin } from "antd";
import UpdateProjectModal from "./updateProject";
const EditProject = ({ project }: { project: any }) => {
  const { projectUpdateModalState, setProjectModalToggle } = useStateStore();

  const showModal = () => {
    setProjectModalToggle();
  };

  const handleCancel = () => {
    setProjectModalToggle();
  };
  return (
    <div>
      <Tooltip placement="topLeft" title={"edit project"}>
        <button
          onClick={showModal}
          className="text-xl hover:text-blue-500 transition-colors duration-300"
        >
          <FiEdit />
        </button>
      </Tooltip>

      <Modal
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        open={projectUpdateModalState}
        onCancel={handleCancel}
      >
        <UpdateProjectModal project={project} />
      </Modal>
    </div>
  );
};

export default EditProject;
