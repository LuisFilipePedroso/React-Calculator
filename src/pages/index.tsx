import { Box, Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useCallback, useMemo, useState } from 'react';
import KeyPanel from '../components/KeyPanel';
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

  const onPressBackSpace = () => {
    setCurrentNumber(prevState => {
      if (prevState.length > 1) {
        return prevState.slice(0, -1);
      }

      return `0`
    });
  }

  const calculate: CalculateType = useMemo(() => ({
    '+': () => setCurrentNumber(`${Number(prevNumber) + Number(currentNumber)}`),
    '-': () => setCurrentNumber(`${Number(prevNumber) - Number(currentNumber)}`),
    '*': () => setCurrentNumber(`${Number(prevNumber) * Number(currentNumber)}`),
    '/': () => setCurrentNumber(`${Number(prevNumber) / Number(currentNumber)}`),
    '%': () => setCurrentNumber(`${Number(prevNumber) / Number(currentNumber)}`),
    '': () => null
  }), [currentNumber, prevNumber]);

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
            whiteSpace="nowrap"
            data-testid="screen">
            {currentNumber}
          </Text>
        </Flex>
        <Box marginTop="16px">
          <KeyPanel
            reset={reset}
            changeNumberSign={changeNumberSign}
            calculatePercentage={calculatePercentage}
            onClickSignal={onClickSignal}
            onClickNumberKey={onClickNumberKey}
            onPressBackSpace={onPressBackSpace}
            calculate={() => signal && calculate[signal]()} />
        </Box>
      </Box>
    </Flex>
  )
}

export default App
