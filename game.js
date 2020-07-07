
	const config = {
		type: Phaser.AUTO,
		scale: {
			mode: Phaser.Scale.FIT,
			width: window.innerWidth,
			height: window.innerHeight,
			parent: 'game',
			autoCenter: Phaser.Scale.CENTER_BOTH
		},
		backgroundColor: 'black', 
		scene: [loadGame]
	};
	
	let game = new Phaser.Game(config);