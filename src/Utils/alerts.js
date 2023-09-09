import swal from "sweetalert";

export const Alert = (icon, title, text) => {
  swal({
    icon: icon,
    title: title,
    text: text,
    buttons: "متوجه شدم",
  });
};
