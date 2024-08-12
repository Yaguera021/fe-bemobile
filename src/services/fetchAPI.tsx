import { Employees } from "../types/Employees";

const fetchEmployees = async (): Promise<Employees[]> => {
  try {
    const response = await fetch(
      "https://yaguera021.github.io/project-data/db.json",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();

    return data.employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export { fetchEmployees };
