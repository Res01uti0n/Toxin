import "air-datepicker/dist/css/datepicker.min.css";
import "air-datepicker";

class DatePicker {
  constructor(datepicker, $containerOfTargetBlock) {
    this.datepickerPluginInstance = datepicker;
    this.$containerOfTargetBlock = $containerOfTargetBlock;

    this.init();
  }

  init() {
    this.findDOMElements();
    this.initLanguage();
    this.addCustomClass();
    this.createApplyButton();
    this.addEventListeners();
    this.removeTitleComma();
    this.replaceNavArrows();
    this.replaceCalendar();
  }

  findDOMElements() {
    this.$datepicker = this.datepickerPluginInstance.$datepicker;
    this.$calendarInput = this.datepickerPluginInstance.$el;
    this.$title = this.$datepicker.find(".datepicker--nav-title");
  }

  replaceCalendar() {
    this.$datepickerContainer = this.$containerOfTargetBlock.find(
      ".date-picker"
    );

    if (this.$datepickerContainer.length > 0) {
      this.$datepickerContainer.append(this.$datepicker);
    }

    this.handleWindowResize();
  }

  handleWindowResize() {
    const containerWidth = this.$containerOfTargetBlock
      .children(":first")
      .width();
    this.$datepicker.css("width", containerWidth);
  }

  setApplyButtonText(text) {
    this.applyButtonText = text;
  }

  createApplyButton() {
    this.$buttonsContainer = this.$datepicker.find(".datepicker--buttons");
    this.$applyButton = $("<span>", {
      text: this.applyButtonText,
      class: "date-picker__apply-button",
    }).appendTo(this.$buttonsContainer);
  }

  addEventListeners() {
    this.$applyButton.on("click", this.handleApplyButtonClick.bind(this));

    $(window).on("resize", this.handleWindowResize.bind(this));
  }

  handleApplyButtonClick() {
    this.datepickerPluginInstance.hide();
  }

  initLanguage() {
    $.fn.datepicker.language.ru = {
      days: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
      ],
      daysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
      daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ],
      monthsShort: [
        "янв",
        "фев",
        "мар",
        "апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
      ],
      today: "Сегодня",
      clear: "Очистить",
      dateFormat: "dd.mm.yyyy",
      timeFormat: "hh:ii",
      firstDay: 1,
    };
    this.setApplyButtonText("Применить");
  }

  removeTitleComma() {
    this.$calendarInput.datepicker({
      navTitles: {
        days: "MM <i>yyyy</i>",
      },
    });
  }

  replaceNavArrows() {
    this.$calendarInput.datepicker({
      nextHtml:
        `<i class="date-picker__icon date-picker__icon_color_purple">arrow_forward</i>`,
      prevHtml:
        `<i class="date-picker__icon date-picker__icon_color_purple">arrow_back</i>`,
    });
  }

  addCustomClass() {
    this.$calendarInput.datepicker({
      classes: "date-picker__inner",
    });
  }
}

export default DatePicker;
