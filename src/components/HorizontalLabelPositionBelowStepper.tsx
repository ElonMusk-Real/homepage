import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0
    }
  })
);

const getSteps = () => {
  return [
    "Waiting for confirmation...",
    "Your order is being processed",
    "Your package is on their way",
    "Your package has arrived"
  ];
};

interface HorizontalLabelPositionBelowStepperProps {
  stepToActivate: number;
}

const HorizontalLabelPositionBelowStepper = (props: HorizontalLabelPositionBelowStepperProps) => {
  const { stepToActivate } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  useEffect(() => {
    setActiveStep(stepToActivate);
  }, [activeStep]);

  return (
    <Stepper
      className={classes.root}
      activeStep={activeStep}
      alternativeLabel={!isMobile}
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default HorizontalLabelPositionBelowStepper;
