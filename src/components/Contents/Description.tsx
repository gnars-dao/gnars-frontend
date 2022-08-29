import React, { FC } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import { RedLink } from '../utils/RedLink';
import './Description.css';

export const Description: FC = () => {
	return (
		<div id="wtf" className="flex justify-center pt-32 container">
			<div className="w-full sm:w-2/3">
				<div className="px-4 sm:px-0">
					<div className="text-6xl font-secondary">WTF?</div>
					<div className="flex flex-col gap-8 text-xl sm:text-20px pt-16 pb-16 leading-8 sm:leading-10">
						<p>
							<RedLink href="https://gnars.com"> Gnars</RedLink> are a new way to fund extreme athletes. We prefer a
							world where kids aren’t shilled energy drinks by their heroes. So as a community of action sports
							enthusiasts, we’ve formed a DAO to rethink how extreme sports people get sponsored.
						</p>

						<p>
							Based on Nouns open source code and CC0 artwork, they’re stored fully on-chain on Ethereum with no
							external dependencies (not even IPFS), and each one represents a DAO vote. We’re changing the way extreme
							sport is funded as stewards of <RedLink href="https://gnars.com/riders">Nouns Athletes</RedLink> with{' '}
							<RedLink href="https://nouns.wtf/vote/51">backing from Nouns DAO</RedLink>.
						</p>

						<p>
							Start creating Gnars off-chain using the Playground (soon) or learn more at{' '}
							<RedLink href="https://gnars.com">gnars.com</RedLink>.
						</p>
					</div>
				</div>
				<div>
					<Accordion allowZeroExpanded className="pb-12 px-8" preExpanded={['a']}>
						<AccordionItem uuid="a">
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>Summary</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="py-10">
									<ul className="list-disc list-inside">
										<li>Gnars artwork is in the public domain.</li>
										<li>One Gnar is trustlessly auctioned every 10 minutes, then less often, forever.</li>
										<li>By “less often” we mean auction length doubles every 1000 auctions.</li>
										<li>Gnar auction proceeds are trustlessly sent to the treasury and founder.</li>
										<li>Setting the bid slider determines the resulting percentage split.</li>
										<li>Settlement of one auction kicks off the next.</li>
										<li>All Gnars are members of Gnars DAO.</li>
										<li>One Gnar is equal to one vote.</li>
										<li>The treasury is controlled exclusively by Gnars via governance.</li>
										<li>Artwork is generative and stored directly on-chain (not IPFS).</li>
										<li>Nouns Athletes receive 10% of supply for 5 years.</li>
									</ul>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>Gnarving Auctions</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<p>
										The Gnars Auction Contract will act as a self-sufficient Gnar generation and distribution mechanism,
										auctioning one Gnar every 10 minutes, then less often, forever. As per the supply curve diagram
										shown above, auction duration doubles every 1000th Gnar, known as “The Gnarving” and in effect
										halving the supply emission each time.
									</p>
									<p>
										Auction proceeds (ETH) are automatically sent to the Gnars DAO treasury and to our founder
										0xigami.eth, depending on what balance you set with the bid slider. You can even choose not to
										reward the founder if you wish. Funds received to the treasury are governed by Gnar owners.
									</p>
									<p>
										Each time an auction is settled, the settlement transaction will also cause a new Gnar to be minted
										and a new auction to begin. While settlement is most heavily incentivized for the winningbidder, it
										can be triggered by anyone, allowing the system to trustlessly auction Gnars as long as Ethereum is
										operational and there are interested bidders.
									</p>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>Bidding and Settling Auctions</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<div className="flex flex-col">
										<div className="text-28px">Settlement</div>
										<div>
											Anyone can settle an auction. When an auction ends, a gas-only transaction is required to start
											the next auction and mint the current Gnar to the winner’s wallet. As gas prices fluctuate, the
											cost of settlement also fluctuates.
										</div>
									</div>
									<div>
										Cost of settlement for every Gnar ID ending in 6 is higher as it consumes more gas. This is due to
										the transaction also triggering the free Gnar mint: all Gnars ending in 7 are sent to the treasury
										and held on behalf of the Nouns Athletes.
									</div>
									<div className="flex flex-col">
										<div className="text-28px">Bids</div>
										<div>
											Once an auction starts, everyone has 10 minutes to bid (auction duration doubles every 1000
											auctions from #627 onwards). Anyone can bid an amount at/above 0.011 ETH. If your bid is outbid by
											someone else, the full amount of your bid (minus gas spent to bid) is returned to you in the same
											transaction as the new higher bid.
										</div>
									</div>
									<div>
										Bids at the very last minute DO NOT increase the auction time. Instead, you have the opportunity to
										snipe the auction with a winning bid during the final moments. Sometimes, multiple bids are sent at
										the same time, but only one will be accepted by the auction house contract.
									</div>
									<div className="flex flex-col">
										<div className="text-28px">Bid Refunds</div>
										<div>
											Unsuccessful bids are refunded in full. Refunds are sent via an internal transaction included in
											the transaction of a new higher bid. This means that refunds for unsuccessful bids occur when a
											higher bid is received.
										</div>
									</div>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>Gnars DAO</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<p>
										Gnars DAO utilizes a Gnosis Safe multisig, which combined with Zodiac Reality Module and Snapshot,
										allows for gasless governance voting. Gnars DAO is the main governing body of the Gnars ecosystem
										and the Gnars DAO treasury receives whatever percentage of ETH proceeds bidders choose at time of
										bidding.
									</p>
									<p>
										Each Gnar is an irrevocable member of Gnars DAO and entitled to one vote in all governance matters.
										Gnar votes are non-transferable (if you sell your Gnar the vote goes with it) but delegatable, which
										means you can assign your vote to someone else as long as you own your Gnar.
									</p>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>Gnar Traits</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<p>
										Gnars are generated randomly based on Ethereum block hashes. There are no 'if' statements or other
										rules governing Gnar trait scarcity, which makes all Gnars equally rare. As of this writing, Gnars
										are made up of:
									</p>
									<ul className="list-disc list-inside">
										<li>backgrounds (12)</li>
										<li>bodies (30)</li>
										<li>accessories (153)</li>
										<li>heads (235)</li>
										<li>glasses (68)</li>
									</ul>
									<p>
										You can experiment with off-chain Gnar generation at the Playground (soon), or browse through
										different traits by using filters on your favorite NFT marketplace.
									</p>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>On-Chain Artwork</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<p>
										Gnars are stored directly on Ethereum and do not utilize pointers to other networks such as IPFS.
										This is possible because Gnar parts are compressed and stored on-chain using a custom run-length
										encoding (RLE), which is a form of lossless compression.
									</p>
									<p>
										The compressed parts are efficiently converted into a single base64 encoded SVG image on- chain. To
										accomplish this, each part is decoded into an intermediate format before being converted into a
										series of SVG rects using batched, on-chain string concatenation. Once the entire SVG has been
										generated, it is base64 encoded.
									</p>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>Gnar Seeder Contract</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<p>
										The Gnar Seeder contract is used to determine Gnar traits during the minting process. The seeder
										contract can be replaced to allow for future trait generation algorithm upgrades. Additionally, it
										can be locked by the Gnars DAO to prevent any future updates. Currently, Gnar traits are determined
										using pseudo-random number generation:
									</p>
									<p className="seederCodeLine break-words">
										keccak256(abi.encodePacked(blockhash(block.number - 1), gnarId))
									</p>
									<p>
										Trait generation is not truly random. Traits can be predicted when minting a Gnar on the pending
										block.
									</p>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
						<AccordionItem>
							<AccordionItemHeading className="text-4xl font-secondary">
								<AccordionItemButton>0xigami’s Reward</AccordionItemButton>
							</AccordionItemHeading>
							<AccordionItemPanel className="text-xl sm:text-20px leading-8 sm:leading-10">
								<div className="flex flex-col gap-8 py-10">
									<p>0xigami is the builder that initiated Gnars.</p>
									<p>
										You have the choice to reward 0xigami with a percentage of a successful bid, a tip, by setting the
										slider to a suitable position. By default the slider is set to the midpoint, as a 50/50 split
										meaning that half of your bid, if successful, would be deposited to 0xigami.eth during settlement.
									</p>
									<p>
										From time to time we change the tip recipient in order to facilitate promotions with other CC0
										projects included in our protocol. For example, Nounvember, where all tips during the month of
										November are sent to the Nouns DAO treasury.
									</p>
								</div>
							</AccordionItemPanel>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	);
};
