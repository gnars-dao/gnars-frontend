export default function Footer() {
  return (
    <div className="flex gap-3 font-primary text-xs sm:text-lg justify-center py-8">
      <a
        href="https://discord.gg/XBeZuMxmst"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
        className="text-primaryText hover:text-hoverRed"
      >
        Discord
      </a>
      <a
        href="https://twitter.com/gnars_dao"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
        className="text-primaryText hover:text-hoverRed"
      >
        Twitter
      </a>
      <a
        href="https://etherscan.com/address/0x558BFFF0D583416f7C4e380625c7865821b8E95C"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
        className="text-primaryText hover:text-hoverRed"
      >
        Etherscan
      </a>
    </div>
  )
}
