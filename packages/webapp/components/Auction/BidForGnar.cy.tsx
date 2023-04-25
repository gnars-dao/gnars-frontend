import React from "react"
import { BidForGnar } from "./BidForGnar"

describe("<BidForGnar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BidForGnar gnarId="1" latestBid={null} />)
  })
})
