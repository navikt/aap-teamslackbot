import { describe, expect, it } from "vitest";
import {parse} from "date-fns";
import {isByWeeklyDate} from "./date"


describe('date', () => {
  it('isByWeekly', () => {
    const startDateToday = parse('14/02/2025', 'dd/MM/yyyy', new Date())
    expect(isByWeeklyDate(startDateToday, new Date())).toBe(true)
  })
})
