import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/legacy/image";

// import { auctionImg, tokenImage } from './Auction.css'

interface AucitonImageProps {
  image?: string;
  name?: string;
  isLoading?: boolean;
}

export const AuctionImage = ({ image, name }: AucitonImageProps) => {
  const [imgErr, setImgErr] = React.useState<boolean>(false);

  return (
    <Box
      backgroundColor="background2"
      width={"250px"}
      maxW={"100%"}
      height={"auto"}
      aspectRatio={1 / 1}
      position="relative"
      className={"token-image"}
    >
      {/** TODO: No need for imgError */}
      {imgErr ? (
        <Text>Error loading image</Text>
      ) : (
        <Image
          priority
          unoptimized
          layout="fill"
          src={imgErr ? "/ImageError.svg" : image || ""}
          onError={() => setImgErr(true)}
          sizes="100vw"
          alt={name || ""}
          className={"auction-image"}
        />
      )}
    </Box>
  );
};
