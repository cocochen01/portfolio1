import React from "react";

type HomeInfoProps = {
	currentStage: number;
};

const renderContent: Record<number, JSX.Element> = {
	0: (
		<h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue px-8 text-white mx-5">
			Hi, I am <span className="font-semibold">Coco</span>
		</h1>
	),
	1: (
		<h1>1</h1>
	),
	2: (
		<h1>2</h1>
	),
	3: (
		<h1>3</h1>
	),
};

type InfoBoxProps = {
	text?: string;
	link?: string;
	btnText?: string;
};

const InfoBox = ({ text, link, btnText }: InfoBoxProps) => (
	<div className="info-box">
		{text}
	</div>
);

export function HomeInfo(props: HomeInfoProps): JSX.Element {
	const currentStage = props.currentStage;
	return renderContent[currentStage];
}