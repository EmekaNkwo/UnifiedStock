"use client";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, UserPlus, Mail, Edit, Ban } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenuAction } from "@/shared/custom-ui";
import { DataTable } from "@/shared/custom-ui/data-table";
import { User } from "../dashboard/types";

export const UserTable = ({
  isDashboardView = false,
  users,
}: {
  isDashboardView?: boolean;
  users: User[];
}) => {
  const getStatusBadge = (status: User["status"]) => {
    const statusMap = {
      active: { label: "Active", variant: "outline" as const },
      inactive: { label: "Inactive", variant: "secondary" as const },
      pending: { label: "Pending", variant: "default" as const },
    };

    const { label, variant } = statusMap[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("name")}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("email")}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("role")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="font-medium">
          {getStatusBadge(row.getValue("status"))}
        </span>
      ),
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("lastActive")}</span>
      ),
    },
    ...(isDashboardView
      ? []
      : [
          {
            id: "actions",
            header: "",
            cell: () => {
              return (
                <DropdownMenuAction
                  trigger={<MoreHorizontal className="h-4 w-4" />}
                  items={[
                    {
                      label: (
                        <div className="flex items-center gap-2">
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send Message</span>
                        </div>
                      ),
                      onClick: () => {},
                    },
                    {
                      label: (
                        <div className="flex items-center gap-2">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit User</span>
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="flex items-center gap-2">
                          <Ban className="mr-2 h-4 w-4" />
                          <span>Deactivate User</span>
                        </div>
                      ),
                    },
                  ]}
                />
              );
            },
          },
        ]),
  ];

  return (
    <div className="space-y-4">
      {isDashboardView ? null : (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Management</h2>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      )}

      <DataTable columns={columns} data={users} />
    </div>
  );
};
