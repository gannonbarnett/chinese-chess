function drawBoard() {
	clearInterval(switchSidesHesitation);
	context.clearRect(0,0,BOARD_WIDTH, BOARD_HEIGHT);
	context.fillStyle = BOARD_BACKGROUNDCOLOR;
	context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

	context.fillStyle = BOARD_PALACECOLOR;
	context.fillRect(CELL_WIDTH / 2 + 3 * (LINE_WIDTH + CELL_WIDTH), CELL_WIDTH / 2, CELL_WIDTH * 2 + LINE_WIDTH * 2, CELL_WIDTH * 2 + LINE_WIDTH * 2); 
	context.fillStyle = BOARD_PALACECOLOR;
	context.fillRect(CELL_WIDTH / 2 + 3 * (LINE_WIDTH + CELL_WIDTH), CELL_WIDTH / 2 + 7 * (LINE_WIDTH + CELL_WIDTH), CELL_WIDTH * 2 + LINE_WIDTH * 2, CELL_WIDTH * 2 + LINE_WIDTH * 2);

	context.fillStyle = BOARD_RIVERCOLOR; 
	context.fillRect(CELL_WIDTH / 2 , CELL_WIDTH / 2 + 4 * (LINE_WIDTH + CELL_WIDTH), BOARD_WIDTH - CELL_WIDTH, CELL_WIDTH + LINE_WIDTH);

	context.fillStyle = BOARD_LINECOLOR;
	for (x = 0; x < 9; x ++) {
		context.fillRect(CELL_WIDTH / 2 + x * (LINE_WIDTH + CELL_WIDTH), CELL_WIDTH / 2, LINE_WIDTH, BOARD_HEIGHT - CELL_WIDTH); 
	};

	for (y = 0; y < 10; y ++) {
		context.fillRect(CELL_WIDTH / 2, CELL_WIDTH / 2 + y * (LINE_WIDTH + CELL_WIDTH), BOARD_WIDTH - CELL_WIDTH, LINE_WIDTH); 
	};

	context.fillStyle = "#000000"
	context.font = BOARD_FONTSTYLE

	context.fillText("汉", coorToPixels(4) + CELL_WIDTH / 2 + BOARD_TEXT_OFFSET_X, coorToPixels(5)  + CELL_WIDTH + BOARD_TEXT_OFFSET_Y + CELL_WIDTH / 2)
	context.fillText("河", coorToPixels(5) + CELL_WIDTH / 2 + BOARD_TEXT_OFFSET_X, coorToPixels(5) + CELL_WIDTH + BOARD_TEXT_OFFSET_Y + CELL_WIDTH / 2)
} 

function drawPieces(givenPieces) {

	const PIECES = givenPieces.filter(p => p.isAlive)
	let p1_pieces = PIECES.filter(p => p.isPlayerOne)
	let p2_pieces = PIECES.filter(p => !p.isPlayerOne)
	context.fillStyle = PLAYERONE_COLOR; 

	for (i = 0; i < p1_pieces.length; i++) {
		const p = p1_pieces[i]
		var coors = [p.coorX, p.coorY]
		if (CURRENT_VIEW_playerOne) {
			coors = flipCoors([p.coorX, p.coorY])
		}

		context.fillRect(coorToPixels(coors[0]), coorToPixels(coors[1]), CELL_WIDTH, CELL_WIDTH)
	}



	context.fillStyle = PLAYERTWO_COLOR; 
	for (i = 0; i < p2_pieces.length; i++) {
		const p = p2_pieces[i]
		var coors = [p.coorX, p.coorY]
		if (CURRENT_VIEW_playerOne) {
			coors = flipCoors([p.coorX, p.coorY])
		}
		context.fillRect(coorToPixels(coors[0]), coorToPixels(coors[1]), CELL_WIDTH, CELL_WIDTH)
	}

	context.fillStyle = "#000000"
	context.font = BOARD_FONTSTYLE

	for (i = 0; i < PIECES.length; i++) {

		const p = PIECES[i]
		var coors = [p.coorX, p.coorY]
		if (CURRENT_VIEW_playerOne) {

				coors = flipCoors([p.coorX, p.coorY])
			
		}

		context.fillText(p.character, coorToPixels(coors[0]) + BOARD_TEXT_OFFSET_X, coorToPixels(coors[1]) + CELL_WIDTH + BOARD_TEXT_OFFSET_Y)
	}
}

