import { Box, SimpleGrid, SimpleGridProps, Text } from "@chakra-ui/react"
import { isArray } from "lodash"
import { FC, ReactNode } from "react"

export interface ParamSpec {
  description: string
  value: ReactNode | ParamSpec[]
}

export interface ParamsTableProps extends SimpleGridProps {
  params: ParamSpec[]
}

export const ParamsTable: FC<ParamsTableProps> = ({ params, ...props }) => {
  return (
    <SimpleGrid
      w={"full"}
      overflowX={"scroll"}
      minW={"md"}
      gridGap={"1px"}
      columns={1}
      p={4}
      alignItems={"start"}
      bgColor={"whiteAlpha.50"}
      borderWidth={1}
      borderRadius={"md"}
      sx={{
        ".param-value": {
          pb: 2,
          "&:not(:last-child)": {
            borderBottomWidth: 1,
            pb: 2,
          },
          "&:last-child": {
            pb: 1,
          },
        },
      }}
      {...props}
    >
      {params.flatMap(toGridItem)}
    </SimpleGrid>
  )
}

const toGridItem = ({ description, value }: ParamSpec, i: number) => [
  <Text
    className="param-description"
    key={`param-${i}-description`}
    py={1}
    lineHeight={1}
    fontSize={"sm"}
    fontWeight={"bold"}
    color={"whiteAlpha.600"}
  >
    {description}
  </Text>,

  !isArray(value) ? (
    <Text className="param-value" key={`param-${i}-value`} lineHeight={1}>
      {value}
    </Text>
  ) : (
    <Box pl={2} className="param-value">
      <SimpleGrid
        key={`param-${i}-value`}
        // ml={2}
        gridGap={"1px"}
        columns={1}
        p={2}
        alignItems={"start"}
        sx={{
          ".param-value": {
            pb: 2,
            "&:not(:last-child)": {
              borderBottomWidth: 1,
              pb: 2,
            },
            "&:last-child": {
              pb: 1,
            },
          },
        }}
      >
        {value.flatMap(toGridItem)}
      </SimpleGrid>
    </Box>
  ),
]
