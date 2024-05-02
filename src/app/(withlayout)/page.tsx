"use client";
import CreateProjectModal from "@/components/project/UpdateProjectModal";
import { useEffect, useState } from "react";
import ProjectCard from "@/components/project/ProjectCard";
import { useProjectStore } from "@/Zustand/store";
import { Avatar, List, Skeleton, Spin } from "antd";
import ViewTeam from "@/components/project/ViewTeam";
import EditProject from "@/components/project/EditProject";
import DeleteProject from "@/components/project/DeleteProject";
import Link from "next/link";
import { HiReceiptPercent } from "react-icons/hi2";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const {
    deleteSpecificProject,
    projects,
    setProjects,
    updateSpecificProject,
  } = useProjectStore();

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setProjects(jsonData.projects);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full p-5  ">
      <h3 className="font-bold text-3xl mb-2 ">Projects</h3>

      <div className="h-[30rem] overflow-auto shadow-sm border p-2">
        <List
          className="demo-loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          dataSource={projects}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <ViewTeam key={item.id} project={item} />,
                <EditProject key={item.id} project={item} />,
                <DeleteProject key={item.id} project={item} />,
              ]}
            >
              <Link href={`/workspace/${item.id}`} className="w-full">
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={item.name}
                    description={item.details}
                  />
                </Skeleton>
              </Link>
            </List.Item>
          )}
        />
      </div>
      <div className="flex justify-center mt-10">
        <CreateProjectModal />
      </div>
    </div>
  );
};

export default HomePage;
