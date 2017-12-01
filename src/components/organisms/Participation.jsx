import React from "react";

import ParticipationForm from "./ParticipationForm";
import ExecuteRequest from "./ExecuteRequest";

const Participation = ({
  pendingRequest,
  amount,
  loading,
  onChange,
  onSelect,
  onSubmit,
  participationType,
  price,
  total,
  readyToExecute,
  onExecute,
  handleFinish,
}) =>
  pendingRequest ? (
    <ExecuteRequest {...{ handleFinish, loading, onExecute, readyToExecute }} />
  ) : (
    <ParticipationForm
      {...{
        amount,
        onChange,
        onSelect,
        onSubmit,
        participationType,
        loading,
        price,
        total,
      }}
    />
  );

export default Participation;
