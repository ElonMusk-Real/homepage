import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
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
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default HorizontalLabelPositionBelowStepper;
