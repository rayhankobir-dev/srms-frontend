"use client";
import TableSettings from "./TableSettings";
import GeneralSettings from "./GeneralSettings";
import ConfigureSettings from "./ConfigureSettings";

function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <TableSettings />
      <ConfigureSettings />
      <GeneralSettings />
    </div>
  );
}

export default SettingsPage;
