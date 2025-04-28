import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/icons/arrow.svg"

type InfoBoxProps = {
	text?: string;
	link?: string;
	btnText?: string;
};

const InfoBox = ({ text, link, btnText }: InfoBoxProps) => (
	<div className="info-box">
		<p className="font-medium sm:text-xl text-center">
			{text}
		</p>
		<Link to={link ?? '#'} className="neo-brutalism-white neo-btn">
			{btnText}
			<img src={arrow} className="w-4 h-4 object-contain"></img>
		</Link>
	</div>
);

const renderContent: Record<number, JSX.Element> = {
	0: (
		<h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue px-8 text-white mx-5">
			Hi, I am <span className="font-semibold">Coco</span>
			<br/>
			A Programmer/Developer
		</h1>
	),
	1: (
		<InfoBox 
			text="Text box 1 with some more text"
			link="/about"
			btnText="Learn More"
		/>
	),
	2: (
		<InfoBox 
			text="Text box 2"
			link="/projects"
			btnText="Visit my portfolio"
		/>
	),
	3: (
		<InfoBox 
			text="Text box 3"
			link="/contact"
			btnText="Let's talk"
		/>
	),
};

type HomeInfoProps = {
	currentStage: number;
};

export function HomeInfo(props: HomeInfoProps): JSX.Element {
	const currentStage = props.currentStage;
	return renderContent[currentStage];
}