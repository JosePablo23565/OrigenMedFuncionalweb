import { useState, useEffect, type FormEvent } from 'react';
import { es, enUS } from 'react-day-picker/locale';
import {
  Stethoscope,
  Ear,
  Clock,
  Check,
  Calendar as CalendarIcon,
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar } from '../Calendar/Calendar';
import { createAppointment, getBookedSlotsForDate } from '../../lib/appointments';
import { getScheduleForDate, DEFAULT_SLOTS } from '../../lib/schedule';
import type { TranslationKeys } from '../../i18n/translations';
import styles from './BookingModal.module.css';

const FunctionalMedicineIcon = ({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const scaledSize = Math.round(size * 1.25);
  return (
    <svg
      width={scaledSize}
      height={scaledSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7488 7.34053C9.49374 8.89889 8.10234 11.5449 8.00638 14.3044C7.749 22.1015 15.3314 28.2636 21.4409 33.2285C22.3352 33.9553 23.198 34.6565 24 35.3333C24.7208 34.7346 25.4898 34.1145 26.2862 33.4723C32.459 28.4948 40.2731 22.1936 39.9927 14.3044C39.8967 11.5449 38.5053 8.89889 36.2503 7.34053C32.661 4.84283 28.3552 6.15555 25.4157 8.65954C24.8974 9.10111 24.4215 9.57972 23.9995 10.081C23.5774 9.57957 23.1014 9.10119 22.5828 8.66008C19.6434 6.15955 15.3378 4.85676 11.7488 7.34053ZM22.9996 26.5392V31.9166L22.6122 31.6017C20.0321 29.5046 17.3166 27.2975 14.9984 24.8173C11.8728 21.4733 9.88475 18.0429 10.0052 14.3722C10.0808 12.2158 11.1752 10.168 12.8858 8.98587L12.8869 8.98512C14.4173 7.92604 16.1313 7.78555 17.8455 8.28208C19.6032 8.79125 21.2846 9.96143 22.4694 11.369L23.9995 13.1867L25.5296 11.369C26.7157 9.95989 28.398 8.78615 30.1552 8.27552C31.8679 7.77783 33.579 7.91823 35.1079 8.98217L35.1132 8.98587C36.8243 10.1683 37.9189 12.2169 37.9939 14.374L37.9939 14.3755C38.1238 18.0302 36.1425 21.4752 33.017 24.8313C30.6177 27.4076 27.7749 29.7007 25.1052 31.8541L24.9996 31.9394V28.408C25.2738 28.3774 25.6408 28.3294 26.0379 28.2579C26.4503 28.1837 26.9144 28.0807 27.3486 27.9383C27.7634 27.8021 28.2411 27.6016 28.6119 27.2905C28.9822 26.9798 29.2622 26.545 29.4681 26.1608C29.6837 25.7587 29.8655 25.3203 30.0102 24.9275C30.2812 24.1917 30.4473 23.5456 30.4716 23.4493C30.5311 23.2208 30.5092 22.9733 30.3999 22.7528C30.2202 22.3902 29.8396 22.1717 29.4359 22.1992L29.4319 22.1995L29.4241 22.2001L29.3974 22.202C29.3748 22.2038 29.3428 22.2063 29.3024 22.2098C29.2217 22.2168 29.1072 22.2275 28.9677 22.2428C28.6899 22.2732 28.3073 22.3222 27.8917 22.397C27.4793 22.4713 27.0152 22.5742 26.581 22.7167C26.1662 22.8528 25.6885 23.0533 25.3177 23.3645C25.2032 23.4605 25.0973 23.5685 24.9996 23.6831V21.408C25.2738 21.3774 25.6408 21.3294 26.0379 21.2579C26.4503 21.1837 26.9144 21.0807 27.3486 20.9383C27.7634 20.8021 28.2411 20.6016 28.6119 20.2905C28.9822 19.9798 29.2622 19.545 29.4681 19.1608C29.6837 18.7587 29.8655 18.3203 30.0102 17.9275C30.2812 17.1917 30.4473 16.5456 30.4716 16.4493C30.5311 16.2208 30.5092 15.9733 30.3999 15.7528C30.2202 15.3902 29.8396 15.1717 29.4359 15.1992L29.4319 15.1995L29.4241 15.2001L29.3974 15.202C29.3748 15.2038 29.3428 15.2063 29.3024 15.2098C29.2217 15.2168 29.1072 15.2275 28.9677 15.2428C28.6899 15.2732 28.3073 15.3222 27.8917 15.397C27.4793 15.4713 27.0152 15.5742 26.581 15.7167C26.1662 15.8528 25.6885 16.0533 25.3177 16.3645C24.9476 16.675 24.6676 17.1096 24.4617 17.4936C24.3739 17.6574 24.2917 17.8273 24.2152 17.9977C24.1368 17.7201 24.0081 17.2938 23.8381 16.8323C23.6934 16.4396 23.5116 16.0014 23.2961 15.5994C23.0902 15.2154 22.8103 14.7809 22.4402 14.4703C22.0694 14.1592 21.5916 13.9587 21.1768 13.8225C20.7427 13.6801 20.2786 13.5771 19.8661 13.5029C19.4505 13.4281 19.0679 13.379 18.7901 13.3486C18.6506 13.3334 18.5362 13.3227 18.4554 13.3157C18.415 13.3122 18.383 13.3096 18.3604 13.3079L18.3337 13.3059L18.3259 13.3053L18.3219 13.3051C17.918 13.2775 17.5372 13.4963 17.3577 13.8592C17.2486 14.0797 17.2268 14.3268 17.2863 14.5552C17.3106 14.6515 17.4767 15.2976 17.7477 16.0334C17.8924 16.4262 18.0742 16.8646 18.2897 17.2667C18.4956 17.6509 18.7757 18.0857 19.1459 18.3963C19.5167 18.7075 19.9945 18.9082 20.4093 19.0441C20.8434 19.1866 21.3075 19.2895 21.7199 19.3638C22.1356 19.4386 22.5182 19.4876 22.796 19.518C22.8717 19.5263 22.94 19.5332 22.9996 19.539V22.1067C22.8417 21.8756 22.6563 21.6519 22.4402 21.4705C22.0694 21.1594 21.5916 20.9589 21.1768 20.8228C20.7427 20.6803 20.2786 20.5774 19.8661 20.5031C19.4505 20.4283 19.0679 20.3793 18.7901 20.3489C18.6506 20.3336 18.5362 20.3229 18.4554 20.3159C18.415 20.3124 18.383 20.3099 18.3604 20.3081L18.3337 20.3061L18.3259 20.3056L18.3219 20.3053C17.918 20.2778 17.5372 20.4966 17.3577 20.8595C17.2486 21.0799 17.2268 21.3271 17.2863 21.5554C17.3106 21.6517 17.4767 22.2979 17.7477 23.0337C17.8924 23.4265 18.0742 23.8649 18.2897 24.267C18.4956 24.6512 18.7757 25.0859 19.1459 25.3966C19.5167 25.7077 19.9945 25.9082 20.4093 26.0443C20.8434 26.1868 21.3075 26.2898 21.7199 26.364C22.1356 26.4388 22.5182 26.4879 22.796 26.5183C22.8717 26.5265 22.94 26.5335 22.9996 26.5392ZM20.0525 16.322C19.921 16.0766 19.797 15.793 19.6854 15.5039C19.9888 15.5635 20.2891 15.6362 20.5532 15.7228C20.8869 15.8324 21.0766 15.9369 21.1546 16.0024C21.2324 16.0677 21.3679 16.2357 21.5334 16.5444C21.6649 16.7897 21.789 17.0735 21.9007 17.3628C21.5973 17.3032 21.297 17.2305 21.0329 17.1438C20.6991 17.0343 20.5095 16.9297 20.4315 16.8643C20.3536 16.7989 20.218 16.6308 20.0525 16.322ZM26.7249 19.038C26.4609 19.1246 26.1606 19.1973 25.8572 19.2569C25.9688 18.9677 26.0929 18.6839 26.2244 18.4385C26.3899 18.1298 26.5254 17.9618 26.6032 17.8966C26.6813 17.8311 26.8709 17.7265 27.2047 17.617C27.4687 17.5303 27.769 17.4576 28.0724 17.398C27.9608 17.6871 27.8368 17.9708 27.7054 18.2161C27.5398 18.525 27.4042 18.6931 27.3264 18.7584C27.2483 18.8239 27.0587 18.9284 26.7249 19.038ZM25.8572 26.2569C26.1606 26.1973 26.4609 26.1246 26.7249 26.038C27.0587 25.9284 27.2483 25.8239 27.3264 25.7584C27.4042 25.6931 27.5398 25.525 27.7054 25.2161C27.8368 24.9708 27.9608 24.6871 28.0724 24.398C27.769 24.4576 27.4687 24.5303 27.2047 24.617C26.8709 24.7265 26.6813 24.8311 26.6032 24.8966C26.5254 24.9618 26.3899 25.1298 26.2244 25.4385C26.0929 25.6839 25.9688 25.9677 25.8572 26.2569ZM19.6854 22.5041C19.797 22.7932 19.921 23.0769 20.0525 23.3222C20.218 23.6311 20.3536 23.7992 20.4315 23.8645C20.5095 23.93 20.6991 24.0345 21.0329 24.1441C21.297 24.2307 21.5973 24.3034 21.9007 24.363C21.789 24.0737 21.6649 23.79 21.5334 23.5446C21.3679 23.2359 21.2324 23.0679 21.1546 23.0026C21.0766 22.9372 20.8869 22.8326 20.5532 22.7231C20.2891 22.6364 19.9888 22.5637 19.6854 22.5041Z"
      fill="currentColor"
    />
    <path
      d="M8.95688 34.6349C9.37406 35.0562 9.78801 35.4743 10.1773 36.0068V37H16V36.0068C15.9019 35.2339 15.7299 33.8414 15.715 33.4543C15.6939 32.9098 14.9264 31.9175 14.9264 31.9175L12.5708 29.0888C12.5708 29.0888 11.904 28.4184 11.5224 27.6748C11.1409 26.9312 10.3289 27.8675 10.2209 28.5365C10.113 29.2056 10.3183 29.5582 10.3183 29.5582L11.6643 32.1046C11.6643 32.1046 10.1039 30.0703 9.61945 29.2521C9.37406 28.8377 9.30542 27.9602 9.22871 26.9795C9.15398 26.0243 9.07159 24.971 8.81071 24.152C8.28201 22.4924 6.7516 22.9079 6.48627 23.6494C6.22093 24.3909 5.92219 29.2905 6.01846 30.1074C6.09384 30.7471 6.49876 31.3727 6.9556 32.0784C7.08211 32.2739 7.21262 32.4755 7.3412 32.6853C7.85281 33.5198 8.40766 34.0802 8.95688 34.6349Z"
      fill="currentColor"
    />
    <path
      d="M38.9899 34.6349C39.5373 34.0802 40.0903 33.5198 40.6002 32.6853C40.7283 32.4756 40.8583 32.2741 40.9843 32.0787C41.4397 31.3729 41.8434 30.7471 41.9185 30.1074C42.0145 29.2905 42.0744 24.3909 41.8099 23.6494C41.5455 22.9079 40.0202 22.4924 39.4932 24.152C39.2332 24.971 39.1511 26.0243 39.0766 26.9795C39.0002 27.9602 38.9317 28.8377 38.6872 29.2521C38.2044 30.0703 36.6491 32.1046 36.6491 32.1046L37.9906 29.5582C37.9906 29.5582 38.1952 29.2056 38.0877 28.5365C37.9801 27.8675 37.1708 26.9312 36.7905 27.6748C36.4102 28.4184 35.7456 29.0888 35.7456 29.0888L33.3979 31.9175C33.3979 31.9175 32.6329 32.9098 32.612 33.4543C32.6049 33.6361 32.4911 34.0397 32.3622 34.4967C32.2166 35.0128 32.0519 35.5969 32 36.0068V37H37.7735V36.0068C38.1615 35.4743 38.5741 35.0562 38.9899 34.6349Z"
      fill="currentColor"
    />
    <path
      d="M32 41C32 41.5523 32.4477 42 33 42H37C37.5523 42 38 41.5523 38 41V39C38 38.4477 37.5523 38 37 38H33C32.4477 38 32 38.4477 32 39V41Z"
      fill="currentColor"
    />
    <path
      d="M16 41C16 41.5523 15.5523 42 15 42H11C10.4477 42 10 41.5523 10 41L10 39C10 38.4477 10.4477 38 11 38H15C15.5523 38 16 38.4477 16 39V41Z"
      fill="currentColor"
    />
  </svg>
  );
};

const IVTherapyIcon = ({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const scaledSize = Math.round(size * 1.25);
  return (
    <svg
      width={scaledSize}
      height={scaledSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 26.2706C6 27.7504 7.15127 28.95 8.57143 28.95H11.1431V30.625H14V33C14 33 14 33 14 33C14 34.1819 14.2328 35.3523 14.6851 36.4442C15.1374 37.5361 15.8003 38.5282 16.636 39.364C17.4718 40.1997 18.4639 40.8626 19.5559 41.3149C20.6478 41.7672 21.8181 42 23 42C24.1819 42 25.3522 41.7672 26.4442 41.3149C27.5361 40.8626 28.5282 40.1997 29.364 39.364C30.1997 38.5282 30.8626 37.5361 31.3149 36.4441C31.7672 35.3522 32 34.1819 32 33V32C32.5523 32 33 31.5523 33 31V25C33 24.4477 32.5523 24 32 24V22H32.0075C32.0075 21.5414 32.0978 21.0872 32.2734 20.6635C32.4489 20.2397 32.7061 19.8547 33.0304 19.5304C33.3547 19.2061 33.7397 18.9489 34.1635 18.7734C34.5872 18.5978 35.0414 18.5075 35.5 18.5075C35.9586 18.5075 36.4128 18.5978 36.8365 18.7734C37.2603 18.9489 37.6453 19.2061 37.9696 19.5304C38.2939 19.8547 38.5511 20.2397 38.7267 20.6635C38.9022 21.0872 38.9925 21.5414 38.9925 22L41 22C41 21.2777 40.8577 20.5625 40.5813 19.8952C40.3049 19.228 39.8998 18.6216 39.3891 18.1109C38.8784 17.6002 38.272 17.1951 37.6048 16.9187C36.9375 16.6423 36.2223 16.5 35.5 16.5C34.7777 16.5 34.0625 16.6423 33.3952 16.9187C32.7279 17.1951 32.1216 17.6002 31.6109 18.1109C31.1002 18.6216 30.6951 19.228 30.4187 19.8952C30.1423 20.5625 30 21.2777 30 22V24C29.4477 24 29 24.4477 29 25V31C29 31.5523 29.4477 32 30 32V33H29.975C29.975 33.916 29.7946 34.823 29.4441 35.6692C29.0935 36.5155 28.5798 37.2844 27.9321 37.9321C27.2844 38.5798 26.5155 39.0935 25.6692 39.4441C24.823 39.7946 23.916 39.975 23 39.975C22.084 39.975 21.177 39.7946 20.3308 39.4441C19.4845 39.0935 18.7156 38.5798 18.0679 37.9321C17.4202 37.2844 16.9065 36.5155 16.5559 35.6692C16.2054 34.823 16.025 33.916 16.025 33H16V30.625H18.8574V28.95H21.4286C22.8487 28.95 24 27.7504 24 26.2706V10.271C24 8.79118 22.8487 7.59158 21.4286 7.59158H17.5714L16.8437 6.81164C15.834 5.72945 14.166 5.72945 13.1563 6.81164L12.4286 7.59158H8.57143C7.15127 7.59158 6 8.79117 6 10.2709V26.2706ZM17.5714 9.59158C17.017 9.59158 16.4874 9.3614 16.1091 8.956L15.3814 8.17606C15.2615 8.04755 15.1248 8 15 8C14.8752 8 14.7385 8.04755 14.6186 8.17606L13.8909 8.956C13.5126 9.3614 12.983 9.59158 12.4286 9.59158H8.57143C8.33255 9.59158 8 9.81744 8 10.2709V21.9775C8.40728 21.9855 8.80269 21.9985 9.18645 22.0123L9.54031 22.0253C10.397 22.0569 11.1842 22.0859 11.9541 22.07C13.6696 22.0344 15.2185 21.7749 16.8663 20.827C17.9288 20.2158 18.9347 19.9731 19.8602 20.0023C20.7009 20.0289 21.4188 20.2778 22 20.5983V10.271C22 9.81744 21.6674 9.59158 21.4286 9.59158H17.5714ZM22 23.0687C21.7916 22.8346 21.494 22.5541 21.1199 22.3299C20.7439 22.1045 20.3034 21.9429 19.7957 21.9269C19.2929 21.911 18.6562 22.0355 17.8774 22.4835C15.8429 23.654 13.9259 23.9551 11.9965 23.9951C11.1633 24.0124 10.3127 23.9809 9.46317 23.9494L9.11301 23.9366C8.74531 23.9233 8.37512 23.9112 8 23.9035V26.2706C8 26.7241 8.33255 26.95 8.57143 26.95H21.4286C21.6675 26.95 22 26.7241 22 26.2706V23.0687Z"
        fill="currentColor"
      />
      <path
        d="M38.7788 25.6459C39.3404 24.7045 40 24 40 24C40 24 40.6596 24.7045 41.2212 25.6459C41.6375 26.3437 42 27.1718 42 27.9394C42 29.0774 41.1046 30 40 30C38.8954 30 38 29.0774 38 27.9394C38 27.1718 38.3625 26.3437 38.7788 25.6459Z"
        fill="currentColor"
      />
    </svg>
  );
};

const MinorSurgeryIcon = ({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const scaledSize = Math.round(size * 1.25);
  return (
    <svg
      width={scaledSize}
      height={scaledSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 36C24.8063 36 25.5568 36.2385 26.1849 36.6489L28.0015 4L29 4.05555L29.9984 4L31.815 36.6489C32.4432 36.2385 33.1937 36 34 36C36.2091 36 38 37.7909 38 40C38 42.2091 36.2091 44 34 44C31.8009 44 30.0163 42.2254 30.0001 40.0302L29.7765 36.0122L28.2234 36.0122L27.9999 40.0302C27.9836 42.2254 26.199 44 24 44C21.7908 44 20 42.2091 20 40C20 37.7909 21.7908 36 24 36ZM29 22.0558L29.6652 34.0122H28.3347L29 22.0558ZM29 19.0348C29.5523 19.0348 30 18.5877 30 18.0362C30 17.4847 29.5523 17.0376 29 17.0376C28.4477 17.0376 28 17.4847 28 18.0362C28 18.5877 28.4477 19.0348 29 19.0348ZM24 38C22.8954 38 22 38.8954 22 40C22 41.1046 22.8954 42 24 42C25.1046 42 26 41.1046 26 40C26 38.8954 25.1046 38 24 38ZM32 40C32 38.8954 32.8954 38 34 38C35.1046 38 36 38.8954 36 40C36 41.1046 35.1046 42 34 42C32.8954 42 32 41.1046 32 40Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 4.23381L14.4855 5.14251L15 6C14.4855 5.14251 14.4841 5.14335 14.4841 5.14335L14.4826 5.14425L14.4794 5.1462L14.472 5.15072L14.4536 5.16227C14.4397 5.1711 14.4226 5.18222 14.4025 5.19574C14.3624 5.2228 14.3103 5.25948 14.2478 5.30677C14.1229 5.40136 13.9568 5.53825 13.7625 5.72511C13.3733 6.09937 12.874 6.67137 12.367 7.50046C11.3507 9.16285 10.3252 11.8233 10.0637 15.9333C9.98402 17.1859 10.7086 18.2415 11.7425 18.722C11.2841 19.1752 11 19.8044 11 20.5V41.5C11 42.8807 12.1193 44 13.5 44C14.8807 44 16 42.8807 16 41.5V20.5C16 19.6064 15.5312 18.8224 14.8261 18.3803C15.5399 17.8319 16 16.9697 16 16V4.23381ZM12.0597 16.0603C12.296 12.3463 13.1918 10.0347 14 8.66591V16C14 16.5523 13.5523 17 13 17C12.4314 17 12.0288 16.5461 12.0597 16.0603ZM14 20.5858V20.5C14 20.2239 13.7761 20 13.5 20C13.2238 20 13 20.2239 13 20.5V21.5858L14 20.5858ZM14 23.4142V24.5858L13 25.5858V24.4142L14 23.4142ZM14 28.5858V27.4142L13 28.4142V29.5858L14 28.5858ZM14 31.4142V41.5C14 41.7761 13.7761 42 13.5 42C13.2238 42 13 41.7761 13 41.5V32.4142L14 31.4142Z"
        fill="currentColor"
      />
    </svg>
  );
};

const SutureRemovalIcon = ({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const scaledSize = Math.round(size * 1.25);
  return (
    <svg
      width={scaledSize}
      height={scaledSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M23 39V44H25V39H30V40H32V36H30V37H25V30H30V31H32V27H30V28H25V20H30V21H32V17H30V18H25V11H30V12H32V8H30V9H25V4H23V9H18V8H16V12H18V11H23V18H18V17H16V21H18V20H23V28H18V27H16V31H18V30H23V37H18V36H16V40H18V39H23Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ImplanonIcon = ({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const scaledSize = Math.round(size * 1.25);
  return (
    <svg
      width={scaledSize}
      height={scaledSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M21 9C21 7.34315 22.3431 6 24 6C25.6569 6 27 7.34315 27 9V39C27 40.6569 25.6569 42 24 42C22.3431 42 21 40.6569 21 39V9Z"
        fill="currentColor"
      />
    </svg>
  );
};

const CauterizationIcon = ({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) => {
  const scaledSize = Math.round(size * 1.3);
  return (
    <svg
      width={scaledSize}
      height={scaledSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.3 5.3L35.93 5.43L37.01 5.97L38.1 6.92L38.5 7.6L38.5 8.14L37.83 9.09L37.28 8.95L33.76 6.52Z M32.95 7.6L36.74 10.04L37.01 10.31L36.88 10.72L36.33 11.26L36.2 11.8L35.66 12.34L35.52 12.89L34.98 13.43L34.84 13.97L34.03 14.92L33.89 15.46L33.35 16L33.22 16.55L32.4 17.49L29.83 21.83L26.17 24.14L21.83 27.66L20.88 26.71L21.02 26.3L21.83 25.36L21.97 24.81L22.78 23.86L22.92 23.32L23.46 22.78L23.59 22.24L24.41 21.29L24.54 20.75L25.08 20.2L25.22 19.66L25.76 19.12L25.9 18.58L26.71 17.63L26.85 17.09L27.39 16.55L27.52 16L28.34 15.05L28.47 14.51Z M27.8 12.75L27.93 13.02L26.98 14.65L25.22 17.09L24.68 18.31L23.59 19.66L23.46 20.2L19.66 25.9L19.53 26.44L17.77 27.12L17.36 24.41L17.36 22.37L17.9 21.29L19.8 19.39L19.8 19.12L20.2 18.98L23.46 15.73L23.73 15.73L25.9 13.83Z M36.61 13.56L46.5 15.33L46.5 27.12L44.87 27.52L42.03 27.52L37.01 26.71L31.86 27.12L29.83 27.93L23.19 32.54L21.56 32.54L21.02 31.59L21.02 30.51L22.1 29.15L23.05 28.61L26.98 25.22L28.34 24.54L30.51 22.92L31.05 22.78L34.84 20.07L34.17 18.98L33.62 19.12L32.95 19.8L32.67 19.66Z M1.5 24.54L16.14 24.54L16.27 25.9L1.5 25.9Z M19.53 27.8L20.34 27.93L20.75 28.34L20.75 28.74L19.93 29.56L19.66 31.45L19.12 31.73L18.17 31.73L17.63 31.18L17.63 29.69L18.04 28.88L18.85 28.07Z M36.47 28.2L37.69 28.2L38.5 28.74L38.77 29.15L38.77 30.37L38.5 30.91L35.79 32.27L33.76 33.08L33.22 33.08L34.17 32.54L35.11 31.32L35.39 30.23L35.11 28.74Z M8.41 28.47L8.68 28.47L9.77 29.69L10.17 29.69L11.26 28.47L12.34 29.29L12.34 29.56L10.99 30.78L12.34 32.13L12.34 32.4L11.53 33.22L11.26 33.22L10.04 31.86L8.68 33.22L7.6 32.27L8.95 30.91L7.6 29.56L7.6 29.29Z M32.13 28.47L33.35 28.74L33.89 29.56L33.89 30.64L33.08 31.59L28.34 33.49L27.12 33.49L25.22 32.81L30.23 29.29Z M39.99 28.61L41.62 28.88L45.28 28.88L46.5 28.61L46.5 30.78L46.23 31.05L44.6 31.32L39.72 31.45L40.13 30.64Z M17.09 32.81L18.58 33.22L20.2 32.81L20.75 33.62L21.97 34.03L21.97 34.3L21.56 34.98L19.93 36.33L16.82 34.44Z M10.04 34.17L10.45 34.17L10.72 34.71L12.75 39.45L12.75 39.99L11.39 40.13L11.12 39.72L10.04 36.74L9.09 34.98L9.09 34.57Z M23.46 34.3L24.95 34.84L25.49 35.39L25.63 36.61L25.36 37.15L24.68 37.55L23.73 37.55L22.24 36.47L22.24 36.06L22.78 35.66Z M16.41 35.79L18.44 36.88L18.71 37.42L17.77 38.1L17.09 38.1L16.41 37.69L16.14 37.42Z M15.33 38.64L16.55 39.32L15.46 41.21L14.38 40.4L14.38 39.99Z M12.21 41.35L13.83 41.48L14.24 42.16L13.56 42.7L12.07 42.7L11.39 42.3L11.39 41.76Z"
        fill="currentColor"
      />
    </svg>
  );
};

const BackIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.75}
    stroke="currentColor"
    width={size}
    height={size}
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
);

type ServiceKey = keyof TranslationKeys['booking']['services'];

interface ServiceItem {
  id: ServiceKey;
  category: 'consultas' | 'procedimientos';
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

const SERVICES: ServiceItem[] = [
  { id: 'functionalMedicine', category: 'consultas', Icon: FunctionalMedicineIcon },
  { id: 'generalMedicine', category: 'consultas', Icon: Stethoscope },
  { id: 'ivTherapy', category: 'procedimientos', Icon: IVTherapyIcon },
  { id: 'earCleaning', category: 'procedimientos', Icon: Ear },
  { id: 'sutureRemoval', category: 'procedimientos', Icon: SutureRemovalIcon },
  { id: 'implanon', category: 'procedimientos', Icon: ImplanonIcon },
  { id: 'cauterization', category: 'procedimientos', Icon: CauterizationIcon },
  { id: 'minorSurgery', category: 'procedimientos', Icon: MinorSurgeryIcon },
];

const BookingModal = () => {
  const { isBookingModalOpen, closeBookingModal } = useModal();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeCategory, setActiveCategory] = useState<'consultas' | 'procedimientos'>('consultas');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceKey | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [daySlots, setDaySlots] = useState<string[]>(DEFAULT_SLOTS);
  const [isDayClosed, setIsDayClosed] = useState<boolean>(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string; submit?: string }>({});
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill user email/name when available from AuthContext
  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      const metaName = user.user_metadata?.full_name || user.user_metadata?.name;
      if (metaName) {
        setFullName((prev) => (prev ? prev : metaName));
      }
    }
  }, [user]);

  // Fetch booked slots and schedule whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      setDaySlots(DEFAULT_SLOTS);
      setIsDayClosed(false);
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    setLoadingSlots(true);
    Promise.all([
      getBookedSlotsForDate(dateStr),
      getScheduleForDate(dateStr),
    ])
      .then(([{ data: booked }, schedule]) => {
        setBookedSlots(booked || []);
        setIsDayClosed(Boolean(schedule.isClosed));
        setDaySlots(schedule.slots || []);
        setLoadingSlots(false);
      })
      .catch((err) => {
        console.error('Error fetching schedule/slots:', err);
        setBookedSlots([]);
        setDaySlots(DEFAULT_SLOTS);
        setIsDayClosed(false);
        setLoadingSlots(false);
      });
  }, [selectedDate]);

  // Lock body and html scroll completely when modal is open
  useEffect(() => {
    if (isBookingModalOpen) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');

      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [isBookingModalOpen]);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const resetAll = () => {
    setStep(1);
    setActiveCategory('consultas');
    setSelectedServiceId(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setBookedSlots([]);
    setDaySlots(DEFAULT_SLOTS);
    setIsDayClosed(false);
    setNotes('');
    setErrors({});
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetAll();
    closeBookingModal();
  };

  if (!isBookingModalOpen) return null;

  const filteredServices = SERVICES.filter((item) => item.category === activeCategory);

  const handleSelectService = (id: ServiceKey) => {
    setSelectedServiceId(id);
  };

  const handleCategorySwitch = (category: 'consultas' | 'procedimientos') => {
    setActiveCategory(category);
  };

  const validateStep3 = () => {
    const errs: { fullName?: string; email?: string; phone?: string } = {};
    if (!fullName.trim()) {
      errs.fullName = language === 'es' ? 'Ingresa tu nombre completo' : 'Please enter your full name';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = language === 'es' ? 'Ingresa un correo electrónico válido' : 'Please enter a valid email';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      errs.phone = language === 'es' ? 'Ingresa un número telefónico válido' : 'Please enter a valid phone number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    const ref = `OMF-${Math.floor(100000 + Math.random() * 900000)}`;

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Verify slot is still available in real-time
    const { data: latestBooked } = await getBookedSlotsForDate(dateStr);
    if (latestBooked && latestBooked.includes(selectedTime)) {
      setIsSubmitting(false);
      setBookedSlots(latestBooked);
      setSelectedTime(null);
      setStep(2);
      alert(
        language === 'es'
          ? 'Este horario acaba de ser reservado por otro paciente. Por favor selecciona otra hora.'
          : 'This time slot was just booked by another patient. Please choose a different time.'
      );
      return;
    }

    const serviceTitle = t.booking.services[selectedService.id]?.title || selectedService.id;

    const { error } = await createAppointment({
      user_id: user?.id || null,
      booking_ref: ref,
      service_id: selectedService.id,
      service_name: serviceTitle,
      category: activeCategory,
      appointment_date: dateStr,
      appointment_time: selectedTime,
      patient_name: fullName.trim(),
      patient_email: email.trim(),
      patient_phone: phone.trim(),
      notes: notes.trim() || null,
      status: 'confirmed',
    });

    setIsSubmitting(false);

    if (error) {
      console.error('Error creating appointment in database:', error);
    }

    setBookingRef(ref);
    setStep(4);
  };

  const formattedDate = selectedDate
    ? (() => {
        const str = selectedDate.toLocaleDateString(t.booking.locale, {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        });
        return str.charAt(0).toUpperCase() + str.slice(1);
      })()
    : '';

  const serviceData = t.booking.services[selectedService.id];

  return (
    <div
      className={styles.overlay}
      onWheel={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) e.preventDefault();
      }}
    >
      <div
        className={`${styles.modal} ${step === 4 ? styles.modalSuccess : ''}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top bar with back button & close button */}
        <div className={styles.topBar}>
          {step < 4 ? (
            <button
              type="button"
              className={styles.backBtn}
              onClick={() => {
                if (step > 1) {
                  setStep((prev) => ((prev - 1) as 1 | 2 | 3));
                } else {
                  handleClose();
                }
              }}
              aria-label="Volver"
            >
              <BackIcon size={20} />
            </button>
          ) : (
            <div className={styles.placeholderBack} />
          )}

          <span className={styles.topBarBrand}>{t.booking.modalTitle}</span>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= STEP 1: SELECT SERVICE ================= */}
        {step === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.title}>{t.booking.serviceTitle}</h2>
            </div>

            {/* 2-Category Segmented Filter: Consulta Médica | Procedimientos */}
            <div className={styles.segmentedFilter}>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${activeCategory === 'consultas' ? styles.segmentedBtnActive : ''}`}
                onClick={() => handleCategorySwitch('consultas')}
              >
                <span>{t.booking.categoryConsultations}</span>
              </button>
              <button
                type="button"
                className={`${styles.segmentedBtn} ${activeCategory === 'procedimientos' ? styles.segmentedBtnActive : ''}`}
                onClick={() => handleCategorySwitch('procedimientos')}
              >
                <span>{t.booking.categoryProcedures}</span>
              </button>
            </div>

            {/* Services Grid */}
            <div className={styles.servicesGrid}>
              {filteredServices.map((service) => {
                const info = t.booking.services[service.id];
                const isSelected = selectedServiceId === service.id;
                const ServiceIcon = service.Icon;

                return (
                  <div
                    key={service.id}
                    className={`${styles.serviceCard} ${isSelected ? styles.serviceCardSelected : ''}`}
                    onClick={() => handleSelectService(service.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectService(service.id);
                      }
                    }}
                  >
                    <div className={styles.serviceHeader}>
                      <div className={styles.serviceIconWrap}>
                        <ServiceIcon size={22} strokeWidth={2} />
                      </div>
                      <div className={styles.serviceCheckWrap}>
                        <div className={`${styles.checkCircle} ${isSelected ? styles.checkCircleActive : ''}`}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>

                    <h3 className={styles.serviceTitle}>{info.title}</h3>
                    <p className={styles.serviceDesc}>{info.desc}</p>

                    <div className={styles.serviceBadges}>
                      <span className={styles.durationBadge}>
                        <Clock size={13} />
                        {info.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Action */}
            <div className={styles.stepFooter}>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={!selectedServiceId}
                onClick={() => setStep(2)}
              >
                {t.booking.btnNext}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: SELECT DATE & TIME ================= */}
        {step === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.stepHeader}>
              <h2 className={styles.title}>{t.booking.dateTimeTitle}</h2>
            </div>

            {/* Selected Service Recap Banner */}
            <div className={styles.selectedServiceBanner}>
              <div className={styles.bannerIcon}>
                <selectedService.Icon size={18} />
              </div>
              <div className={styles.bannerInfo}>
                <strong className={styles.bannerTitle}>{serviceData.title}</strong>
                <span className={styles.bannerDuration}>{serviceData.duration}</span>
              </div>
              <button
                type="button"
                className={styles.changeServiceBtn}
                onClick={() => setStep(1)}
              >
                {language === 'es' ? 'Cambiar' : 'Change'}
              </button>
            </div>

            {/* Calendar & Time Slots Split View */}
            <div className={styles.dateTimeLayout}>
              {/* Calendar Column */}
              <div className={styles.calendarCol}>
                <span className={styles.sectionLabel}>
                  {t.booking.selectDate}
                </span>
                <div className={styles.calendarWrapper}>
                  <Calendar
                    mode="single"
                    required
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }
                    }}
                    locale={language === 'es' ? es : enUS}
                    disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                  />
                </div>
              </div>

              {/* Time Slots Column */}
              <div className={styles.timeSlotsCol}>
                <span className={styles.sectionLabel}>
                  {t.booking.selectTime}
                </span>

                {loadingSlots ? (
                  <div className={styles.loadingSlotsNotice}>
                    <span>{language === 'es' ? 'Consultando disponibilidad...' : 'Checking availability...'}</span>
                  </div>
                ) : !selectedDate ? (
                  <div className={styles.noSlotsNotice}>
                    <span>
                      {language === 'es'
                        ? 'Selecciona una fecha en el calendario para ver los horarios.'
                        : 'Select a date on the calendar to view available times.'}
                    </span>
                  </div>
                ) : isDayClosed ? (
                  <div className={styles.noSlotsNotice}>
                    <span>
                      {language === 'es'
                        ? 'La clínica se encuentra cerrada en esta fecha. Por favor selecciona otro día.'
                        : 'The clinic is closed on this date. Please select another day.'}
                    </span>
                  </div>
                ) : daySlots.filter((time) => !bookedSlots.includes(time)).length === 0 ? (
                  <div className={styles.noSlotsNotice}>
                    <span>
                      {language === 'es'
                        ? 'No hay horarios disponibles para esta fecha. Por favor selecciona otro día.'
                        : 'No available times for this date. Please select another day.'}
                    </span>
                  </div>
                ) : (
                  <div className={styles.timeSlotsGrid}>
                    {daySlots
                      .filter((time) => !bookedSlots.includes(time))
                      .map((time) => {
                        const isSelectedTime = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            className={`${styles.timeSlotBtn} ${isSelectedTime ? styles.timeSlotActive : ''}`}
                            onClick={() => {
                              setSelectedTime(time);
                            }}
                          >
                            <span>{time}</span>
                            {isSelectedTime && <Check size={14} strokeWidth={2.5} />}
                          </button>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Action */}
            <div className={styles.stepFooter}>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
              >
                {t.booking.btnNext}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PATIENT DETAILS & CONFIRMATION ================= */}
        {step === 3 && (
          <form onSubmit={handleConfirmBooking} className={styles.stepContent}>
            <div className={styles.step3Layout}>
              {/* Summary Card */}
              <div className={styles.summaryCard}>
                <div className={styles.summaryCardHeader}>
                  <div className={styles.summaryIconWrap}>
                    <selectedService.Icon size={20} />
                  </div>
                  <div>
                    <h4 className={styles.summaryTitle}>{serviceData.title}</h4>
                  </div>
                </div>

                <div className={styles.summaryDetailsList}>
                  <div className={styles.summaryRow}>
                    <CalendarIcon size={16} className={styles.rowIcon} />
                    <div>
                      <span className={styles.rowLabel}>{t.booking.dateTimeLabel}</span>
                      <strong className={styles.rowValue}>{formattedDate} · {selectedTime}</strong>
                    </div>
                  </div>

                  <div className={styles.summaryRow}>
                    <Clock size={16} className={styles.rowIcon} />
                    <div>
                      <span className={styles.rowLabel}>{language === 'es' ? 'Duración estimada' : 'Estimated Duration'}</span>
                      <strong className={styles.rowValue}>{serviceData.duration}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Form Fields */}
              <div className={styles.formFields}>
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName" className={styles.inputLabel}>
                    <UserIcon size={15} />
                    <span>{t.booking.fullName} *</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                    placeholder={t.booking.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                  />
                  {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingEmail" className={styles.inputLabel}>
                    <Mail size={15} />
                    <span>{t.booking.email} *</span>
                  </label>
                  <input
                    id="bookingEmail"
                    type="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder={t.booking.emailPlaceholder}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingPhone" className={styles.inputLabel}>
                    <Phone size={15} />
                    <span>{t.booking.phone} *</span>
                  </label>
                  <input
                    id="bookingPhone"
                    type="tel"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder={t.booking.phonePlaceholder}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="bookingNotes" className={styles.inputLabel}>
                    <FileText size={15} />
                    <span>{t.booking.notes}</span>
                  </label>
                  <textarea
                    id="bookingNotes"
                    rows={3}
                    className={styles.textarea}
                    placeholder={t.booking.notesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className={styles.stepFooter}>
              <button
                type="submit"
                className={`${styles.primaryBtn} ${styles.confirmBtn}`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (language === 'es' ? 'Guardando Cita...' : 'Saving Appointment...')
                  : t.booking.btnConfirm}
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
        {step === 4 && (
          <div className={`${styles.stepContent} ${styles.successContent}`}>
            <div className={styles.successIconBadge}>
              <CheckCircle2 size={46} className={styles.successCheckIcon} />
            </div>

            <h2 className={styles.successTitle}>{t.booking.successTitle}</h2>

            <div className={styles.successTicket}>
              <div className={styles.ticketHeader}>
                <span className={styles.ticketRefLabel}>
                  {language === 'es' ? 'Referencia de Cita' : 'Booking Reference'}
                </span>
                <span className={styles.ticketRefId}>#{bookingRef}</span>
              </div>

              <div className={styles.ticketBody}>
                <div className={styles.ticketItem}>
                  <span className={styles.ticketLabel}>{t.booking.serviceLabel}</span>
                  <strong className={styles.ticketValue}>{serviceData.title}</strong>
                </div>

                <div className={styles.ticketItem}>
                  <span className={styles.ticketLabel}>{t.booking.dateTimeLabel}</span>
                  <strong className={styles.ticketValue}>{formattedDate} · {selectedTime}</strong>
                </div>

                <div className={styles.ticketItem}>
                  <span className={styles.ticketLabel}>{t.booking.patientLabel}</span>
                  <strong className={styles.ticketValue}>{fullName}</strong>
                </div>
              </div>
            </div>

            <div className={styles.successActions}>
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleClose}
              >
                {language === 'es' ? 'Finalizar' : 'Finish'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
