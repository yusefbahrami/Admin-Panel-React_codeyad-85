import swal from "sweetalert";

export const Alert = (icon, title, text) => {
  swal({
    icon: icon,
    title: title,
    text: text,
    buttons: "متوجه شدم",
  });
};

export const Confirm = (title, text) => {
  return swal({
    title: title,
    text: text,
    icon: "warning",
    buttons: ["خیر", "بله"],
    dangerMode: true,
  });
};
