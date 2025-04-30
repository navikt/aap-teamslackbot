import { describe, expect, it } from "vitest";
import {parse} from "date-fns";
import {isByWeeklyDate} from "./date"
import {isDateAHoliday} from "./holidays";


describe('date', () => {
  it('isByWeekly', () => {
    const startDate = parse('14/02/2025', 'dd/MM/yyyy', new Date())
    const testDateNo = parse('21/02/2025', 'dd/MM/yyyy', new Date())
    const testDateYes = parse('28/02/2025', 'dd/MM/yyyy', new Date())
    expect(isByWeeklyDate(startDate, testDateNo)).toBe(false)
    expect(isByWeeklyDate(startDate, testDateYes)).toBe(true)
  })
  it('isDateAHoliday påske', () => {
    const ferieDate = parse('17/04/2025', 'dd/MM/yyyy', new Date())
    expect(isDateAHoliday(ferieDate)).toBe(true)
  })
  it('isDateAHoliday førstemai', () => {
    const ferieDate = parse('01/05/2025', 'dd/MM/yyyy', new Date())
    expect(isDateAHoliday(ferieDate)).toBe(true)
  })
})
