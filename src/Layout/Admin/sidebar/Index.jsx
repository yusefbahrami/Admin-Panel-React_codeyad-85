import React, { useContext } from "react";
import { AdminContext } from "../../../Context/AdminLayoutContext";
import Avatar from "./Components/Avatar";
import SidebarGroupTitle from "./Components/SidebarGroupTitle";
import SidebarItem from "./Components/SidebarItem";
import { useSelector } from "react-redux";

const Index = () => {
  const { showSidebar } = useContext(AdminContext);
  const user = useSelector((state) => state.userReducer.data);

  return (
    <section id="sidebar_section">
      <div
        className={`mini_sidebar collapsedd bg-dark h-100 ${
          showSidebar ? "expanded" : ""
        }`}
      >
        <div className="p-0 m-0">
          <Avatar
            name={
              user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : `${user.user_name}`
            }
            imagePath={
              user.image || "../../../assets/images/avatar/user-128.png"
            }
            alt="Avatar"
          />

          <SidebarItem
            title={"داشبورد"}
            icon={"fas fa-tachometer-alt"}
            customClass={"mt-2"}
            targetPath={"/"}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"فروشگاه"} />

          <SidebarItem
            title={"مدیریت گروه محصول"}
            icon={"fas fa-stream"}
            customClass={""}
            targetPath={"/categories"}
          />
          <SidebarItem
            title={"مدیریت محصول"}
            icon={"fas fa-cube"}
            customClass={""}
            targetPath={"/products"}
          />
          <SidebarItem
            title={"مدیریت برند ها"}
            icon={"fas fa-copyright"}
            customClass={""}
            targetPath={"/brands"}
          />
          <SidebarItem
            title={"مدیریت گارانتی ها"}
            icon={"fab fa-pagelines"}
            customClass={""}
            targetPath={"/guranties"}
          />
          <SidebarItem
            title={"مدیریت رنگ ها"}
            icon={"fas fa-palette"}
            customClass={""}
            targetPath={"/colors"}
          />
          <SidebarItem
            title={"مدیریت تخفیف ها"}
            icon={"fas fa-percentage"}
            customClass={""}
            targetPath={"/discounts"}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"سفارشات و سبد"} />

          <SidebarItem
            title={"مدیریت سبد ها"}
            icon={"fas fa-shopping-basket"}
            customClass={""}
            targetPath={"/carts"}
          />
          <SidebarItem
            title={"مدیریت سفارشات"}
            icon={"fas fa-luggage-cart"}
            customClass={""}
            targetPath={"/orders"}
          />
          <SidebarItem
            title={"مدیریت نحوه ارسال"}
            icon={"fas fa-truck-loading"}
            customClass={""}
            targetPath={"/deliveries"}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"کاربران و همکاران"} />

          <SidebarItem
            title={"مشاهده کاربران"}
            icon={"fas fa-users"}
            customClass={""}
            targetPath={"/users"}
          />
          <SidebarItem
            title={"نقش ها"}
            icon={"fas fa-user-tag"}
            customClass={""}
            targetPath={"/roles"}
          />
          <SidebarItem
            title={"مجوز ها"}
            icon={"fas fa-shield-alt"}
            customClass={""}
            targetPath={"/permissions"}
          />

          {/* <!-- =================================== --> */}
          <SidebarGroupTitle title={"ارتباطات"} />

          <SidebarItem
            title={"سوال ها"}
            icon={"fas fa-question-circle"}
            customClass={""}
            targetPath={"/questions"}
          />
          <SidebarItem
            title={"نظرات"}
            icon={"fas fa-comment"}
            customClass={""}
            targetPath={"/comments"}
          />
        </div>
      </div>
    </section>
  );
};
export default Index;
