import StepperStep from "./stepper-step.interface";

export default interface Stepper {
  id: string;
  value: number;
  text: string;
  steps: StepperStep[];
}
