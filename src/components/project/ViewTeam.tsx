"use client";
import { List, Modal, Tooltip } from "antd";
import React, { useState } from "react";
import { BsPeople } from "react-icons/bs";
import { GrView } from "react-icons/gr";

const ViewTeam = ({ project }: { project: any }) => {
  const [isViewModelOpen, setViewModelOpen] = useState(false);
  return (
    <div>
      <Tooltip placement="topLeft" title={"to view all team members"}>
        <button
          onClick={() => setViewModelOpen(true)}
          className="text-xl hover:text-blue-500 transition-colors duration-300"
        >
          <GrView />
        </button>
      </Tooltip>

      <Modal
        onCancel={() => setViewModelOpen(!isViewModelOpen)}
        footer={null}
        open={isViewModelOpen}
      >
        <h3 className=" flex  justify-center items-center gap-1 font-bold text-xl text-center">
          Team members <BsPeople />
        </h3>
        <List
          style={{ marginTop: "10px" }}
          size="small"
          dataSource={project.teamMembers}
          renderItem={(item: any) => <List.Item>{item}</List.Item>}
        />
      </Modal>
    </div>
  );
};

export default ViewTeam;
