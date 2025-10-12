export class DateUtils {
  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static formatDisplayDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  static isSameWeek(date1: Date, date2: Date): boolean {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDayOfWeek = (date: Date) => {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    };
    
    const week1 = Math.floor(firstDayOfWeek(new Date(date1)).getTime() / oneDay);
    const week2 = Math.floor(firstDayOfWeek(new Date(date2)).getTime() / oneDay);
    return week1 === week2;
  }

  static isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  static getTimeOfDayIndex(hour: number): number {
    if (hour >= 5 && hour < 8) return 0;
    if (hour >= 8 && hour < 11) return 1;
    if (hour >= 11 && hour < 14) return 2;
    if (hour >= 14 && hour < 17) return 3;
    if (hour >= 17 && hour < 20) return 4;
    if (hour >= 20 && hour < 23) return 5;
    return 6;
  }

  static getGreeting(hour: number): string {
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  static getDayName(dayIndex: number): string {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[dayIndex];
  }
}
