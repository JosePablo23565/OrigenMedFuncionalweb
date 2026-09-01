import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Calendar.module.css';

export type CalendarProps = DayPickerProps;

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={false}
      className={`${styles.calendar} ${className ?? ''}`}
      classNames={{
        months: styles.months,
        month: styles.month,
        month_caption: styles.monthCaption,
        caption_label: styles.captionLabel,
        nav: styles.nav,
        button_previous: styles.buttonPrevious,
        button_next: styles.buttonNext,
        weekdays: styles.weekdays,
        weekday: styles.weekday,
        weeks: styles.weeks,
        week: styles.week,
        month_grid: styles.monthGrid,
        day: styles.day,
        day_button: styles.dayButton,
        selected: styles.selected,
        disabled: styles.disabled,
        range_start: styles.rangeStart,
        range_end: styles.rangeEnd,
        range_middle: styles.rangeMiddle,
        today: styles.today,
        outside: styles.outside,
        hidden: styles.hidden,
        week_number: styles.weekNumber,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft size={16} strokeWidth={2} />
          ) : (
            <ChevronRight size={16} strokeWidth={2} />
          ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
