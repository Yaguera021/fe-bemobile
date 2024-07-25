import { Employees } from "../types/Employees";
import {
  normalizeSearch,
  removeAccents,
  cleanPhoneNumber,
} from "./formatFunctions";

export const filterEmployees = (employees: Employees[], searchTerm: string) => {
  const normalizedSearchTerm = normalizeSearch(searchTerm);

  return employees.filter((employee) => {
    const normalizedName = removeAccents(employee.name.toLowerCase());
    const normalizedJob = removeAccents(employee.job.toLowerCase());
    const cleanedPhone = cleanPhoneNumber(employee.phone);

    return (
      normalizedName.includes(normalizedSearchTerm) ||
      normalizedJob.includes(normalizedSearchTerm) ||
      cleanedPhone.includes(normalizedSearchTerm)
    );
  });
};
