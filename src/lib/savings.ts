export interface SavingsInput { tasks: number; minutes: number; hourly: number; automated: number; monthly: number; setup: number; }
export function calculateSavings(input: SavingsInput) {
  const { tasks, minutes, hourly, automated, monthly, setup } = input;
  if (Object.values(input).some(value => !Number.isFinite(value) || value < 0) || automated > 100) return null;
  const hours = tasks * minutes / 60 * automated / 100;
  const gross = hours * hourly;
  const net = gross - monthly;
  return { hours, gross, net, payback: net > 0 ? setup / net : null };
}
