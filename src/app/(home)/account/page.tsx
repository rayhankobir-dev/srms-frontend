import React from "react";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

function AccountPage() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <section className="grid grid-cols-12 gap-2.5">
        <Profile />
        <ChangePassword />
      </section>
    </div>
  );
}

export default AccountPage;
