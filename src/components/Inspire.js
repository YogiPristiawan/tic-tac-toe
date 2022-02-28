import { Component } from "react";

class Inspire extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inspire: [
				"Don't be stupid, it might make you famous. 📸",
				"My advice is to never listen to any advice, not even this one. 👌",
				"If you don't succeed at first, hide all evidence that you tried. 😅",
				"If what you've done is stupid but it works, then it really isn't that stupid at all. ✨",
				"It's so simple to be wise. Just think of something stupid to say dan then don't say it. 👍",
				"I never make the same mistake twice. I make it three four time, you know, just to be sure! 🤫",
				"Everyone wants your happiness. Don't let them take it! 😠",
				"Be yourself, everyone else is ready taken. 🤭",
				"Pleasing everyone, that's impossible. Making everyone angry, piece of cake! 😏",
				"I can't wait for that to never happen. 😱",
				"Exercise? I thought you said extra fries! 🍟",
				"I could agree with you, but then we'd both be wrong. 😏",
				"Don't mess with me. I know karate, judo, jujitsu, kung fu, and 20 other dangerous words. 👊",
				"I'm not arguing. I’m just telling you why you're wrong. 😏",
				"Just got 30 minutes of cardio trying to pick up an ice cube from kitchen floor. 🧊",
				"Never go to a doctor whose office plants have died. 👀",
				"Don't worry about what to wear today, your smile goes with any clothes. 😘",
				"Don't judge me. I was born to be awesome, not perfect. 😎",
				"People say i act like i don't care. It's not an act. 🤨",
				"Life is short. Smile while you still have teeth. 😁",
				"It's okay if you don't like me. Not everyone has good taste. 😎",
				"Everything is changing. People are taking the comedians seriously and the politicians as a joke. 🙄",
				"When nothing is going right, go left. 🙂",
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
		}, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	render() {
		return (
			<div className="inspire">
				<h1 id="inspire-text">
					{
						this.state.inspire[
							Math.floor(Math.random() * this.state.inspire.length)
						]
					}
				</h1>
			</div>
		);
	}
}

export default Inspire;
