
	const config = {
		type: Phaser.AUTO,
		width: 1400,
		height: 705,
		parent: 'phaser-game',
		background: 0x000000,
		scene: [loadGame]
	};
	
	let game = new Phaser.Game(config);