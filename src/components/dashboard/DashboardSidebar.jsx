
import {
  Briefcase,
  Gear,
  LayoutSideContent,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { CiMoneyBill } from "react-icons/ci";
import { MdOutlineDashboard, MdOutlineFactory } from "react-icons/md";

const DashboardSidebar = async () => {

  const recruiterNavItems = [
    { icon: MdOutlineDashboard, href: "/recruiter", label: "Dashboard" },
    { icon: MdOutlineFactory, href: "#", label: "My Company" },
    { icon: Briefcase, href: "#", label: "Manage Jobs" },
    { icon: CiMoneyBill, href: "#", label: "Applications" },
    { icon: Person, href: "#", label: "Profile" },
    { icon: Gear, href: "#", label: "Settings" },
  ];
    


    const navManuItem = (
      <nav className="flex flex-col gap-1">
        {recruiterNavItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </Link>
        ))}
      </nav>
    );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block bg-white dark:bg-black rounded-lg">
        {navManuItem}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContent />
          Sidebar
        </Button>
        <Drawer.Backdrop closeOnOutsideClick closeOnEscape >
          <Drawer.Content placement="left">
            <Drawer.Dialog className="rounded-lg">
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navManuItem}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;
