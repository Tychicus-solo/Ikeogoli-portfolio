import React from "react";
import { NAV_LINKS } from "../constants/heroconstants";

const NavList = () => {
  return (
    <div className="nav-list bg-[#4A526499] shadow-[0px_4px_24px_0px_#0B0F1A1A] backdrop-blur-[32px] flex w-[360px] max-w-full justify-between rounded-[16px] p-2">
      {NAV_LINKS.map((link, index) => {
        const isExternal = link.href.startsWith("http");

        return (
          <a
            key={index}
            href={link.href}
            className="nav-box"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            <span className="nav-items nav-label-window">
              <span className="nav-label-stack" aria-hidden="true">
                <span className="nav-label-copy nav-label-copy--muted">{link.label}</span>
                <span className="nav-label-copy nav-label-copy--active">{link.label}</span>
              </span>
              <span className="sr-only">{link.label}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default NavList;
