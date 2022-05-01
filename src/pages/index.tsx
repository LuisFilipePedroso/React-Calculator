import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import Key from '../components/Key';
import useKeyDown from '../hooks/useKeyDown';
import AppColors from '../styles/AppColors';

type CalculateType = {
  [key: string]: () => void;
}

const App: NextPage = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('');

  const [signal, setSignal] = useState('');

  const onClickNumberKey = (value: string) => {
    setCurrentNumber(prevState => {
      if (Number(prevState) === 0) {
        return value;
      }

      return prevState + value;
    });
  };

  const onClickSignal = useCallback((value: string) => {
    setSignal(value);
    setPrevNumber(currentNumber);
    setCurrentNumber('0');
  }, [currentNumber]);

  const calculatePercentage = useCallback(() => {
    if (currentNumber.length === 0) {
      return;
    }

    setCurrentNumber(`${Number(currentNumber) / 100}`);
  }, [currentNumber]);

  const changeNumberSign = useCallback(() => {
    if (Number(currentNumber) > 0) {
      setCurrentNumber(`-${currentNumber}`)
      return;
    }

    setCurrentNumber(`${Math.abs(Number(currentNumber))}`);
  }, [currentNumber])

  const reset = () => {
    setCurrentNumber('0');
    setPrevNumber('');
    setSignal('');
  }

  const calculate: CalculateType = useMemo(() => ({
    '+': () => setCurrentNumber(`${Number(prevNumber) + Number(currentNumber)}`),
    '-': () => setCurrentNumber(`${Number(prevNumber) - Number(currentNumber)}`),
    '*': () => setCurrentNumber(`${Number(prevNumber) * Number(currentNumber)}`),
    '/': () => setCurrentNumber(`${Number(prevNumber) / Number(currentNumber)}`),
    '%': () => setCurrentNumber(`${Number(prevNumber) / Number(currentNumber)}`),
    '': () => null
  }), [currentNumber, prevNumber]);

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
        onClick: () => calculate[signal]()
      }]
  ), [calculate, calculatePercentage, changeNumberSign, onClickSignal, signal])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculate[signal]();
      return;
    }

    if (e.key === 'Escape') {
      reset();
      return;
    }

    if (e.key === 'Backspace') {
      setCurrentNumber(prevState => {
        if (prevState.length > 1) {
          return prevState.slice(0, -1);
        }

        return `0`
      })
    }

    const isValidKey = keys.find(key => key.label === e.key);
    if (isValidKey) {
      if (isValidKey.signal) {
        onClickSignal(e.key)

        return;
      }

      onClickNumberKey(e.key);
    }
  }, [calculate, keys, onClickSignal, signal])

  useKeyDown({ handler: onKeyDown });

  return (
    <Flex
      flex="1"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center">
      <Box
        width="280px"
        backgroundColor={AppColors.primary}
        borderRadius="4px"
        padding="16px">
        <Flex
          height="64px"
          backgroundColor={AppColors.white}
          border="none"
          alignItems="flex-end"
          justifyContent="flex-end">
          <Text
            fontSize="24px"
            fontWeight="600"
            marginRight="16px"
            marginBottom="8px"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap">
            {currentNumber}
          </Text>
        </Flex>
        <Box marginTop="16px">
          <Grid gap="16px" gridTemplateColumns="repeat(4, 1fr)" gridTemplateRows="repeat(5, 1fr)">
            {keys.map(key => (
              <Key
                key={key.label}
                variant={key.variant}
                gridColumnStart={key.gridColumnStart}
                gridColumnEnd={key.gridColumnEnd}
                onClick={key.onClick}>
                {key.label}
              </Key>
            ))}
          </Grid>
        </Box>
      </Box>
    </Flex>
  )
}

export default App
