import { FC } from "react";
import { Text } from "@chakra-ui/react";
import { useSecondsUntil } from "@hooks/useSecondsUntil";
import { formatConciseDurationInDays } from "@utils/dateTimeFormat";

export type CountdownProps = {
  timestamp: number;
};

export const Countdown: FC<CountdownProps> = ({ timestamp }) => {
  const secondsUntil = useSecondsUntil(timestamp);

  if (secondsUntil === null) {
    return <Text>ended</Text>;
  }

  return <Text>{formatConciseDurationInDays(secondsUntil)}</Text>;
};