function coorToPixels(coor) {
	return coor * CELL_WIDTH + (coor - 1) * LINE_WIDTH - CELL_WIDTH + LINE_WIDTH / 2
}

function coorsToPixels(coors) {
	return [coorToPixels(coors[0]), coorToPixels(coors[1])]
}

function flipCoors(coors) {
	return [coors[0], 11 - coors[1]]; 
}

function pixelsToCoor(pixels) {
	var x = Math.round((pixels[0] + CELL_WIDTH / 2) / CELL_WIDTH)
	var y = Math.round((pixels[1]) / CELL_WIDTH)

	//prevent selecting cells that are out of bounds
	if (x == 0) {
		x = 1
	}else if (x == 10) {
		x = 9
	}

	if (y == 0) {
		y = 1
	}else if (y == 11) {
		y = 10
	}

	return [x, y] 
}

function Piece (coorX, coorY, isPlayerOne, name, character, movementFunc, id, isAlive = true) {
	this.coorX = coorX
	this.coorY = coorY
	this.isPlayerOne = isPlayerOne
	this.name = name
	this.character = character
	this.isAlive = isAlive 

	this.movementFunc = movementFunc
	this.id = id

	return this
}

function createAllPieces() {
	let pieces = [
					new Piece(1, 1, true, "rook", "车", validRookMove, "1"), 
					new Piece(9, 1, true, "rook", "车", validRookMove, "2"), 
					new Piece(1, 10, false, "rook", "车", validRookMove, "3"), 
					new Piece(9, 10, false, "rook",  "车", validRookMove, "4"), 

					new Piece(2, 1, true, "horse", "马",  validHorseMove, "5"), 
					new Piece(8, 1, true, "horse", "马",  validHorseMove, "6"), 
					new Piece(2, 10, false, "horse", "马",  validHorseMove, "7"), 
					new Piece(8, 10, false, "horse", "马", validHorseMove, "8"), 

					new Piece(3, 1, true, "elephant", "象", validElephantMove, "9"), 
					new Piece(7, 1, true, "elephant", "象",  validElephantMove, "10"), 
					new Piece(3, 10, false, "elephant", "象", validElephantMove, "11"), 
					new Piece(7, 10, false, "elephant", "象", validElephantMove, "12"), 

					new Piece(4, 1, true, "gaurd", "士", validGuardMove, "13"), 
					new Piece(6, 1, true, "gaurd", "士", validGuardMove, "14"), 
					new Piece(4, 10, false, "gaurd", "士", validGuardMove, "15"), 
					new Piece(6, 10, false, "gaurd", "士", validGuardMove, "16"), 


					new Piece(5, 1, true, "emperor", "市",  validEmperorMove, "17"), 
					new Piece(5, 10, false, "emperor", "市", validEmperorMove, "18"), 

					new Piece(1, 4, true, "soldier", "乒", validSoldierMove, "19"), 
					new Piece(3, 4, true, "soldier", "乒", validSoldierMove, "20"),
					new Piece(5, 4, true, "soldier", "乒", validSoldierMove, "21"),
					new Piece(7, 4, true, "soldier", "乒", validSoldierMove, "22"),
					new Piece(9, 4, true, "soldier", "乒", validSoldierMove, "23"),

					new Piece(1, 7, false, "soldier", "乒", validSoldierMove, "24"),
					new Piece(3, 7, false, "soldier", "乒", validSoldierMove, "25"),
					new Piece(5, 7, false, "soldier", "乒", validSoldierMove, "26"),
					new Piece(7, 7, false, "soldier", "乒", validSoldierMove, "27"),
					new Piece(9, 7, false, "soldier", "乒", validSoldierMove, "28"),

					new Piece(3, 3, true, "cannon", "举", null, "29"),
					new Piece(7, 3, true, "cannon", "举", null, "30"),
					new Piece(3, 8, false, "cannon", "举", null, "31"),
					new Piece(7, 8, false, "cannon", "举", null, "32")
				]
	return pieces		
}

