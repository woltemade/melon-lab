import React from "react";

import { Input } from "semantic-ui-react";

/**
 * Removes all non-digits chars except "." and ",". But replaces "," with "."
 */
const digitsOnly = ({ value, cursorPosition }) => {
  const newValue = value.replace(/[^.^,\d]/g, "").replace(",", ".");
  return {
    value: newValue,
    cursorPosition: cursorPosition + (newValue.length - value.length),
  };
};

/**
 * Fix if somebody tries to delete the point:
 * 123.|4568 -> (Backspace) -> 123|.4568
 */
const preventDecimalJump = ({ value, cursorPosition }, decimals) => {
  if (value.indexOf(".") === -1 && value.length > decimals) {
    return {
      value: `${value.slice(0, -decimals)}.${value.slice(-decimals)}`,
      cursorPosition: value.length - decimals,
    };
  }

  return {
    value,
    cursorPosition,
  };
};

/**
 * Removes multiple points in value intelligently according to the cursor
 * position (|):
 *
 * 1234.567.|89 => 1234567.|89
 * 1234.|567.89 => 1234.56789
 */
const cleanPoints = ({ value, cursorPosition }) => {
  const pointPosition = value.indexOf(".");
  const [
    beforeFirstPoint,
    betweenOrAfterPoint,
    afterSecondPoint,
    ...copyPasteRest
  ] = value.split(".");

  // Step 1: Remove multiple points
  if (afterSecondPoint !== undefined) {
    if (pointPosition + 1 < cursorPosition) {
      return {
        value: [
          beforeFirstPoint,
          betweenOrAfterPoint,
          ".",
          afterSecondPoint,
          ...copyPasteRest,
        ].join(""),
        cursorPosition: cursorPosition - 1,
      };
    }
    return {
      value: [
        beforeFirstPoint,
        ".",
        betweenOrAfterPoint,
        afterSecondPoint,
        ...copyPasteRest,
      ].join(""),
      cursorPosition,
    };
  }

  return {
    value,
    cursorPosition,
  };
};

/**
 * Intelligently formats a number and set the cursor:
 *
 * | => 0 => 0|.0000
 * 12|3 => 4 => 12|43.0000
 * 0.|0123 => 4 => 0.4|000
 * 0.1234| => 5 => 0.1235|
 */
const formatNumber = ({ value, cursorPosition }, decimals) => {
  const [ints, decs] = value.split(".");
  const newInts = parseInt(ints || 0, 10);
  const slicedDecs =
    cursorPosition < ints.length
      ? decs || ""
      : (decs || "").slice(0, cursorPosition - ints.length - 1);
  const lastDec =
    cursorPosition === value.length ? slicedDecs.slice(decimals) : undefined;
  const filler = Array(decimals)
    .fill("0")
    .join("");

  const paddedDecs = lastDec
    ? `${slicedDecs.slice(0, decimals - 1)}${lastDec}${filler}`.slice(
        0,
        decimals,
      )
    : `${slicedDecs}${filler}`.slice(0, decimals);

  const newValue = `${newInts}.${paddedDecs}`;
  return {
    value: newValue,
    cursorPosition: cursorPosition - ints.length + `${newInts}`.length,
  };
};

const zeroCursorPosition = ({ value, cursorPosition }, decimals) => {
  const decs = Array(decimals)
    .fill("0")
    .join("");

  return {
    value,
    cursorPosition: value === `0.${decs}` ? 1 : cursorPosition,
  };
};

const cleanNumber = (event, decimals = 4, onChange) => {
  const init = {
    value: event.target.value,
    cursorPosition: event.target.selectionStart,
  };

  const cleanedDigix = digitsOnly(init);
  const jumpPrevented = preventDecimalJump(cleanedDigix, decimals);
  const cleanedPoints = cleanPoints(jumpPrevented);
  const formatted = formatNumber(cleanedPoints, decimals);
  const zeroPos = zeroCursorPosition(formatted, decimals);

  onChange(zeroPos.value);

  // event.target.value = zeroPos.value;
  event.persist();
  window.setTimeout(() => {
    event.target.setSelectionRange(
      zeroPos.cursorPosition,
      zeroPos.cursorPosition,
    );
  }, 10);
};

const NumberInput = ({
  input,
  placeholder,
  disabled,
  label,
  id,
  decimals = 4,
}) => {
  const { onChange, ...rest } = input;
  return (
    <Input
      {...rest}
      label={label}
      disabled={disabled}
      placeholder={placeholder || rest.name}
      onChange={event => cleanNumber(event, decimals, onChange)}
      style={{ width: "100%" }}
      id={id}
    />
  );
};

export default NumberInput;
