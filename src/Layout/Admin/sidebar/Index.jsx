import React, { useContext } from "react";
import { AdminContext } from "../../../Context/AdminLayoutContext";
import Avatar from "./Components/Avatar";
import SidebarGroupTitle from "./Components/SidebarGroupTitle";
import SidebarItem from "./Components/SidebarItem";

const Index = () => {
  const { showSidebar } = useContext(AdminContext);
  return (
    <section id="sidebar_section">
      <div
        className={`mini_sidebar collapsedd bg-dark h-100 ${
          showSidebar ? "expanded" : ""
        }`}
      >
        <div className="p-0 m-0">
          <Avatar
            name="قاسم بساکی"
            imagePath="../../../assets/images/avatar/user2.jpg"
            alt="Avatar"
          />

          <SidebarItem
            title={"داشبورد"}
            icon={"fas fa-tachometer-alt"}
            customClass={"mt-2 active"}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"فروشگاه"} />

          <SidebarItem
            title={"مدیریت گروه محصول"}
            icon={"fas fa-stream"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت محصول"}
            icon={"fas fa-cube"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت برند ها"}
            icon={"fas fa-copyright"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت گارانتی ها"}
            icon={"fab fa-pagelines"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت رنگ ها"}
            icon={"fas fa-palette"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت تخفیف ها"}
            icon={"fas fa-percentage"}
            customClass={""}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"سفارشات و سبد"} />

          <SidebarItem
            title={"مدیریت سبد ها"}
            icon={"fas fa-shopping-basket"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت سفارشات"}
            icon={"fas fa-luggage-cart"}
            customClass={""}
          />
          <SidebarItem
            title={"مدیریت نحوه ارسال"}
            icon={"fas fa-truck-loading"}
            customClass={""}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"کاربران و همکاران"} />

          <SidebarItem
            title={"مشاهده کاربران"}
            icon={"fas fa-users"}
            customClass={""}
          />
          <SidebarItem
            title={"نقش ها"}
            icon={"fas fa-user-tag"}
            customClass={""}
          />
          <SidebarItem
            title={"مجوز ها"}
            icon={"fas fa-shield-alt"}
            customClass={""}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"ارتباطات"} />

          <SidebarItem
            title={"سوال ها"}
            icon={"fas fa-question-circle"}
            customClass={""}
          />
          <SidebarItem
            title={"نظرات"}
            icon={"fas fa-comment"}
            customClass={""}
          />
          {/* <!-- <li className="py-2 btn-group dropstart pe-4">
                  <i className="ms-3 icon fas fa-check text-light"></i>
                  <span className="hiddenable" data-bs-toggle="dropdown" aria-expanded="false">داشبورد</span>
                  <ul className="dropdown-menu px-2 sidebar_submenu_list">
                    <li className="d-none">اول</li>
                    <li>اول</li>
                    <li>دوم</li>
                    <li>سوم</li>
                  </ul>
              </li> --> */}
        </div>
      </div>
    </section>
  );
};
export default Index;