function coorTouched(location) {

	var coors = pixelsToCoor([location[0], location[1]]);
	if (CURRENT_VIEW_playerOne) {
		coors = flipCoors([coors[0], coors[1]])
	}
	if (pieceSelected == null) {
		//Current selection is empty
		if (coorHasPiece(coors) != null) {
			if (coorHasPiece(coors).isPlayerOne == turn_playerOne) {
				//There is a piece at touched unit
				pieceSelected = coorHasPiece(coors)
				updateLogBoard("Selected @" + pieceSelected.name);
			}else {
				updateLogBoard("Unable to select piece of other team at (" + coors[0] + ", " + coors[1] + ")")
			}
		}else {
			updateLogBoard("Unable to select piece at (" + coors[0] + ", " + coors[1] + ")")
		}
	}else {
		//Has selected piece, attempting to select destination. 
		attemptMove(pieceSelected, coors)
		pieceSelected = null; 
	}
}

function coorHasPiece(coors) {
	let alivePieces = allPieces.filter(p => p.isAlive)
	for (i = 0; i < alivePieces.length; i++) {
		const p = alivePieces[i]
		if (p.coorX == coors[0] && p.coorY == coors[1]) {
			return p; 
		}
	}
	return null
}


function attemptMove(selectedPiece, destinationCoors) {
	if (selectedPiece.coorX == destinationCoors[0] && selectedPiece.coorY == destinationCoors[1]) {
		updateLogBoard("Deselected @" + selectedPiece.name )
		return
	}

	let playerOnePieces = getPlayerOnePieces(function(p) {return p.isAlive})
	let playerTwoPieces = getPlayerTwoPieces(function(p) {return p.isAlive})

	var capturedID = null; 

	if (selectedPiece.name == "cannon") {
		var cannonJumps = 0; 

		if (!((selectedPiece.coorX == destinationCoors[0]) || (selectedPiece.coorY == destinationCoors[1]))) {
			updateLogBoard("Error1: Must move cannon in orthagonal line.")
			return false 
		}

		if (coorHasPiece(destinationCoors) == null) { 
			movePiece(selectedPiece, destinationCoors)
			return
		}

		const alivePieces = allPieces.filter(p => p.isAlive)
		if (selectedPiece.coorX == destinationCoors[0]) {
			//vertical
				if (selectedPiece.coorY < destinationCoors[1]) {
					//going right

					for (i = 0; i < alivePieces.length; i++) {
						let pieceInQuestion = alivePieces[i]
						if (pieceInQuestion.coorX == destinationCoors[0]) {
							if (pieceInQuestion.coorY < destinationCoors[1] && pieceInQuestion.coorY > selectedPiece.coorY) {
								cannonJumps += 1
							}
						}
					}
				}else {
					for (i = 0; i < alivePieces.length; i++) {
						let pieceInQuestion = alivePieces[i]
						if (pieceInQuestion.coorX == destinationCoors[0]) {
							if (pieceInQuestion.coorY > destinationCoors[1] && pieceInQuestion.coorY < selectedPiece.coorY) {
								cannonJumps += 1
							}
						}
					}
				}
		}else {
			//horizontal
				if (selectedPiece.coorX < destinationCoors[0]) {
					//going 
					for (i = 0; i < alivePieces.length; i++) {
						let pieceInQuestion = alivePieces[i]
						if (pieceInQuestion.coorY == destinationCoors[1]) {
							if (pieceInQuestion.coorX < destinationCoors[0] && pieceInQuestion.coorX > selectedPiece.coorX) {
								cannonJumps += 1
							}
						}
					}
				}else {
					for (i = 0; i < alivePieces.length; i++) {
						let pieceInQuestion = alivePieces[i]
						if (pieceInQuestion.coorY == destinationCoors[1]) {
							if (pieceInQuestion.coorX > destinationCoors[0] && pieceInQuestion.coorX < selectedPiece.coorX) {
								cannonJumps += 1
							}
						}
					}
				}
		}

		if (cannonJumps != 1) {
			updateLogBoard("Error: Must jump over exactly one piece to capture.")
			return
		}

		capturedID = coorHasPiece(destinationCoors).id
		if (capturedID != null) {
			for (i = 0; i < allPieces.length; i++ ) {
				if (allPieces[i].id == capturedID) {
					if (allPieces[i].isPlayerOne == turn_playerOne) {
						updateLogBoard("Error: Cannot capture own piece")
						return
					}

					allPieces[i].isAlive = false
					updateLogBoard("Captured opponent's @" + allPieces[i].name)
					movePiece(selectedPiece, destinationCoors, false)
					return
				}
			}
		}

	}else if (turn_playerOne) {
		for (i = 0; i < playerOnePieces.length;i ++ ) {
			if (!selectedPiece.movementFunc([selectedPiece.coorX, selectedPiece.coorY], destinationCoors, playerOnePieces[i])) {
				return
			}
			if (playerOnePieces[i].coorX == destinationCoors[0] && playerOnePieces[i].coorY == destinationCoors[1]) {
				updateLogBoard("Error: Cannot capture own piece")
				return  
			}
		}
		for (i = 0; i < playerTwoPieces.length;i ++ ) {
			if (!selectedPiece.movementFunc([selectedPiece.coorX, selectedPiece.coorY], destinationCoors, playerOnePieces[i])) {
				return
			}
			if (playerTwoPieces[i].coorX == destinationCoors[0] && playerTwoPieces[i].coorY == destinationCoors[1]) {
				capturedID = playerTwoPieces[i].id
			}
		}
	}else {
		for (i = 0; i < playerTwoPieces.length;i ++ ) {
			if (!selectedPiece.movementFunc([selectedPiece.coorX, selectedPiece.coorY], destinationCoors, playerOnePieces[i])) {
				return
			}

			if (playerTwoPieces[i].coorX == destinationCoors[0] && playerTwoPieces[i].coorY == destinationCoors[1]) {
				updateLogBoard("Error: Cannot capture own piece")
				return  
			}
		}
		for (i = 0; i < playerOnePieces.length;i ++ ) {
			if (!selectedPiece.movementFunc([selectedPiece.coorX, selectedPiece.coorY], destinationCoors, playerOnePieces[i])) {
				return
			}
			if (playerOnePieces[i].coorX == destinationCoors[0] && playerOnePieces[i].coorY == destinationCoors[1]) {
				capturedID = playerOnePieces[i].id
			}
		}
	}

	if (capturedID != null) {
		for (i = 0; i < allPieces.length; i++ ) {
			if (allPieces[i].id == capturedID) {
				allPieces[i].isAlive = false
				updateLogBoard("Captured opponent's @" + allPieces[i].name)
				movePiece(selectedPiece, destinationCoors, false)
				return
			}
		}
	}

	movePiece(selectedPiece, destinationCoors)
}

