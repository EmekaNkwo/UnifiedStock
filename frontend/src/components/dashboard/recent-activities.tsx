import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { Activity as ActivityType } from "./types";

interface RecentActivitiesProps {
  activities: ActivityType[];
}

export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-4 w-4" />
        Recent Activities
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{activity.item}</p>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {activity.qty > 0 ? `+${activity.qty}` : "0"}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
