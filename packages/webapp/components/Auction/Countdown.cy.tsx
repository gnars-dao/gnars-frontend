import { addDays, addSeconds, subSeconds } from "date-fns"
import React, { ReactElement, useEffect } from "react"
import { Countdown } from "./Countdown"

const referenceDate = new Date("2020-01-01 12:00:00")

describe("<Countdown />", () => {
  it("Displays only the required units depending on the time left", () => {
    // see: https://on.cypress.io/mounting-react
    cy.clock(referenceDate)
    cy.mount(
      <Countdown timestamp={addDays(referenceDate, 1).getTime() / 1000} />
    )
    cy.contains("1d 0h 0m 0s")
    cy.tick(1000)
    cy.contains("23h 59m 59s")
    cy.tick(22_000 * 60 * 60 + 59_000 * 60 + 59_000)
    cy.contains("1h 0m 0s")
    cy.tick(1000)
    cy.contains("59m 59s")
    cy.tick(58_000 * 60 + 59_000)
    cy.contains("1m 0s")
    cy.tick(1000)
    cy.contains("59s")
    cy.tick(59_000)
    cy.contains("0s")
  })

  it("Displays 'ended' when the time is past", () => {
    cy.clock(referenceDate)
    cy.mount(
      <Countdown timestamp={subSeconds(referenceDate, 1).getTime() / 1000} />
    )
    cy.contains("ended")
  })

  it("Updates the countdown correctly when timestamp changes", () => {
    const TimestampContext = ({
      children,
    }: {
      children: ({ timestamp }: { timestamp: number }) => ReactElement
    }) => {
      const [timestamp, setTimestamp] = React.useState<number>(
        addSeconds(referenceDate, 20).getTime() / 1000
      )
      useEffect(() => {
        setTimestamp(addSeconds(new Date(), 90).getTime() / 1000)
      }, [])

      return children({ timestamp })
    }
    cy.clock(referenceDate)
    cy.mount(
      <TimestampContext>
        {({ timestamp }) => <Countdown timestamp={timestamp} />}
      </TimestampContext>
    )
    cy.contains("1m 30s")
  })
})
