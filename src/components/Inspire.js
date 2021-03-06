import { Component } from "react";

class Inspire extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inspire: [
				"Don't be stupid, it might make you famous. ๐ธ",
				"My advice is to never listen to any advice, not even this one. ๐",
				"If you don't succeed at first, hide all evidence that you tried. ๐",
				"If what you've done is stupid but it works, then it really isn't that stupid at all. โจ",
				"It's so simple to be wise. Just think of something stupid to say dan then don't say it. ๐",
				"I never make the same mistake twice. I make it three four time, you know, just to be sure! ๐คซ",
				"Everyone wants your happiness. Don't let them take it! ๐ ",
				"Be yourself, everyone else is ready taken. ๐คญ",
				"Pleasing everyone, that's impossible. Making everyone angry, piece of cake! ๐",
				"I can't wait for that to never happen. ๐ฑ",
				"Exercise? I thought you said extra fries! ๐",
				"I could agree with you, but then we'd both be wrong. ๐",
				"Don't mess with me. I know karate, judo, jujitsu, kung fu, and 20 other dangerous words. ๐",
				"I'm not arguing. Iโm just telling you why you're wrong. ๐",
				"Just got 30 minutes of cardio trying to pick up an ice cube from kitchen floor. ๐ง",
				"Never go to a doctor whose office plants have died. ๐",
				"Don't worry about what to wear today, your smile goes with any clothes. ๐",
				"Don't judge me. I was born to be awesome, not perfect. ๐",
				"People say i act like i don't care. It's not an act. ๐คจ",
				"Life is short. Smile while you still have teeth. ๐",
				"It's okay if you don't like me. Not everyone has good taste. ๐",
				"Everything is changing. People are taking the comedians seriously and the politicians as a joke. ๐",
				"When nothing is going right, go left. ๐",
			],
			inspireText: null,
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			const index = Math.floor(Math.random() * this.state.inspire.length);

			this.setState({
				inspireText: this.state.inspire[index],
			});
		}, 7000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		return (
			<div className="inspire bg-dark">
				<h2 id="inspire-text">
					{this.props.shouldUpdate
						? this.state.inspire[
								Math.floor(Math.random() * this.state.inspire.length)
						  ]
						: ". . ."}
				</h2>
			</div>
		);
	}
}

export default Inspire;
