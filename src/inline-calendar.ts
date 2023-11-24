import { BlockLocation, CraftBlock, CraftBlockUpdate, CraftTableBlockInsert, CraftTableCellFillColor, CraftTableCellInsert, CraftTableColumn, CraftTableRowInsert, CraftTextBlock, IndexLocation } from "@craftdocs/craft-extension-api";
import { showConsole, hideConsole, clearConsole, logInPageConsoleMessage } from './console'
import flatpickr from "flatpickr";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthName = ["Jan", "Feb", "March", "April", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let activeFillColor: CraftTableCellFillColor = 'blueFill';

export const initInlineCalendar = (): void => {
    /**
     * Necessary Due to default input [type=date] bug
     * BUG: Datepicker window closes onmouseout of input
     */
    flatpickr("#start-date", {
        dateFormat: "d M, Y",
    });
    flatpickr("#end-date", {
        dateFormat: "d M, Y",
    });


    document.getElementById("create-table").onclick = async () => {
        const startDateElement = document.getElementById("start-date") as HTMLInputElement;
        const endDateElement = document.getElementById("end-date") as HTMLInputElement;
        const activeFillElement = document.getElementById("active-color") as HTMLSelectElement;
        activeFillColor = activeFillElement.value as CraftTableCellFillColor ?? activeFillColor;
        if (startDateElement.value && endDateElement.value) {
            const data = buildCalendarArray(new Date(startDateElement.value), new Date(endDateElement.value))
            insertTable(data);
            hideConsole();
        } else {
            showConsole();
            logInPageConsoleMessage('Need stand & end dates')
        }
    }
}


function buildCalendarArray(startDate: Date, endDate: Date): Array<CalendarTableCell>[] {
    ;
    let _datePointer = new Date(startDate);
    let datePointer = new Date(_datePointer.setDate(_datePointer.getDate() - _datePointer.getDay()));
    let weekDayCount = 0;
    let totalDayCount = 0;
    const monthWeekArray: Array<CalendarTableCell>[] = [];

    while (compaireDates(datePointer, endDate)) {
        let weekArray: CalendarTableCell[] = [];
        while (weekDayCount < 7) {
            const isSelectedDate = compaireDates(startDate, datePointer) && compaireDates(datePointer, endDate);
            const month = datePointer.getDate().toString() === '1' || totalDayCount === 0 ? datePointer.getMonth() : '';
            const cell = {
                content: `${datePointer.getDate().toString()} ${monthName[month] ?? ''}`,
                isActive: isSelectedDate
            }
            weekArray.push(cell);
            _datePointer = new Date(datePointer);
            datePointer = new Date(_datePointer.setDate(datePointer.getDate() + 1));
            weekDayCount++;
            totalDayCount++;
        }
        weekDayCount = 0;
        monthWeekArray.push(weekArray);
    }
    return monthWeekArray;
}


function insertTable(tableData: Array<CalendarTableCell>[]): void {
    const sudoTable: CraftTableBlockInsert = {
        type: 'tableBlock',
        rows: [],
        columns: [],
    }
    const columns: CraftTableColumn[] = dayNames.map(day => ({ style: { width: '32%' } }))
    const rows: CraftTableRowInsert[] = tableData.map(r => ({ cells: r.map(c => (cellBuilder(c))) }));

    const weekDayNames: CraftTableRowInsert[] = [{ cells: dayNames.map(day => ({ block: { type: 'textBlock', content: day } })) }]
    sudoTable.rows = [...weekDayNames, ...rows];
    sudoTable.columns = columns;
    craft.dataApi.addBlocks([sudoTable])
}

function cellBuilder(cell: CalendarTableCell): CraftTableCellInsert {
    return { block: { type: 'textBlock', content: cell.content }, style: { fillColor: cell.isActive ? activeFillColor : undefined, defaultBlockStyle: { isBold: cell.isActive, isCode: cell.isActive } } }
}

function compaireDates(date1: Date, date2: Date): boolean {
    return Math.floor(date1.getTime() / 1000) <= Math.floor(date2.getTime() / 1000)

}


interface CalendarTableCell { content: string, isActive: boolean }