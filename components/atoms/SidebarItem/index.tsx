import React from 'react';
import cx from "classnames";
import Link from "next/link";

interface SidebarItemProps{
  icon:string;
  title:string;
  href: string;
  active:boolean;
  onClick?: () => void;

}

export default function SidebarItem(props:Partial<SidebarItemProps>) {
  const { icon, title, href = '/', active } = props;

  const classItem = cx({
    "item-menu": true,
    // "mb-30": true,
    active: active,
  });
  return (
    <>
    <Link href={href} legacyBehavior>
      <a className={classItem}>
        <i className={icon}></i>
        {title}
      </a>
      </Link>
    </>
  )
}
