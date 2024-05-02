"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import CreateProject from "./CreateProject";
import { useStateStore } from "@/Zustand/store";

const UpdateProjectModal = () => {
  const { createProjectModalState, setCreateModalToggle } = useStateStore();

  const showModal = () => {
    setCreateModalToggle();
  };

  const handleCancel = () => {
    setCreateModalToggle();
  };
  return (
    <div>
      <button
        onClick={showModal}
        className="text-sm text-white font-semibold px-5 bg-blue-500 py-2 rounded"
      >
        Create
      </button>
      <Modal
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        open={createProjectModalState}
        onCancel={handleCancel}
      >
        <CreateProject />
      </Modal>
    </div>
  );
};

export default UpdateProjectModal;