function validRookMove(start, end, pieceInQuestion, consideringOwnPieces) {
	if (start[0] == end[0]) {
		//vertical
		if (pieceInQuestion.coorX == start[0] ){
			//see if piece is in vertical collumn
			
			if (start[1] < end[1]) {
				if (pieceInQuestion.coorY < end[1] && pieceInQuestion.coorY > start[1]) {
					updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return false
				}
			}else {
				if (pieceInQuestion.coorY > end[1] && pieceInQuestion.coorY > start[1]) {
					updateLogBoard("Error2: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return false
				}
			}
		}
	}else if (start[1] == end[1]) {
		//horizontal
		if (pieceInQuestion.coorY == start[1] ){
			//see if piece is in horizontal collumn
			
			if (start[0] < end[0]) {
				if (pieceInQuestion.coorX < end[0] && pieceInQuestion.coorX > start[0]) {
					updateLogBoard("Error3: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return false
				}
			}else {
				if (pieceInQuestion.coorX > end[0] && pieceInQuestion.coorX < start[0]) {
					updateLogBoard("Error4: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return false
				}
			}
		}
	}else {
		updateLogBoard("Error: Not a vertical line")
		return false; 
	}

	return true

}

function validHorseMove(start, end, pieceInQuestion, consideringOwnPieces) {
	if (Math.abs(end[0] - start[0]) == 2 && Math.abs(end[1] - start[1]) == 1) {
		//going 2 horizontal and 1 vertical
		//problem if there is piece horizontally next to horse
		if (pieceInQuestion.coorY = start[1]) {
			if (start[0] < end[0]) {
				//going right
				if (pieceInQuestion.coorX == start[0] + 1) {
					updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return
				}

			}else {
				//going left

				if (pieceInQuestion.coorX == start[0] - 1) {
					updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return
				}

			}
		}

	}else if (Math.abs(end[0] - start[0]) == 1 && Math.abs(end[1] - start[1]) == 2) {
		//going 1 horizontal and 2 vertical
		//problem if there is piece vertically next to horse
		if (pieceInQuestion.coorX == start[0]) {
			if (start[1] < end[1]) {
				//going down
				if (pieceInQuestion.coorY == start[1] + 1) {
					updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return
				}

			}else {
				//going up

				if (pieceInQuestion.coorY == start[1] - 1) {
					updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
					return
				}

			}
		}

	}

	return true

}

function validElephantMove(start, end, pieceInQuestion, consideringOwnPieces) {
	if (!(Math.abs(start[0] - end[0]) == 2 && Math.abs(start[1] - end[1]) == 2)) {
		updateLogBoard("Error: Must move elephant in diagonal path of 2 units.")
		return false 
	}
	if (turn_playerOne) {
		if (end[1] > 5) {
			updateLogBoard("Error: Elephants may not cross river.")
			return false 
		}
	}else {
		if (end[1] < 6) {
			updateLogBoard("Error: Elephants may not cross river.")
			return false 
		}
	}

	if (start[0] < end[0]) {
		if (start[1] < end[1]) {
			//start[0] < end[0] , start[1] < end[1]
			if (pieceInQuestion.coorX == start[0] + 1 && pieceInQuestion.coorY == start[1] + 1) {
				updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
				return false
			}
		}else {
			//start[0] < end[0] , start[1] > end[1]
			if (pieceInQuestion.coorX == start[0] + 1 && pieceInQuestion.coorY == start[1] - 1) {
				updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
				return false
			}
		}
	}else {
		if (start[1] < end[1]) {
			//start[0] > end[0] , start[1] < end[1]
			if (pieceInQuestion.coorX == start[0] - 1 && pieceInQuestion.coorY == start[1] + 1) {
				updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
				return false
			}
		}else {
			//start[0] > end[0] , start[1] > end[1]
			if (pieceInQuestion.coorX == start[0] - 1 && pieceInQuestion.coorY == start[1] - 1) {
				updateLogBoard("Error1: Cannot jump over " + pieceInQuestion.name + " at (" + pieceInQuestion.coorX + ", " + pieceInQuestion.coorY + ")")
				return false
			}
		}
	}

	return true
}

function validGuardMove(start, end, pieceInQuestion, consideringOwnPieces) {
	if (!(end[0] < 7 && end[0] > 3)) {
		updateLogBoard("Error1: Cannot move guard out of palace.")
		return false 
	}

	if (!turn_playerOne) {
		if (!(end[1] > 7)) {
			updateLogBoard("Error2: Cannot move guard out of palace.")
			return false
		}
	}else {
		if (!(end[1] < 4)) {
			updateLogBoard("Error3: Cannot move guard out of palace.")
			return false
		}
	}

	if ((Math.abs(start[0] - end[0]) != 1) || (Math.abs(start[1] - end[1]) != 1)) {
		updateLogBoard("Error4: Cannot move guards orthoganally or more than one unit.")
		return false
	}

	return true
}

function validSoldierMove(start, end, pieceInQuestion, consideringOwnPieces) {
	if (!turn_playerOne) {
		//piece is player one's, need to be on upper side of river to move horizontally
		if (start[1] - 1 == end[1] && start[0] == end[0]) {
			return true
		}

		if (start[1] < 6) {
			if (Math.abs(start[0] - end[0]) == 1 && end[1] - start[1] == 0) {
				return true
			}else {
				updateLogBoard("Error1: Cannot move more than one square")
				return false
			}
		} else {
			updateLogBoard("Error2: Cannot move sideways until past river.")
			return false
		}
	}else {
		//piece is player two's, need to be on lower side of river to move horizontally
		if (start[1] + 1 == end[1] && start[0] == end[0]) {
			return true
		}

		if (start[1] > 5) {
			if (Math.abs(start[0] - end[0]) == 1 && end[1] - start[1] == 0) {
				return true
			} else {
				updateLogBoard("Error3: Cannot move more than one square")
				return false
			}
		} else {
			updateLogBoard("Error4: Cannot move sideways until past river.")
			return false
		}
	}
	updateLogBoard("Error5: Cannot move more than one square or backwards")
	return false 
}

function validEmperorMove(start, end, pieceInQuestion, consideringOwnPieces) {
	if (!(end[0] < 7 && end[0] > 3)) {
		updateLogBoard("Error: Cannot move emperor out of palace.")
		return false 
	}else if (Math.abs(start[1] - end[1]) > 1 || Math.abs(start[0] - end[0]) > 1 ){
		updateLogBoard("Error: Cannot move emperor more than one unit.")
		return false 
	}else if (!(start[0] == end[0] || start[1] == end[1])) {
		updateLogBoard("Error: Not a orthagonal path.")
		return false
	}

	if (!turn_playerOne) {
		if (!(end[1] > 7)) {
			updateLogBoard("Error: Cannot move emperor out of palace.")
			return false
		}
	}else {
		if (!(end[1] < 4)) {
			updateLogBoard("Error: Cannot move emperor out of palace.")
			return false
		}
	}

	return true
}

function getPlayerOnePieces(condition) {
	const p1_pieces = []; 
	for (i = 0; i < allPieces.length; i++) {
		const p = allPieces[i]
		if (p.isPlayerOne) {
			if (condition(p)) {
				p1_pieces.push(p)
			}
		}
	}
	return p1_pieces
}

function getPlayerTwoPieces(condition) {
	const p2_pieces = []; 
	for (i = 0; i < allPieces.length; i++) {
		const p = allPieces[i]
		if (!p.isPlayerOne) {
			if (condition(p)) {
				p2_pieces.push(p)
			}
		}
	}
	return p2_pieces
}

function movePiece(piece, destinationCoors, sendMessage = true) {

	piece.coorX = destinationCoors[0]
	piece.coorY = destinationCoors[1]

	if (sendMessage) {
		updateLogBoard("Moved @" + piece.name + " to (" + destinationCoors[0] + ", " + destinationCoors[1] + ")")
	}

	turn_playerOne = !turn_playerOne; 

	drawBoard(); 
	drawPieces(allPieces.filter(p => p.isAlive));

	//also back up moves to game_backup
	var screenshot = []
	for (i = 0; i < allPieces.length; i ++) {
		screenshot.push(createPiece(allPieces[i]))
	}
	game_backup.push(screenshot)
	switchSidesHesitation = setInterval(switchView, 500); 
	return
}

function updateLogBoard(text) {
	var logBoard = document.getElementById('logBoard')
	const sign = turn_playerOne ? "P1: " : "P2: "
	logBoard.innerHTML = sign + text; 
}

function switchView() {
	CURRENT_VIEW_playerOne = !CURRENT_VIEW_playerOne; 
	drawBoard(); 
	drawPieces(allPieces.filter(p => p.isAlive)); 
}

function createPiece(piece, setDead = false ) {
	return new Piece(piece.coorX, piece.coorY, piece.isPlayerOne, piece.name, piece.character, piece.movementFunc, piece.id, piece.isAlive)
}

/* CONTROL BOX */ 

const replayGameButton = document.getElementById('controlBox_replaygame')
const replayMoveButton = document.getElementById('controlBox_replaymove')
const undoMoveButton = document.getElementById('controlBox_undomove')
const newGameButton = document.getElementById('controlBox_newgame')

replayGameButton.addEventListener('click', replayGame); 
replayMoveButton.addEventListener('click', replayMove);
undoMoveButton.addEventListener('click', undoMove);
newGameButton.addEventListener('click', newGame);

var currentAnimationIndex = 0; 
var animationInterval; 

function replayGame() {
	currentAnimationIndex = 0; 
	animationInterval = setInterval(animateGame, 500);
}

function replayMove() {
	currentAnimationIndex = game_backup.length - 2; 
	animationInterval = setInterval(animateGame, 500);
}

function undoMove() {
	if (game_backup.length == 2) {
		allPieces = createAllPieces(); 
		game_backup = [allPieces]; 
		drawBoard(); 
		drawPieces(allPieces); 
		return
	}
	allPieces = game_backup[game_backup.length - 2]; 
	game_backup.pop(); 
	drawBoard(); 
	drawPieces(allPieces); 
	switchView();
}

function newGame() {
	game_backup = [createAllPieces()]

	pieceSelected = null; 
	turn_playerOne = true; 

	allPieces = createAllPieces(); 

	drawBoard(); 
	drawPieces(allPieces); 

	updateLogBoard("Welcome to Chinese Chess. P1, it's your turn!")
}

function animateGame() {

	if (currentAnimationIndex == game_backup.length) {
		clearInterval(animationInterval); 
		drawPieces(allPieces.filter(p => p.isAlive))
		return 
	}
	updateLogBoard("[Replay] Move: " + (currentAnimationIndex + 1 ) + " / " + (game_backup.length))
	drawBoard(); 
	drawPieces(game_backup[currentAnimationIndex].filter(p => p.isAlive));
	currentAnimationIndex = currentAnimationIndex + 1; 
}

/* 
INITIALIZATION 
*/ 

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var BOARD_WIDTH = 400;
var LINE_WIDTH = 3; 
var CELL_WIDTH = (BOARD_WIDTH - 9 * LINE_WIDTH) / 9; 

var BOARD_HEIGHT = BOARD_WIDTH + CELL_WIDTH + LINE_WIDTH;
canvas.width = BOARD_WIDTH; 
canvas.height = BOARD_HEIGHT; 
canvas.style.marginLeft = "calc(50% - " + BOARD_WIDTH + "/ 2)"

var BOARD_BACKGROUNDCOLOR = "#945200"
var BOARD_PALACECOLOR = "#FFFC79"
var BOARD_LINECOLOR = "#424242"
var BOARD_RIVERCOLOR = "#945296"
var BOARD_FONTSTYLE = '35px san-serif'
var BOARD_TEXT_OFFSET_Y =  -8; 
var BOARD_TEXT_OFFSET_X =  3; 

var PLAYERONE_COLOR = "#FFFFFF"
var PLAYERTWO_COLOR = "#FFD479"

var LOCAL_MODE = true; 

var switchSidesHesitation;
var CURRENT_VIEW_playerOne = true; 

var game_backup = [createAllPieces()]

var pieceSelected = null; 
var turn_playerOne = true; 
var allPieces = createAllPieces(); 

canvas.addEventListener('click', function (data) { coorTouched( [data.layerX, data.layerY] ) });

newGame(); 
