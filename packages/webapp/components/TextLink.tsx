import { Link as ChakraLink } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

export default function TextLink(props: PropsWithChildren<LinkProps>) {
  const { href, children } = props;
  return (
    <Link href={href} passHref legacyBehavior>
      <ChakraLink isExternal color={"red.400"} textDecoration={"underline"} _hover={{ color: "red.300" }}>
        {children}
      </ChakraLink>
    </Link>
  );
}
