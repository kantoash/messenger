import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/user/UserList";
import React from "react";
import getUsers from "../actions/getUsers";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <>
      <Sidebar>
        <UserList users={users} />
        <div className="h-full">{children}</div>
      </Sidebar>
    </>
  );
}
