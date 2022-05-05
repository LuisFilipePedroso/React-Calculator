import { Grid } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import useKeyDown from "../../hooks/useKeyDown";
import Key from "../Key";

type Props = {
  reset: () => void;
  changeNumberSign: () => void;
  calculatePercentage: () => void;
  onClickSignal: (value: string) => void;
  onClickNumberKey: (value: string) => void;
  onPressBackSpace: () => void;
  calculate: () => void;
}

function KeyPanel({ reset, changeNumberSign, calculatePercentage, onClickNumberKey, onClickSignal, onPressBackSpace, calculate }: Props) {
  const keys = useMemo(() => (
    [
      {
        label: 'AC',
        variant: 'secondary',
        onClick: reset
      },
      {
        label: '+/-',
        onClick: changeNumberSign
      },
      {
        label: '%',
        onClick: calculatePercentage
      },
      {
        label: '/',
        onClick: onClickSignal,
        signal: true,
      },
      {
        label: '7',
        onClick: onClickNumberKey
      },
      {
        label: '8',
        onClick: onClickNumberKey
      },
      {
        label: '9',
        onClick: onClickNumberKey
      },
      {
        label: '*',
        onClick: onClickSignal,
        signal: true,
      },
      {
        label: '4',
        onClick: onClickNumberKey
      },
      {
        label: '5',
        onClick: onClickNumberKey
      },
      {
        label: '6',
        onClick: onClickNumberKey
      },
      {
        label: '-',
        onClick: onClickSignal,
        signal: true
      },
      {
        label: '1',
        onClick: onClickNumberKey
      },
      {
        label: '2',
        onClick: onClickNumberKey
      },
      {
        label: '3',
        onClick: onClickNumberKey
      },
      {
        label: '+',
        onClick: onClickSignal,
        signal: true
      },
      {
        label: '0',
        onClick: onClickNumberKey,
        gridColumnStart: 1,
        gridColumnEnd: 3,
      },
      {
        label: '.',
        onClick: onClickNumberKey,
      },
      {
        label: '=',
        variant: 'secondary',
        onClick: calculate
      }]
  ), [calculate, calculatePercentage, changeNumberSign, onClickNumberKey, onClickSignal, reset]);



  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculate();
      return;
    }

    if (e.key === 'Escape') {
      reset();
      return;
    }

    if (e.key === 'Backspace') {
      onPressBackSpace();
    }

    if (e.key === '%') {
      calculatePercentage();
      return;
    }

    const isValidKey = keys.find(key => key.label === e.key);
    if (isValidKey) {
      if (isValidKey.signal) {
        onClickSignal(e.key)

        return;
      }

      onClickNumberKey(e.key);
    }
  }, [calculate, calculatePercentage, keys, onClickNumberKey, onClickSignal, onPressBackSpace, reset])

  useKeyDown({ handler: onKeyDown });

  return (
    <Grid gap="16px" gridTemplateColumns="repeat(4, 1fr)" gridTemplateRows="repeat(5, 1fr)">
      {keys.map(key => (
        <Key
          key={key.label}
          variant={key.variant}
          gridColumnStart={key.gridColumnStart}
          gridColumnEnd={key.gridColumnEnd}
          onClick={key.onClick}
          data-testid={key.label}>
          {key.label}
        </Key>
      ))}
    </Grid>
  )
}

export default KeyPanel;