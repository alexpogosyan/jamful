"use client";
import Text from "../components/Text/Text";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import { decrement, increment, incrementByAmount } from "../store/counterSlice";
import { Button } from "../components/Button/Button";
import { Spacer } from "../components/Spacer/Spacer";

export default function Home() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <main>
      <Text size="h1">Counter</Text>
      <p>Current: {count}</p>

      <Button onClick={() => dispatch(increment())} label="Increment by 1" />
      <Spacer h="1rem" />
      <Button onClick={() => dispatch(decrement())} label="Decrement by 1" />
      <Spacer h="1rem" />
      <Button
        onClick={() => dispatch(incrementByAmount(5))}
        label="Increment by 5"
      />
    </main>
  );
}
