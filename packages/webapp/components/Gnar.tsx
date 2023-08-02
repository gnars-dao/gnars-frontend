import { Box, BoxProps, DarkMode, HStack, Icon, Image, Switch, keyframes } from "@chakra-ui/react"
import { FC, useMemo, useRef } from "react"
import { BsBadgeHd } from "react-icons/bs"
import { getGnarsHdLoImageUrl } from "utils/gnarsHD"
import { GnarData } from "../hooks/useGnarData"
import { getGnartwork } from "../utils"
import { useGnarState } from "./Gnar.state"
import { GnarImage } from "./GnarImage"
import { GnarToolbar } from "./GnarToolbar"

interface GnarProps extends BoxProps {
  isOg: boolean
  isHD?: boolean
  gnarData?: GnarData
}

const Gnar: FC<GnarProps> = ({ isOg, gnarData, ...props }) => {
  const gnarImageRef = useRef<HTMLImageElement>(null)
  const { hdOn, toggleHd } = useGnarState()
  const showHd = !isOg && hdOn
  const gnartwork = useMemo(() => (gnarData ? getGnartwork(isOg, gnarData.gnar.seed) : undefined), [gnarData, isOg])
  const gnarsHdUrl = useMemo(
    () => (gnarData?.gnar?.seed && !isOg ? getGnarsHdLoImageUrl(gnarData!.gnar.seed) : undefined),
    [gnarData, isOg]
  )

  return (
    <Box overflow={"visible!important"} position={"relative"} {...props}>
      {showHd ? (
        <Image src={gnarsHdUrl} alt={`Gnar HD #${gnarData?.gnar.gnarId}`} ref={gnarImageRef} />
      ) : (
        <GnarImage isOg={isOg} gnartwork={gnartwork} ref={gnarImageRef} />
      )}

      {gnarData && gnartwork && (
        <DarkMode>
          <HStack position={"absolute"} bottom={-12} left={"auto"} right={"auto"}>
            <GnarToolbar
              isOg={isOg}
              downloadFilename={`gnar-${gnarData.gnar.gnarId}`}
              gnarImageRef={gnarImageRef}
              gnartwork={gnartwork}
            />
            {!isOg && (
              <HStack h={10} p={2} borderRadius={"full"} borderWidth={1}>
                <Switch isChecked={hdOn} onChange={toggleHd} colorScheme="orange" size="lg" />
                <Icon
                  boxSize={6}
                  as={BsBadgeHd}
                  color={hdOn ? "orange.200" : "gray"}
                  animation={hdOn ? undefined : `2s ${shake} infinite`}
                />
              </HStack>
            )}
          </HStack>
        </DarkMode>
      )}
    </Box>
  )
}
export default Gnar

const shake = keyframes`

0%,
35%,
100%, {
  transform: translate3d(0, 0, 0);
}

5%,
15%,
25% {
  transform: translate3d(0, -3px, 0);
}

10%,
20%,
30% {
  transform: translate3d(0, 3px, 0);
}
  
`
