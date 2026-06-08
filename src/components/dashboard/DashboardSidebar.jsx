import {
  Bell,
  Envelope,
  Gear,
  House,
  LayoutSideContent,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

const DashboardSidebar = () => {
  const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
    ];
    


    const navManuItem = (
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-muted" />
            {item.label}
          </button>
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
