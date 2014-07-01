
$(function() {

	var game = new Game($('#game'));

	$(document).on('click', '.card:not(.opened)', function(event) {
		game.open($(this));
	});
});

var shuffle = function(o) {
	for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
		;
	return o;
};

var Counter = function(counter) {
	this.counter = counter;
};

Counter.prototype = {
	counter: null,
	set: function(value) {
		this.counter.text(value);
	}
};

var Game = function(game) {
	this.game = game;
	this.initialize();
};

Game.prototype = {
	game: null,
	numCards: 8,
	numRows: 4,
	cards: [],
	numFound: 0,
	numTrials: 0,
	openedPair: [],
	trialsCounter: null,
	leftCounter: null,
	initialize: function() {

		this.trialsCounter = new Counter($('#trialsCounter'));
		this.leftCounter = new Counter($('#leftCounter'));
		this.leftCounter.set('0/' + this.numCards);

		var total = this.numCards * 2;
		var oneRow = total / 5;

		var images = [];
		for (var i = 0; i < this.numCards; i++)
		{
			images.push((i + 1));
			images.push((i + 1));
		}
		images = shuffle(images);

		var c = 0;
		for (var i = 0; i < this.numRows; i++)
		{
			var row = $(document.createElement('div'));
			row.addClass('row');
			row.appendTo(this.game);

			this.cards[i] = [];
			for (var s = 0; s < oneRow; s++)
			{

				var card = $('#baseCard').clone();
				card.removeClass('hidden');
				card.attr('id', null);
				card.data('card-id', images[c]);
				card.data('card-state', 'hidden');
				card.appendTo(row);
				this.cards[i][s] = 'images/card_' + images[c] + '.png';
				card.find('img').attr('src', this.cards[i][s]);
				card.appendTo(row);
				c++;
			}
		}
	},
	open: function(card) {
		switch (this.openedPair.length)
		{
			case 1:
				card.addClass('opened');
				this.openedPair.push(card);
				this.validPair();
				break;
			case 0:
				card.addClass('opened');
				this.openedPair.push(card);
		}
	},
	validPair: function() {
		card1 = this.openedPair[0];
		card2 = this.openedPair[1];

		var self = this;
		setTimeout(function() {
			self.numTrials++;
			self.trialsCounter.set(self.numTrials);
			
			if (card1.data('card-id') === card2.data('card-id'))
		{
			card1.data('card-state', 'found');
				card2.data('card-state', 'found');
			card1.addClass('found');
			card2.addClass('found');

			self.numFound++;
			self.leftCounter.set(self.numFound + '/' + self.numCards);
			self.checkEnd();

			self.openedPair = [];
		}
		else
		{
			setTimeout(function() {
				self.closePair();
			}, 1000);
		}
		}, 2000);
	},
	closePair: function() {
		card1 = this.openedPair[0];
		card2 = this.openedPair[1];
		card1.removeClass('opened');
		card2.removeClass('opened');
		this.openedPair = [];
	},
	checkEnd: function() {
		if (this.numFound === this.numCards)
		{
			alert('Vyhráli jste');
		}
	}
};


