
// Custom icons
import {
  AdobexdLogo,
  
} from "components/Icons/Icons.js";

import {
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";

// Function to get today's date in a readable format
const getTodayDate = () => {
  const today = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true };
  return today.toLocaleDateString("en-US", options);
};

export const timelineData = [
  {
    logo: FaBell,
    title: "إجمالي عدد سكان الحي",
    date: getTodayDate(),
    color: "brand.200",
  },
  {
    logo: FaHtml5,
    title: "العدد الكلي للأنشطة العامة",
    date: getTodayDate(),
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "متوسط الدخل الفردي",
    date: getTodayDate(),
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "نسبة الذكور من السكان",
    date: getTodayDate(),
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "نسبة المواطنين السعوديين",
    date: getTodayDate(),
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "القرار النهائي بعد التحليل",
    date: getTodayDate(),
    color: "green.400",
  },
];

export const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "June, 25, 2019",
    code: "#QW-103578",
    price: "$120",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "March, 01, 2019",
    code: "#AR-803481",
    price: "$300",
    logo: FaFilePdf,
    format: "PDF",
  },
];
