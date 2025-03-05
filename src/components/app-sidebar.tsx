import * as React from "react";
import { BookOpen, Earth, GalleryVerticalEnd, User } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Dashboard",
      logo: GalleryVerticalEnd,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Utilisateurs",
      url: "/",
      icon: User,
      isActive: true,
    },
    {
      title: "Pays",
      url: "/countries",
      icon: Earth,
    },
    {
      title: "Statistiques et graphiques Cryptomonnaie",
      url: "/crypto",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
