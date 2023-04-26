import React, { ReactElement, useEffect } from "react"
import { BidForGnar } from "./BidForGnar"
import { Box, Square, Text, VStack } from "@chakra-ui/react"
import { parseEther } from "ethers/lib/utils.js"

describe("<BidForGnar />", () => {
  it("Defaults to min bid of 0.0100000 ETH", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BidForGnar gnarId="1" latestBid={null} />)
    cy.get(".chakra-input").should("have.value", "0.0100000")
  })

  it("Does not allow to bid when bid is below min", () => {
    const BidContext = ({
      children,
    }: {
      children: ({ latestBid }: { latestBid?: string }) => ReactElement
    }) => {
      const [bid, setBid] = React.useState<string>()
      useEffect(() => {
        if (!bid) {
          setBid(parseEther("0.01").toString())
        }
      }, [bid])

      return children({ latestBid: bid })
    }
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1000, 500)
    cy.mount(
      <BidContext>
        {({ latestBid }) => (
          <VStack>
            <BidForGnar gnarId="1" latestBid={latestBid} />
          </VStack>
        )}
      </BidContext>
    )
    cy.get("#bid-input").should("have.attr", "aria-invalid")
    cy.log("Adjust bid to the minimun")
    cy.get('[aria-label="decrease"]').click()
    cy.get("#bid-input").should("have.value", "0.0105000")
    cy.get("#bid-input").should("not.have.attr", "aria-invalid")
  })
})
